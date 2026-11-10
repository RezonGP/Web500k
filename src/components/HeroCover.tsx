"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowDown, Sparkles } from "lucide-react";
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
      {/* 1. Exact Cover Image matching Frame 156 of the intro video with subtle 3D parallax */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 10}px, 0)`,
        }}
      >
        <Image
          src="/images/portfolio_cover.jpg"
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

      {/* 4. Bottom Kinetic CTA Button & Scroll Indicator */}
      <div className="z-20 mb-10 flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <button
          onClick={handleButtonClick}
          onMouseEnter={() => sound.playHover()}
          data-cursor="EXPLORE"
          className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-white/30 bg-black/75 px-8 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_35px_rgba(255,255,255,0.35)] active:scale-95"
        >
          <Sparkles className="h-3.5 w-3.5 text-yellow-300 transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-bold">EXPLORE WORKS</span>
          <ArrowDown className="h-3.5 w-3.5 animate-bounce transition-transform duration-300 group-hover:translate-y-1" />
        </button>

        <span className="font-sans text-xs uppercase tracking-wider text-white/50 animate-pulse font-medium">
          SCROLL OR CLICK TO ENTER PORTFOLIO
        </span>
      </div>
    </section>
  );
}
