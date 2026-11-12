"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Phone, Mail, GraduationCap } from "lucide-react";
import { sound } from "@/utils/audio";

interface AboutSectionProps {
  onBack?: () => void;
}

export default function AboutSection({ onBack }: AboutSectionProps) {
  const handleBack = () => {
    sound.playClick();
    if (onBack) {
      onBack();
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-0 bg-transparent text-white selection:bg-red-500 selection:text-white animate-in fade-in duration-500">
      {/* 1. Top Section Header Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between border-b border-white/10 pb-4 font-sans text-xs uppercase tracking-wider text-white/60 font-medium">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={handleBack}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors border-r border-white/20 pr-4"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>RETURN TO WORKS</span>
            </button>
          )}
          <span className="text-white font-display font-bold">PROFILE // ABOUT ME</span>
        </div>
        <span className="font-display">TRẦN NAM TIẾN // CV DOSSIER 2026</span>
      </div>

      {/* 2. TÁC PHẨM "ABOUT ME" NGUYÊN BẢN (Full A4 Landscape, hiển thị 100% trọn vẹn, không cắt xén) */}
      <div className="my-10 max-w-6xl mx-auto px-4 sm:px-8 flex flex-col items-center">
        {/* Ambient Cinema Lighting Backlight */}
        <div className="relative w-full aspect-[2924/2067] overflow-hidden rounded-[2px] border border-white/15 shadow-[0_0_100px_rgba(255,255,255,0.06)] bg-neutral-950">
          <Image
            src="/images/about_me_full_page.webp"
            alt="Trần Nam Tiến - About Me Profile Dossier"
            fill
            priority
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-contain select-none"
          />
        </div>

        <div className="w-full mt-3 flex items-center justify-between font-sans text-xs text-white/50 uppercase tracking-wider px-1 font-medium">
          <span>ORIGINAL EDITORIAL SPREAD // PORTFOLIO PAGE 02</span>
          <span>RETINA 250 DPI • FULL VIEW</span>
        </div>
      </div>

      {/* 3. Direct Contact & Quick Telemetry Action Bar */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-16 border-t border-white/10 pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-sans text-xs">
        {/* Phone */}
        <a
          href="tel:0862442475"
          onClick={() => sound.playClick()}
          onMouseEnter={() => sound.playHover()}
          className="group flex flex-col gap-1 border-l border-white/20 pl-4 transition-all hover:border-amber-400"
        >
          <span className="text-white/50 flex items-center gap-1.5 text-[11px] font-medium">
            <Phone className="h-3 w-3 text-amber-300" /> DIRECT HOTLINE
          </span>
          <span className="text-white font-display font-bold text-sm group-hover:text-amber-300 transition-colors flex items-center justify-between">
            0862 442 475
            <ArrowUpRight className="h-3.5 w-3.5 text-white/40 group-hover:text-white transition-transform group-hover:rotate-45" />
          </span>
        </a>

        {/* Email */}
        <a
          href="mailto:namtien3006@gmail.com"
          onClick={() => sound.playClick()}
          onMouseEnter={() => sound.playHover()}
          className="group flex flex-col gap-1 border-l border-white/20 pl-4 transition-all hover:border-amber-400"
        >
          <span className="text-white/50 flex items-center gap-1.5 text-[11px] font-medium">
            <Mail className="h-3 w-3 text-amber-300" /> EMAIL INQUIRIES
          </span>
          <span className="text-white font-display font-bold text-sm truncate group-hover:text-amber-300 transition-colors flex items-center justify-between">
            namtien3006@gmail.com
            <ArrowUpRight className="h-3.5 w-3.5 text-white/40 group-hover:text-white transition-transform group-hover:rotate-45 shrink-0" />
          </span>
        </a>

        {/* Education */}
        <div className="flex flex-col gap-1 border-l border-white/20 pl-4">
          <span className="text-white/50 flex items-center gap-1.5 text-[11px] font-medium">
            <GraduationCap className="h-3 w-3 text-amber-300" /> EDUCATION
          </span>
          <span className="text-white font-display font-bold text-sm">
            VĂN LANG UNIVERSITY
          </span>
          <span className="text-white/50 text-[11px]">GRAPHIC DESIGN DEPT</span>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1 border-l border-white/20 pl-4">
          <span className="text-white/50 flex items-center gap-1.5 text-[11px] font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" /> STATUS 2026
          </span>
          <span className="text-emerald-400 font-display font-bold text-sm">
            AVAILABLE
          </span>
          <span className="text-white/50 text-[11px]">COMMISSIONS & ROLES</span>
        </div>
      </div>
    </section>
  );
}
