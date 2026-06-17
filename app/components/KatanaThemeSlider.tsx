"use client";

import {
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

const THEMES = ["draft", "paint", "coffee"] as const;
const UNSHEATHE_AUDIO_SRC = "/audio/sword-katana-unsheathing-sound-effect_A_minor.mp3";
const AUDIO_START_RATIO = 0.04;
const AUDIO_END_RATIO = 0.92;
const VIEWBOX_WIDTH = 680;
const MAX_PULL = 290;
const SHEATH_MOUTH_X = 430;
const BLADE_TIP_X = 145;
const BLADE_LENGTH = SHEATH_MOUTH_X - BLADE_TIP_X;
const DEFAULT_THEME_INDEX = 1;
const THEME_STORAGE_KEY = "comic-theme";

function getThemeIndex(theme: string | null) {
  return THEMES.findIndex((candidate) => candidate === theme);
}

export default function KatanaThemeSlider() {
  const bladeClipId = useId();
  const [themeIndex, setThemeIndex] = useState(DEFAULT_THEME_INDEX);
  const [dragProgress, setDragProgress] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const reverseAudioBufferRef = useRef<AudioBuffer | null>(null);
  const audioBufferPromiseRef = useRef<Promise<AudioBuffer> | null>(null);
  const activeSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const activeGainRef = useRef<GainNode | null>(null);
  const draggingRef = useRef(false);
  const startClientXRef = useRef(0);
  const startProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const dragAudioDirectionRef = useRef<"draw" | "sheathe" | null>(null);

  useEffect(() => {
    const savedThemeIndex = getThemeIndex(localStorage.getItem(THEME_STORAGE_KEY));
    const initialThemeIndex = savedThemeIndex >= 0 ? savedThemeIndex : DEFAULT_THEME_INDEX;
    const initialTheme = THEMES[initialThemeIndex];

    setThemeIndex(initialThemeIndex);
    document.documentElement.dataset.comicTheme = initialTheme;
    localStorage.setItem(THEME_STORAGE_KEY, initialTheme);
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

  function getReverseAudioBuffer(context: AudioContext, buffer: AudioBuffer) {
    if (reverseAudioBufferRef.current) {
      return reverseAudioBufferRef.current;
    }

    const reversedBuffer = context.createBuffer(
      buffer.numberOfChannels,
      buffer.length,
      buffer.sampleRate,
    );

    for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
      const sourceData = buffer.getChannelData(channel);
      const reversedData = reversedBuffer.getChannelData(channel);

      for (let index = 0; index < sourceData.length; index += 1) {
        reversedData[index] = sourceData[sourceData.length - 1 - index];
      }
    }

    reverseAudioBufferRef.current = reversedBuffer;
    return reversedBuffer;
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

  async function playBladeAudioSegment(fromProgress: number, toProgress: number) {
    const progressDelta = Math.abs(toProgress - fromProgress);
    const isDrawing = toProgress > fromProgress;

    if (progressDelta <= 0.015) {
      return;
    }

    try {
      const context = getAudioContext();

      if (context.state === "suspended") {
        await context.resume();
      }

      const buffer = await loadUnsheatheBuffer(context);
      const usableStart = buffer.duration * AUDIO_START_RATIO;
      const usableDuration = buffer.duration * (AUDIO_END_RATIO - AUDIO_START_RATIO);
      const duration = Math.max(0.08, usableDuration * progressDelta);
      const sourceBuffer = isDrawing ? buffer : getReverseAudioBuffer(context, buffer);
      const offset = isDrawing
        ? usableStart + usableDuration * fromProgress
        : buffer.duration - (usableStart + usableDuration * fromProgress);
      const source = context.createBufferSource();
      const gain = context.createGain();

      stopActiveAudio(0.01);
      source.buffer = sourceBuffer;
      source.playbackRate.value = isDrawing ? 0.98 : 1.04;
      gain.gain.setValueAtTime(isDrawing ? 0.82 : 0.68, context.currentTime);

      source.connect(gain);
      gain.connect(context.destination);
      source.start(0, offset, duration);
      activeSourceRef.current = source;
      activeGainRef.current = gain;
      source.onended = () => {
        if (activeSourceRef.current === source) {
          activeSourceRef.current = null;
          activeGainRef.current = null;
          dragAudioDirectionRef.current = null;
        }
      };
    } catch {
      playFallbackUnsheatheSound(Math.ceil(toProgress * (THEMES.length - 1)), progressDelta);
    }
  }

  function stopActiveAudio(releaseSeconds = 0.09) {
    const context = audioContextRef.current;
    const source = activeSourceRef.current;
    const gain = activeGainRef.current;

    if (!context || !source || !gain) {
      return;
    }

    const now = context.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setTargetAtTime(0.0001, now, 0.025);
    source.stop(now + releaseSeconds);
    activeSourceRef.current = null;
    activeGainRef.current = null;
  }

  function playThemeChangeSound(previousIndex: number, nextIndex: number) {
    if (nextIndex === previousIndex) {
      return;
    }

    const previousProgress = previousIndex / (THEMES.length - 1);
    const nextProgress = nextIndex / (THEMES.length - 1);
    void playBladeAudioSegment(previousProgress, nextProgress);
  }

  function updateTheme(nextIndex: number, shouldPlayAudio = true) {
    const nextTheme = THEMES[nextIndex];

    if (shouldPlayAudio) {
      playThemeChangeSound(themeIndex, nextIndex);
    }
    setThemeIndex(nextIndex);
    document.documentElement.dataset.comicTheme = nextTheme;
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  }

  function applyThemeInstantly(nextIndex: number) {
    const nextTheme = THEMES[nextIndex];

    setThemeIndex(nextIndex);
    document.documentElement.dataset.comicTheme = nextTheme;
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  }

  function clampProgress(progress: number) {
    return Math.min(1, Math.max(0, progress));
  }

  function snapProgress(progress: number) {
    return Math.min(THEMES.length - 1, Math.max(0, Math.round(progress * (THEMES.length - 1))));
  }

  function getSvgScale() {
    const rect = svgRef.current?.getBoundingClientRect();
    return rect ? VIEWBOX_WIDTH / rect.width : 1;
  }

  function onPointerDown(event: PointerEvent<SVGGElement>) {
    draggingRef.current = true;
    startClientXRef.current = event.clientX;
    startProgressRef.current = progress;
    currentProgressRef.current = progress;
    dragAudioDirectionRef.current = null;
    setDragProgress(progress);
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  function onPointerMove(event: PointerEvent<SVGGElement>) {
    if (!draggingRef.current) {
      return;
    }

    const dx = (event.clientX - startClientXRef.current) * getSvgScale();
    const nextProgress = clampProgress(startProgressRef.current - dx / MAX_PULL);
    const progressDelta = nextProgress - currentProgressRef.current;

    if (Math.abs(progressDelta) > 0.01) {
      const nextDirection = progressDelta > 0 ? "draw" : "sheathe";

      if (dragAudioDirectionRef.current !== nextDirection) {
        dragAudioDirectionRef.current = nextDirection;
        void playBladeAudioSegment(nextProgress, nextDirection === "draw" ? 1 : 0);
      }
    }

    currentProgressRef.current = nextProgress;
    applyThemeInstantly(snapProgress(nextProgress));
    setDragProgress(nextProgress);
  }

  function onPointerUp(event: PointerEvent<SVGGElement>) {
    if (!draggingRef.current) {
      return;
    }

    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    const nextIndex = snapProgress(currentProgressRef.current);
    setDragProgress(null);
    stopActiveAudio();
    dragAudioDirectionRef.current = null;
    updateTheme(nextIndex, false);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      updateTheme(Math.min(THEMES.length - 1, themeIndex + 1));
    }

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      updateTheme(Math.max(0, themeIndex - 1));
    }

    if (event.key === "Home") {
      event.preventDefault();
      updateTheme(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      updateTheme(THEMES.length - 1);
    }
  }

  const progress = dragProgress ?? themeIndex / (THEMES.length - 1);
  const hiltOffset = progress * MAX_PULL;
  const exposedBlade = progress * BLADE_LENGTH;
  const clipX = SHEATH_MOUTH_X - exposedBlade;
  const snappedValue = snapProgress(progress);

  return (
    <div
      aria-label="Comic theme"
      aria-valuemax={THEMES.length - 1}
      aria-valuemin={0}
      aria-valuenow={snappedValue}
      aria-valuetext={THEMES[snappedValue]}
      className="katana-control"
      data-dragging={dragProgress !== null}
      onKeyDown={onKeyDown}
      role="slider"
      tabIndex={0}
    >
      <svg
        className="katana-svg"
        ref={svgRef}
        role="img"
        viewBox="0 0 680 150"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={bladeClipId}>
            <rect x={clipX} y="46" width={exposedBlade} height="58" />
          </clipPath>
        </defs>

        <line className="katana-guide" x1="46" x2="648" y1="75" y2="75" />

        <g clipPath={`url(#${bladeClipId})`}>
          <path
            className="katana-blade-shape"
            d="M 144 68 L 418 68 C 424 70, 429 72, 432 75 C 429 78, 424 80, 418 82 L 144 82 Z"
          />
          <path className="katana-blade-ridge" d="M 158 75 C 238 73, 342 73, 424 74" />
        </g>

        <g className="katana-sheath-group">
          <path
            className="katana-sheath"
            d="M 430 55 C 470 50, 595 50, 642 56 L 650 75 L 642 94 C 595 100, 470 100, 430 95 Z"
          />
          <circle className="katana-endcap" cx="650" cy="75" r="13" />
          <circle className="katana-endcap-dot" cx="650" cy="75" r="4.5" />
          {[462, 476, 540, 554, 606, 620].map((x) => (
            <line className="katana-sheath-band" key={x} x1={x} x2={x - 3} y1="58" y2="92" />
          ))}
        </g>

        <g
          className="katana-hilt"
          onPointerCancel={onPointerUp}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          transform={`translate(${-hiltOffset} 0)`}
        >
          <ellipse className="katana-guard" cx="408" cy="75" rx="17" ry="22" />
          <line className="katana-guard-line" x1="399" x2="399" y1="58" y2="92" />
          <line className="katana-guard-line" x1="417" x2="417" y1="58" y2="92" />

          <path
            className="katana-grip"
            d="M 342 60 C 342 56, 346 55, 351 56 L 393 63 C 398 64, 400 69, 400 75 C 400 81, 398 86, 393 87 L 351 94 C 346 95, 342 94, 342 90 Z"
          />
          {[352, 362, 372, 382, 392].map((x) => (
            <line className="katana-wrap-line" key={x} x1={x} x2={x - 8} y1="60" y2="91" />
          ))}
          <circle className="katana-pommel" cx="329" cy="75" r="11" />
          <circle className="katana-pommel-dot" cx="329" cy="75" r="3.5" />
          <rect className="katana-touch-zone" x="286" y="28" width="178" height="94" rx="20" />
        </g>
      </svg>
    </div>
  );
}
