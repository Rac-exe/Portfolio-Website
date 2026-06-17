"use client";

import { useEffect, useState } from "react";

const CASCADE = [
  "Prabhat Bajpai",
  "प्रभात बाजपेई",
  "プラバート・バージパイ",
  "Prabhat Bajpai",
] as const;

const CASCADE_STEP = 760;
const REPEAT_INTERVAL = 20000;

export default function AnimatedName() {
  const [name, setName] = useState<string>(CASCADE[0]);

  useEffect(() => {
    const timers: ReturnType<typeof window.setTimeout>[] = [];

    function runCascade(baseDelay: number) {
      CASCADE.slice(1).forEach((n, i) => {
        timers.push(
          window.setTimeout(() => setName(n), baseDelay + CASCADE_STEP * (i + 1)),
        );
      });
    }

    // Run immediately on mount
    runCascade(0);

    // Repeat every 20s from when the first cascade started
    const cascadeDuration = CASCADE_STEP * (CASCADE.length - 1);
    const interval = window.setInterval(() => {
      runCascade(0);
    }, cascadeDuration + REPEAT_INTERVAL);

    return () => {
      timers.forEach(window.clearTimeout);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <span className="animated-name block" key={name}>
      {name}
    </span>
  );
}
