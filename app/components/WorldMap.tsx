"use client";

import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";

import type { Photo as PhotoData } from "../lib/life";
import Photo from "./Photo";

export type WorldMapPin = {
  id: string;
  row: number;
  col: number;
  name: string;
  when: string;
  coords: string;
  note: string;
  photo?: PhotoData;
};

type WorldMapProps = {
  cols: number;
  rows: number;
  lines: string[];
  home: { row: number; col: number; name: string };
  pins: WorldMapPin[];
};

type CellStyle = CSSProperties & Record<`--${string}`, string | number>;

export default function WorldMap({ cols, rows, lines, home, pins }: WorldMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const active = pins.find((pin) => pin.id === activeId) ?? null;
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardPos, setCardPos] = useState<{ left: number; top: number } | null>(null);
  const [mapWidth, setMapWidth] = useState(0);

  // Re-place the card when the map changes size (rotation, window resize).
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setMapWidth(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Close the card on a tap or click anywhere outside the map.
  useEffect(() => {
    if (!activeId) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setActiveId(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [activeId]);

  // Place the card beside its pin, keeping it inside the map wherever it fits.
  useLayoutEffect(() => {
    const map = ref.current;
    const card = cardRef.current;
    if (!active || !map || !card) {
      setCardPos(null);
      return;
    }

    const mapWidth = map.clientWidth;
    const mapHeight = map.clientHeight;
    const cell = mapWidth / cols;
    const pinX = (active.col + 0.5) * cell;
    const pinY = (active.row + 0.5) * cell;
    const { offsetWidth: cardWidth, offsetHeight: cardHeight } = card;
    const gap = 14;
    const clamp = (value: number, max: number) => Math.min(Math.max(value, 0), Math.max(max, 0));

    if (pinX + gap + cardWidth <= mapWidth || pinX - gap - cardWidth >= 0) {
      // Room at the side: sit right of the pin (or left of it), vertically centred.
      const left = pinX + gap + cardWidth <= mapWidth ? pinX + gap : pinX - gap - cardWidth;
      setCardPos({ left, top: clamp(pinY - cardHeight / 2, mapHeight - cardHeight) });
    } else {
      // Narrow screens: drop below the pin, centred on it.
      setCardPos({ left: clamp(pinX - cardWidth / 2, mapWidth - cardWidth), top: pinY + gap });
    }
  }, [active, cols, mapWidth]);

  return (
    <div
      className="world"
      data-revealed={revealed}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActiveId(null);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setActiveId(null);
      }}
      onMouseLeave={() => setActiveId(null)}
      ref={ref}
      style={{ "--cols": cols, "--rows": rows } as CellStyle}
    >
      <pre aria-hidden="true" className="world-grid">
        {lines.join("\n")}
      </pre>

      <span
        aria-hidden="true"
        className="world-home"
        style={{ "--col": home.col, "--row": home.row } as CellStyle}
        title={`Home: ${home.name}`}
      />

      {pins.map((pin, index) => (
        <button
          aria-expanded={activeId === pin.id}
          aria-label={`${pin.name}, ${pin.when}`}
          className="world-pin"
          data-active={activeId === pin.id}
          key={pin.id}
          onClick={() => setActiveId((current) => (current === pin.id ? null : pin.id))}
          onFocus={() => setActiveId(pin.id)}
          onMouseEnter={() => setActiveId(pin.id)}
          style={{ "--col": pin.col, "--row": pin.row, "--i": index } as CellStyle}
          type="button"
        />
      ))}

      {active ? (
        <div
          className="world-card"
          key={active.id}
          ref={cardRef}
          role="status"
          style={
            cardPos
              ? { left: cardPos.left, top: cardPos.top }
              : { left: 0, top: 0, visibility: "hidden" }
          }
        >
          {active.photo ? (
            <Photo
              photo={{ ...active.photo, ratio: "3 / 2" }}
              showCaption={false}
              sizes="240px"
            />
          ) : null}
          <div className="world-card-body">
            <div className="world-card-head">
              <strong>{active.name}</strong>
              <span className="mono muted">{active.when}</span>
            </div>
            <p>{active.note}</p>
            <a className="world-card-link" href={`#${active.id}`}>
              Read about it <span aria-hidden="true" className="arrow">↓</span>
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
