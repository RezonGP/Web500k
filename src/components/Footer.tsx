"use client";

import React from "react";
import Image from "next/image";
import { ArrowUp, ArrowUpRight, Phone, Mail } from "lucide-react";
import { sound } from "@/utils/audio";
import { useScrollTo } from "@/hooks";

interface FooterProps {
  onNavigate?: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollTo = useScrollTo();

  const scrollToTop = () => {
    sound.playClick();
    scrollTo(0, { duration: 1.0 });
  };

  return (
    <footer className="w-full bg-black text-white border-t border-white/10 pt-16 pb-12 px-6 sm:px-12 select-none relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Row 1: Signature Mark & Brand Philosophy */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/10">
          {/* Left: Authentic Signature of Trần Nam Tiến */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-wider text-white/50 font-medium">
              <span>OFFICIAL PORTFOLIO SIGNATURE // 2026</span>
            </div>

            {/* The Signature Graphic Mark */}
            <div className="relative w-72 sm:w-88 h-24 sm:h-28 overflow-hidden rounded-[2px] transition-transform duration-500 hover:scale-102">
              <Image
                src="/images/signature_hero.png"
                alt="Chữ ký Trần Nam Tiến - Portfolio"
                fill
                priority
                className="object-contain filter drop-shadow-[0_0_25px_rgba(255,255,255,0.18)]"
              />
            </div>

            {/* The exact requested credit: design web rezon@2026 */}
            <div className="font-sans text-xs tracking-wider flex items-center gap-2 pt-1 font-medium">
              <span className="text-white/40">CREDIT:</span>
              <span className="text-amber-400 font-display font-bold uppercase tracking-wider bg-amber-400/10 px-2.5 py-0.5 rounded-[2px] border border-amber-400/30">
                design web rezon@2026
              </span>
            </div>
          </div>

          {/* Right: Quick Direct Contact & Back To Top */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 font-sans text-xs font-medium">
            {/* Phone */}
            <a
              href="tel:0862442475"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors border border-white/20 hover:border-white px-4 py-2 rounded-full font-display"
            >
              <Phone className="h-3.5 w-3.5 text-amber-300" />
              <span>0862 442 475</span>
            </a>

            {/* Email */}
            <a
              href="mailto:namtien3006@gmail.com"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors border border-white/20 hover:border-white px-4 py-2 rounded-full font-display"
            >
              <Mail className="h-3.5 w-3.5 text-amber-300" />
              <span>namtien3006@gmail.com</span>
            </a>

            {/* Scroll To Top */}
            <button
              onClick={scrollToTop}
              onMouseEnter={() => sound.playHover()}
              data-cursor="TOP"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors border border-white/20 hover:border-white hover:bg-white hover:text-black px-4 py-2 rounded-full font-display font-bold"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>TOP</span>
            </button>
          </div>
        </div>

        {/* Row 2: Copyright & Meta Telemetry */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans text-xs text-white/50 uppercase tracking-wider font-medium">
          <div className="flex items-center gap-3">
            <span className="text-white font-display font-semibold">TRẦN NAM TIẾN</span>
            <span>•</span>
            <span>GRAPHIC DESIGNER // HO CHI MINH CITY</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-amber-300/90 font-display font-semibold">design web rezon@2026</span>
            <span>•</span>
            <span>© 2026 ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

