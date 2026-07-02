"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

export function FadeImage({ className = "", ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className="relative block h-full w-full">
      <span
        className={`absolute inset-0 bg-surface-container-low transition-opacity duration-300 ${
          loaded ? "opacity-0" : "animate-pulse opacity-100"
        }`}
      />
      <Image
        {...props}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
}
