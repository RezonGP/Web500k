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
      className="group relative flex items-center justify-center rounded-[2px] border border-white/60 bg-black/75 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 backdrop-blur-md transition-all duration-300 ease-out hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:scale-105 active:scale-95 focus:outline-hidden"
    >
      <span className="font-display font-bold text-white transition-colors duration-300 group-hover:text-black text-sm sm:text-base md:text-lg lg:text-xl tracking-wide whitespace-nowrap select-none">
        {btn.label}
      </span>
      {/* Subtle ring border reflection */}
      <div className="pointer-events-none absolute inset-0 rounded-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 ring-1 ring-white/50" />
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
        {/* Khung TABLE OF CONTENT đặt chính xác tại tâm luồng sáng Spotlight */}
        <div className="relative">
          <div className="rounded-[2px] border border-white/60 bg-black/65 px-8 sm:px-16 md:px-24 py-5 sm:py-7 md:py-8 backdrop-blur-md shadow-[0_0_80px_rgba(255,255,255,0.15)] transition-all duration-300">
            <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-white text-center drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]">
              TABLE OF CONTENT
            </h1>
          </div>

          {/* Con trỏ chuột retro gắn ở góc dưới bên phải như nguyên bản bản vẽ */}
          <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] pointer-events-none">
            <svg
              className="h-6 w-6 sm:h-8 sm:w-8"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 2L16 14L10.5 15L14 22L11.5 23.2L8 16.2L4 20.2V2Z"
                fill="#ffffff"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
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
