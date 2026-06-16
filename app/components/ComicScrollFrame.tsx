"use client";

import { type ReactNode } from "react";

type ComicScrollFrameProps = {
  children: ReactNode;
  className?: string;
};

export default function ComicScrollFrame({
  children,
  className = "",
}: ComicScrollFrameProps) {
  return (
    <div className={`comic-scroll-content comic-custom-scroll-content ${className}`}>
      {children}
    </div>
  );
}
