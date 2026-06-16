"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const PAGE_FLIP_AUDIO_SRC = "/audio/page-flip-fx_A_minor.mp3";

export default function PageFlipSound() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(PAGE_FLIP_AUDIO_SRC);
    audioRef.current.preload = "auto";
    audioRef.current.volume = 0.55;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (previousPathRef.current === null) {
      previousPathRef.current = pathname;
      return;
    }

    if (previousPathRef.current === pathname) {
      return;
    }

    previousPathRef.current = pathname;

    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Route changes still work if the browser blocks non-critical audio.
    });
  }, [pathname]);

  return null;
}
