"use client";

import React from "react";
import { sound } from "@/utils/audio";
import type { CategoryType } from "@/types";

interface TableOfContentsProps {
  onSelectCategory: (category: CategoryType) => void;
}

interface TocButton {
  id: CategoryType;
  label: string;
}

// 5 Nút bấm phân mục theo nguyên mẫu bản vẽ thiết kế của Trần Nam Tiến
const row1Buttons: TocButton[] = [
  { id: "KEY VISUAL", label: "Key visual" },
  { id: "PACKAGING DESIGN", label: "Packaging Design" },
  { id: "BRANDING", label: "Branding" },
];

const row2Buttons: TocButton[] = [
  { id: "TYPOGRAPHIC", label: "Typographic" },
  { id: "CAMPAIGN", label: "Campaign" },
];

export default function TableOfContents({ onSelectCategory }: TableOfContentsProps) {
  const handleClick = (cat: CategoryType) => {
    sound.playClick();
    onSelectCategory(cat);
  };

  const renderButton = (btn: TocButton) => (
    <button
      key={btn.id}
      onClick={() => handleClick(btn.id)}
      onMouseEnter={() => sound.playHover()}
      data-cursor="OPEN"
      className="group relative flex items-center justify-center rounded-[2px] border-[1.5px] border-dashed border-white/50 bg-black/75 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 backdrop-blur-md transition-all duration-300 ease-out hover:border-solid hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:scale-105 active:scale-95 focus:outline-hidden"
    >
      {/* 4 Chấu góc kỹ thuật nghệ thuật */}
      <div className="pointer-events-none absolute -top-[1.5px] -left-[1.5px] w-2 h-2 border-t-[1.5px] border-l-[1.5px] border-white/80 transition-colors duration-300 group-hover:border-black" />
      <div className="pointer-events-none absolute -top-[1.5px] -right-[1.5px] w-2 h-2 border-t-[1.5px] border-r-[1.5px] border-white/80 transition-colors duration-300 group-hover:border-black" />
      <div className="pointer-events-none absolute -bottom-[1.5px] -left-[1.5px] w-2 h-2 border-b-[1.5px] border-l-[1.5px] border-white/80 transition-colors duration-300 group-hover:border-black" />
      <div className="pointer-events-none absolute -bottom-[1.5px] -right-[1.5px] w-2 h-2 border-b-[1.5px] border-r-[1.5px] border-white/80 transition-colors duration-300 group-hover:border-black" />

      <span className="font-display font-bold text-white transition-colors duration-300 group-hover:text-black text-sm sm:text-base md:text-lg lg:text-xl tracking-wide whitespace-nowrap select-none">
        {btn.label}
      </span>
    </button>
  );

  return (
    <section className="relative w-full min-h-screen py-16 px-6 sm:px-12 md:px-16 flex flex-col justify-between bg-transparent text-white select-none overflow-hidden">
      {/* 1. HEADER BAR (2 GÓC TRÊN NGUYÊN BẢN) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between font-display text-xs sm:text-sm uppercase tracking-wider font-bold text-white/90">
        <span className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">DATE 2026</span>
        <span className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">GRAPHIC DESIGNER</span>
      </div>

      {/* 3. CENTERPIECE: KHUNG "TABLE OF CONTENT" & 5 NÚT BẤM VECTOR NGUYÊN BẢN */}
      <div className="relative z-10 my-auto py-8 sm:py-12 flex flex-col items-center gap-10 sm:gap-14 w-full max-w-5xl mx-auto">
        {/* Khung TABLE OF CONTENT đặt chính xác tại tâm luồng sáng Spotlight với viền đứt khúc nghệ thuật */}
        <div className="relative">
          <div className="relative rounded-[2px] border-[1.5px] border-dashed border-white/70 bg-black/70 px-8 sm:px-16 md:px-24 py-5 sm:py-7 md:py-8 backdrop-blur-md shadow-[0_0_80px_rgba(255,255,255,0.15)] transition-all duration-300">
            {/* 4 Chấu góc kiến trúc nghệ thuật (Corner brackets) */}
            <div className="pointer-events-none absolute -top-[2px] -left-[2px] w-3.5 h-3.5 border-t-2 border-l-2 border-white" />
            <div className="pointer-events-none absolute -top-[2px] -right-[2px] w-3.5 h-3.5 border-t-2 border-r-2 border-white" />
            <div className="pointer-events-none absolute -bottom-[2px] -left-[2px] w-3.5 h-3.5 border-b-2 border-l-2 border-white" />
            <div className="pointer-events-none absolute -bottom-[2px] -right-[2px] w-3.5 h-3.5 border-b-2 border-r-2 border-white" />

            <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-white text-center drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]">
              TABLE OF CONTENT
            </h1>
          </div>
        </div>

        {/* 5 Nút Bấm: Tỷ lệ và bố cục đúng chuẩn nguyên mẫu ảnh của bạn */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 w-full">
          {/* Hàng 1 (3 nút): Key visual - Packaging Design - Branding */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 md:gap-6 w-full">
            {row1Buttons.map(renderButton)}
          </div>

          {/* Hàng 2 (2 nút căn giữa): Typographic - Campaign */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 md:gap-6 w-full">
            {row2Buttons.map(renderButton)}
          </div>
        </div>
      </div>

      {/* 4. BOTTOM PADDING (Cân bằng không gian) */}
      <div className="h-6 w-full" />
    </section>
  );
}
