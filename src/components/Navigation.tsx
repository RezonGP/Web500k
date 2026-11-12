"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Volume2, VolumeX, Maximize, Minimize, Menu, X, ArrowUpRight } from "lucide-react";
import { sound } from "@/utils/audio";
import { useFullscreen } from "@/hooks";
import type { ViewMode, NavItem } from "@/types";

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  viewMode: ViewMode;
  onToggleViewMode: () => void;
  audioActive: boolean;
  onToggleAudio: () => void;
}

const navItems: NavItem[] = [
  { id: "works", label: "Works", sub: "Selected Archive 2025–2026", preview: "/images/portfolio/kv_rebellion_hero.webp" },
  { id: "about", label: "About Me", sub: "Trần Nam Tiến Profile & CV", preview: "/images/about_me_full_page.webp" },
  { id: "contact", label: "Contact", sub: "Commissions & Inquiries", preview: "/images/portfolio/brand_obt_hero.webp" },
];

export default function Navigation({
  currentSection,
  onNavigate,
  viewMode,
  onToggleViewMode,
  audioActive,
  onToggleAudio,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hoveredPreview, setHoveredPreview] = useState<string>("/images/portfolio/kv_rebellion_hero.webp");
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const handleAudioToggle = () => {
    const nextState = !audioActive;
    sound.setEnabled(nextState);
    onToggleAudio();
  };

  const handleItemClick = (id: string) => {
    sound.playClick();
    onNavigate(id);
    setIsOpen(false);
  };

  const handleViewToggle = () => {
    sound.playClick();
    onToggleViewMode();
  };

  const handleMenuToggle = () => {
    sound.playClick();
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Top Header Bar with Glass Effect */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-20 items-center justify-between px-6 font-sans text-xs uppercase tracking-wider font-medium sm:px-12 bg-black/90 border-b border-white/5 transition-all duration-300 animate-in fade-in slide-in-from-top-4 duration-500">
        {/* Brand Logo / Name */}
        <div
          onClick={() => handleItemClick("works")}
          onMouseEnter={() => sound.playHover()}
          data-cursor="HOME"
          className="group flex cursor-pointer items-center gap-3"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-xs bg-white text-black font-display font-black text-xs transition-transform duration-300 group-hover:rotate-90">
            T
          </div>
          <span className="font-display font-bold text-white tracking-wider transition-opacity group-hover:opacity-75">
            TRẦN NAM TIẾN
          </span>
          <span className="hidden text-[10px] text-white/40 md:inline-block font-sans tracking-widest">
            // GRAPHIC DESIGNER
          </span>
        </div>

        {/* Right Navigation & Tools */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Main Navigation Links */}
          <nav className="flex items-center gap-2 sm:gap-3">
            {/* WORKS LINK */}
            <button
              onClick={() => handleItemClick("works")}
              onMouseEnter={() => sound.playHover()}
              data-cursor="WORKS"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                currentSection === "works"
                  ? "border-white bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                  : "border-transparent text-white/60 hover:text-white hover:border-white/20"
              }`}
            >
              <span>WORKS</span>
            </button>

            {/* ABOUT ME LINK */}
            <button
              onClick={() => handleItemClick("about")}
              onMouseEnter={() => sound.playHover()}
              data-cursor="ABOUT"
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                currentSection === "about"
                  ? "border-amber-400 bg-amber-400 text-black font-bold shadow-[0_0_25px_rgba(251,191,36,0.35)]"
                  : "border-white/20 bg-white/5 text-white/90 hover:border-white hover:bg-white/10"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${currentSection === "about" ? "bg-black" : "bg-amber-400 animate-pulse"}`} />
              <span>ABOUT ME</span>
            </button>
          </nav>

          {/* Tools Divider */}
          <div className="hidden sm:block h-4 w-[1px] bg-white/15" />

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Mode Toggle (Chỉ hiện khi ở mục Works) */}
            {currentSection === "works" && (
              <button
                onClick={handleViewToggle}
                onMouseEnter={() => sound.playHover()}
                data-cursor="TOGGLE"
                className="hidden items-center gap-1.5 rounded-full border border-white/20 bg-black/80 px-3.5 py-1.5 text-white/80 transition-all hover:border-white hover:text-white lg:flex"
              >
                <span>VIEW:</span>
                <span className="font-bold text-white">
                  {viewMode === "slider" ? "SLIDER" : "GRID"}
                </span>
              </button>
            )}

            {/* Sound Toggle */}
            <button
              onClick={handleAudioToggle}
              onMouseEnter={() => sound.playHover()}
              data-cursor="AUDIO"
              title="Toggle Ambient Audio"
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white/80 transition-all hover:border-white hover:text-white hover:scale-105"
            >
              {audioActive ? <Volume2 className="h-4 w-4 text-emerald-400" /> : <VolumeX className="h-4 w-4 text-white/40" />}
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              onMouseEnter={() => sound.playHover()}
              data-cursor="EXPAND"
              title="Toggle Fullscreen"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white/80 transition-all hover:border-white hover:text-white hover:scale-105 sm:flex"
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </button>

            {/* Menu Trigger Button */}
            <button
              onClick={handleMenuToggle}
              onMouseEnter={() => sound.playHover()}
              data-cursor="MENU"
              className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/30 bg-white/10 px-4 sm:px-5 py-1.5 sm:py-2 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black hover:scale-105 shadow-md"
            >
              {isOpen ? <X className="h-3.5 w-3.5 transition-transform rotate-90" /> : <Menu className="h-3.5 w-3.5" />}
              <span className="font-bold text-[11px] sm:text-xs">{isOpen ? "CLOSE" : "MENU"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Animated Menu Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 px-8 py-24 sm:px-20 animate-in fade-in zoom-in-95 duration-300">
          {/* Hover Preview Background */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-25 transition-all duration-700 ease-out">
            <Image
              src={hoveredPreview}
              alt="Section Preview"
              fill
              className="object-cover filter contrast-125 brightness-75 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          </div>

          {/* Menu Drawer Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 font-sans text-xs uppercase tracking-wider text-white/50 font-medium">
            <span>INDEX NAVIGATION</span>
            <span className="font-display">ANTIANTIART STUDIO // TRẦN NAM TIẾN</span>
          </div>

          {/* Menu Navigation Items List */}
          <nav className="flex flex-col gap-6 sm:gap-8 my-auto">
            {navItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                onMouseEnter={() => {
                  sound.playHover();
                  setHoveredPreview(item.preview);
                }}
                data-cursor="SELECT"
                className="group flex cursor-pointer items-baseline justify-between transition-transform duration-300 hover:translate-x-4"
              >
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-display text-sm sm:text-base text-white/30 group-hover:text-amber-400 transition-colors font-bold">
                    0{idx + 1}
                  </span>
                  <span className="font-display text-4xl sm:text-7xl font-black uppercase tracking-tight text-white/70 transition-colors group-hover:text-white">
                    {item.label}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 font-sans text-xs text-white/50 group-hover:text-white transition-colors font-medium">
                  <span>{item.sub}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            ))}
          </nav>

          {/* Menu Drawer Footer */}
          <div className="flex items-center justify-between border-t border-white/10 pt-6 font-sans text-[11px] uppercase tracking-wider text-white/50 font-medium">
            <span className="text-amber-300/90 font-semibold">design web rezon@2026</span>
            <span>TRẦN NAM TIẾN • HO CHI MINH CITY, VIETNAM</span>
          </div>
        </div>
      )}
    </>
  );
}
