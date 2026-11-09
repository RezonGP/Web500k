"use client";

import React from "react";
import { sound } from "@/utils/audio";
import type { CategoryType } from "@/types";

interface TableOfContentsProps {
  onSelectCategory: (category: CategoryType) => void;
}

interface DisciplineCard {
  id: CategoryType;
  label: string;
  order: string;
  count: string;
  summary: string;
}

// 5 Phân mục được định nghĩa chuẩn xác theo bản vẽ thiết kế Antiantiart của Trần Nam Tiến
const disciplinesRow1: DisciplineCard[] = [
  {
    id: "KEY VISUAL",
    label: "KEY VISUAL",
    order: "01",
    count: "03 PROJECTS",
    summary: "Wild Rebellion • Silent Fall • Mai Tí Rap",
  },
  {
    id: "PACKAGING DESIGN",
    label: "PACKAGING DESIGN",
    order: "02",
    count: "04 PROJECTS",
    summary: "Fanta Can • Sách Biển Cả • Moto Care • Lịch 2026",
  },
  {
    id: "BRANDING",
    label: "BRANDING",
    order: "03",
    count: "03 PROJECTS",
    summary: "24 HaiTa Takeaway • OBT Crew • 247Express",
  },
];

const disciplinesRow2: DisciplineCard[] = [
  {
    id: "TYPOGRAPHIC",
    label: "TYPOGRAPHIC",
    order: "04",
    count: "01 PROJECT",
    summary: "Liquid Chrome • 3D Spatial Form",
  },
  {
    id: "CAMPAIGN",
    label: "CAMPAIGN",
    order: "05",
    count: "01 PROJECT",
    summary: "NVLIMA Luxury Watch & Social Campaign",
  },
];

export default function TableOfContents({ onSelectCategory }: TableOfContentsProps) {
  const handleClick = (cat: CategoryType) => {
    sound.playClick();
    onSelectCategory(cat);
  };

  const renderCard = (card: DisciplineCard) => (
    <div
      key={card.id}
      onClick={() => handleClick(card.id)}
      onMouseEnter={() => sound.playHover()}
      data-cursor="OPEN"
      className="group relative cursor-pointer flex flex-col gap-2.5 transition-all duration-300"
    >
      {/* 1. Main Action Button Box */}
      <div className="relative h-24 sm:h-28 md:h-32 w-full rounded-[2px] border border-white/25 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300 ease-out group-hover:border-white group-hover:bg-neutral-900/90 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.22)] group-hover:-translate-y-1 group-active:translate-y-0 group-active:scale-[0.99]">
        {/* Subtle hover backlight pulse */}
        <div className="pointer-events-none absolute inset-0 rounded-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-b from-white/10 via-transparent to-white/5" />

        {/* Condensed Bold Graphic Typography */}
        <span className="font-display font-extrabold uppercase tracking-wider text-white text-base sm:text-xl md:text-2xl transition-colors duration-300 group-hover:text-white select-none text-center">
          {card.label}
        </span>
      </div>

      {/* 2. Sub-telemetry Metadata Line below card */}
      <div className="flex items-center justify-between px-1 font-sans text-xs tracking-wider uppercase font-medium">
        <span className="text-white/45 group-hover:text-white/70 transition-colors font-mono text-[11px] sm:text-xs">
          {card.order} // {card.count}
        </span>
        <span className="text-amber-400 group-hover:text-amber-300 font-display font-bold text-[11px] sm:text-xs transition-transform duration-300 group-hover:translate-x-1 flex items-center gap-1">
          EXPLORE ↗
        </span>
      </div>
    </div>
  );

  return (
    <section className="relative w-full min-h-screen py-20 px-6 sm:px-12 md:px-16 lg:px-20 flex flex-col justify-between bg-black text-white select-none border-t border-white/10 overflow-hidden">
      {/* Cinema Ambient Background: Gradient mờ ảo sâu thẳm, không bao giờ bị viền hộp tù túng */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[750px] w-[1100px] rounded-full bg-white/[0.035] blur-[160px]" />
      </div>

      {/* TOP TELEMETRY BAR: 2 GÓC TRÊN */}
      <div className="w-full flex items-center justify-between font-sans text-xs uppercase tracking-wider text-white/50 font-medium pb-8 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-mono font-bold">✳</span>
          <span className="font-display font-bold text-white tracking-widest">DATE 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-white/40">// PORTFOLIO ARCHIVE</span>
          <span className="font-display font-bold text-white tracking-widest">
            GRAPHIC DESIGNER // TRẦN NAM TIẾN
          </span>
        </div>
      </div>

      {/* CENTERPIECE: MONUMENTAL "TABLE OF CONTENT" & 5-CARD DISCIPLINE MATRIX */}
      <div className="my-auto py-12 flex flex-col items-center gap-10 md:gap-14 w-full max-w-7xl mx-auto">
        {/* Monumental Headline Box */}
        <div className="relative flex flex-col items-center gap-3">
          <div className="relative rounded-[2px] border border-white/40 bg-neutral-950/90 px-8 sm:px-14 md:px-20 py-4 sm:py-6 shadow-[0_0_60px_rgba(255,255,255,0.08)]">
            <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-white text-center">
              TABLE OF CONTENT
            </h1>
          </div>

          {/* Sub-instruction label */}
          <p className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-white/50 text-center font-medium pt-2">
            CLICK ANY BUTTON TO OPEN DISCIPLINE DOSSIER // CHỌN PHÂN MỤC ĐỂ XEM TÁC PHẨM
          </p>
        </div>

        {/* 5-Card Matrix: Chuẩn 2 hàng (Hàng 1: 3 cards - Hàng 2: 2 cards căn giữa) */}
        <div className="w-full flex flex-col gap-6 lg:gap-8">
          {/* Row 1: 3 Cards (KEY VISUAL - PACKAGING DESIGN - BRANDING) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
            {disciplinesRow1.map(renderCard)}
          </div>

          {/* Row 2: 2 Cards Centered (TYPOGRAPHIC - CAMPAIGN) */}
          <div className="flex flex-col md:flex-row justify-center gap-6 lg:gap-8 w-full">
            <div className="w-full md:w-[calc(33.333%-1.333rem)] lg:w-[calc(33.333%-1.777rem)]">
              {renderCard(disciplinesRow2[0])}
            </div>
            <div className="w-full md:w-[calc(33.333%-1.333rem)] lg:w-[calc(33.333%-1.777rem)]">
              {renderCard(disciplinesRow2[1])}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM TELEMETRY BAR: 2 GÓC DƯỚI */}
      <div className="w-full flex items-center justify-between font-sans text-xs uppercase tracking-wider text-white/50 font-medium pt-8 border-t border-white/10">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
          <span className="font-mono text-[11px] sm:text-xs">
            ARCHIVE INDEX // 5 DISCIPLINES • 12 SELECTED WORKS
          </span>
        </div>
        <div className="font-display font-semibold text-white/60 tracking-widest text-[11px] sm:text-xs">
          HO CHI MINH CITY • VIETNAM
        </div>
      </div>
    </section>
  );
}
