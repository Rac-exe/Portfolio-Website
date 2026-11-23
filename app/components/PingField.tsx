"use client";

import { useEffect, useRef } from "react";

const SPACING = 16; // px between dots
const SPEED = 150; // ring speed, px per second
const BASE_ALPHA = 0.12;
const AUTO_PING_MS = 3800;

type Ping = { x: number; y: number; t: number; strength: number; width: number; life: number };

/**
 * The homepage art: a quiet dot field. On arrival one large ping ripples out
 * from the centre while the field fades in; after that, small pings drift in
 * every few seconds, and clicking sends your own. Draws a still field when
 * the visitor prefers reduced motion, and stops when scrolled out of view.
 */
export default function PingField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dark = window.matchMedia("(prefers-color-scheme: dark)");
    const pings: Ping[] = [];
    const start = performance.now();
    let lastAuto = start;
    let width = 0;
    let height = 0;
    let rgb = "0, 0, 0";
    let frame = 0;
    let visible = true;

    const readColor = () => {
      const parts = getComputedStyle(canvas).color.match(/[\d.]+/g);
      if (parts) rgb = parts.slice(0, 3).join(", ");
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const elapsed = (now - start) / 1000;
      const cx = width / 2;
      const cy = height / 2;
      const reveal = reduce ? Infinity : (elapsed * Math.hypot(cx, cy)) / 1.1;

      for (let x = SPACING / 2; x < width; x += SPACING) {
        for (let y = SPACING / 2; y < height; y += SPACING) {
          const fromCentre = Math.hypot(x - cx, y - cy);
          let alpha = BASE_ALPHA * Math.min(1, Math.max(0, (reveal - fromCentre) / 80));

          for (const ping of pings) {
            const age = (now - ping.t) / 1000;
            if (age < 0 || age > ping.life) continue;
            const ring = age * SPEED;
            const distance = Math.hypot(x - ping.x, y - ping.y);
            alpha +=
              ping.strength *
              Math.exp(-((distance - ring) ** 2) / (2 * ping.width ** 2)) *
              (1 - age / ping.life);
          }

          if (alpha < 0.01) continue;
          alpha = Math.min(alpha, 0.85);
          ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, 1 + alpha * 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const tick = (now: number) => {
      for (let i = pings.length - 1; i >= 0; i--) {
        if ((now - pings[i].t) / 1000 > pings[i].life) pings.splice(i, 1);
      }
      if (now - lastAuto > AUTO_PING_MS && now - start > 3000) {
        pings.push({
          x: Math.random() * width,
          y: Math.random() * height,
          t: now,
          strength: 0.4,
          width: 9,
          life: 3,
        });
        lastAuto = now;
      }
      draw(now);
      frame = visible ? requestAnimationFrame(tick) : 0;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce || !frame) draw(performance.now());
    };

    const onPointerDown = (event: PointerEvent) => {
      if (reduce) return;
      const rect = canvas.getBoundingClientRect();
      pings.push({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        t: performance.now(),
        strength: 0.7,
        width: 10,
        life: 3.2,
      });
    };

    const onScheme = () => {
      readColor();
      if (reduce) draw(performance.now());
    };

    readColor();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduce && !frame) frame = requestAnimationFrame(tick);
    });
    visibility.observe(canvas);

    dark.addEventListener("change", onScheme);
    canvas.addEventListener("pointerdown", onPointerDown);

    if (!reduce) {
      pings.push({ x: width / 2, y: height / 2, t: start + 250, strength: 0.9, width: 16, life: 4.5 });
      frame = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      dark.removeEventListener("change", onScheme);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return <canvas aria-hidden="true" className="ping-field" ref={ref} />;
}
