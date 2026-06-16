"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

const THEMES = ["draft", "paint", "coffee"] as const;
const UNSHEATHE_AUDIO_SRC = "/audio/sword-katana-unsheathing-sound-effect_A_minor.mp3";
const AUDIO_START_RATIO = 0.04;
const AUDIO_END_RATIO = 0.92;

export default function KatanaThemeSlider() {
  const [themeIndex, setThemeIndex] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const audioBufferPromiseRef = useRef<Promise<AudioBuffer> | null>(null);
  const activeSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("comic-theme");
    const storedIndex = THEMES.indexOf(stored as (typeof THEMES)[number]);
    const index = storedIndex >= 0 ? storedIndex : 0;

    setThemeIndex(index);
    document.documentElement.dataset.comicTheme = THEMES[index];
  }, []);

  function getAudioContext() {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const context = audioContextRef.current ?? new AudioContextClass();
    audioContextRef.current = context;

    return context;
  }

  function loadUnsheatheBuffer(context: AudioContext) {
    if (audioBufferRef.current) {
      return Promise.resolve(audioBufferRef.current);
    }

    audioBufferPromiseRef.current ??= fetch(UNSHEATHE_AUDIO_SRC)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load katana audio.");
        }

        return response.arrayBuffer();
      })
      .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
      .then((buffer) => {
        audioBufferRef.current = buffer;
        return buffer;
      });

    return audioBufferPromiseRef.current;
  }

  function playFallbackUnsheatheSound(nextIndex: number, progressDelta: number) {
    try {
      const context = getAudioContext();

      const lowOscillator = context.createOscillator();
      const scrapeOscillator = context.createOscillator();
      const lowGain = context.createGain();
      const scrapeGain = context.createGain();
      const lowFilter = context.createBiquadFilter();
      const scrapeFilter = context.createBiquadFilter();
      const now = context.currentTime;
      const fallbackDuration = 0.16 + progressDelta * 0.32;

      lowOscillator.type = "triangle";
      lowOscillator.frequency.setValueAtTime(62, now);
      lowOscillator.frequency.exponentialRampToValueAtTime(36, now + fallbackDuration);

      lowFilter.type = "lowpass";
      lowFilter.frequency.setValueAtTime(180, now);

      lowGain.gain.setValueAtTime(0.0001, now);
      lowGain.gain.exponentialRampToValueAtTime(0.16, now + 0.03);
      lowGain.gain.exponentialRampToValueAtTime(0.0001, now + fallbackDuration + 0.08);

      scrapeOscillator.type = "sawtooth";
      scrapeOscillator.frequency.setValueAtTime(260 + nextIndex * 40, now + 0.04);
      scrapeOscillator.frequency.exponentialRampToValueAtTime(760 + nextIndex * 70, now + fallbackDuration);

      scrapeFilter.type = "bandpass";
      scrapeFilter.frequency.setValueAtTime(640, now);
      scrapeFilter.Q.setValueAtTime(4.5, now);

      scrapeGain.gain.setValueAtTime(0.0001, now);
      scrapeGain.gain.exponentialRampToValueAtTime(0.075, now + 0.075);
      scrapeGain.gain.exponentialRampToValueAtTime(0.0001, now + fallbackDuration + 0.04);

      lowOscillator.connect(lowFilter);
      lowFilter.connect(lowGain);
      lowGain.connect(context.destination);

      scrapeOscillator.connect(scrapeFilter);
      scrapeFilter.connect(scrapeGain);
      scrapeGain.connect(context.destination);

      lowOscillator.start(now);
      scrapeOscillator.start(now + 0.035);
      lowOscillator.stop(now + fallbackDuration + 0.1);
      scrapeOscillator.stop(now + fallbackDuration + 0.06);
    } catch {
      // Browsers may block audio until user interaction; the theme still changes.
    }
  }

  async function playUnsheatheSound(previousIndex: number, nextIndex: number) {
    if (nextIndex <= previousIndex) {
      return;
    }

    const previousProgress = previousIndex / (THEMES.length - 1);
    const nextProgress = nextIndex / (THEMES.length - 1);
    const progressDelta = nextProgress - previousProgress;

    try {
      const context = getAudioContext();

      if (context.state === "suspended") {
        await context.resume();
      }

      const buffer = await loadUnsheatheBuffer(context);
      const usableStart = buffer.duration * AUDIO_START_RATIO;
      const usableDuration = buffer.duration * (AUDIO_END_RATIO - AUDIO_START_RATIO);
      const offset = usableStart + usableDuration * previousProgress;
      const duration = Math.max(0.08, usableDuration * progressDelta);
      const source = context.createBufferSource();
      const gain = context.createGain();

      activeSourceRef.current?.stop();
      source.buffer = buffer;
      source.playbackRate.value = 0.98;
      gain.gain.value = 0.82;

      source.connect(gain);
      gain.connect(context.destination);
      source.start(0, offset, duration);
      activeSourceRef.current = source;
      source.onended = () => {
        if (activeSourceRef.current === source) {
          activeSourceRef.current = null;
        }
      };
    } catch {
      playFallbackUnsheatheSound(nextIndex, progressDelta);
    }
  }

  function updateTheme(nextIndex: number) {
    const nextTheme = THEMES[nextIndex];

    void playUnsheatheSound(themeIndex, nextIndex);
    setThemeIndex(nextIndex);
    document.documentElement.dataset.comicTheme = nextTheme;
    localStorage.setItem("comic-theme", nextTheme);
  }

  return (
    <div className="katana-control" style={{ "--blade-progress": `${themeIndex * 50}%` } as CSSProperties}>
      <div className="katana-wrap">
        <div className="katana-blade" />
        <div className="katana-handle" />
        <input
          aria-label="Comic theme"
          className="katana-range"
          dir="rtl"
          max={2}
          min={0}
          onChange={(event) => updateTheme(Number(event.target.value))}
          step={1}
          type="range"
          value={themeIndex}
        />
      </div>
    </div>
  );
}
