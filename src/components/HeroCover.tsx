"use client";

import React, { useState } from "react";
import Image from "next/image";
import { sound } from "@/utils/audio";

interface HeroCoverProps {
  onExplore: () => void;
}

export default function HeroCover({ onExplore }: HeroCoverProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleButtonClick = () => {
    sound.playClick();
    onExplore();
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-transparent select-none"
    >
      {/* 1. Exact Cover Image matching Frame 156 of the intro video with subtle 3D parallax & bottom feathering */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 10}px, 0)`,
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
        }}
      >
        <Image
          src="/images/portfolio_cover.webp"
          alt="Portfolio TRẦN NAM TIẾN"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* 2. Top spacing */}
      <div className="h-20 w-full" />

      {/* 3. Center interactive click zone */}
      <div
        onClick={handleButtonClick}
        data-cursor="ENTER"
        className="z-10 flex h-full w-full cursor-pointer items-center justify-center"
      />
    </section>
  );
}
