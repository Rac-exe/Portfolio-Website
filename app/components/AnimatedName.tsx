"use client";

import { useEffect, useState } from "react";

const NAME_SEQUENCE = [
  "Prabhat Bajpai",
  "प्रभात बाजपेई",
  "プラバート・バージパイ",
  "Prabhat Bajpai",
] as const;

export default function AnimatedName() {
  const [nameIndex, setNameIndex] = useState(0);

  useEffect(() => {
    const timers = NAME_SEQUENCE.slice(1).map((_, index) =>
      window.setTimeout(() => setNameIndex(index + 1), 760 * (index + 1)),
    );

    return () => {
      timers.forEach(window.clearTimeout);
    };
  }, []);

  return (
    <span className="animated-name block" key={nameIndex}>
      {NAME_SEQUENCE[nameIndex]}
    </span>
  );
}
