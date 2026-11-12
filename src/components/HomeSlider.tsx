"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import type { Project, OriginRect } from "@/types";
import { CATEGORIES } from "@/data/projects";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { sound } from "@/utils/audio";

interface HomeSliderProps {
  projects: Project[];
  onSelectProject: (p: Project, originRect?: OriginRect) => void;
  viewMode: "slider" | "grid";
}

export default function HomeSlider({
  projects,
  onSelectProject,
  viewMode,
}: HomeSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragDistanceRef = useRef<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "ALL") return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  // Smooth wheel horizontal scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || viewMode !== "slider") return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      slider.scrollBy({
        left: e.deltaY * 1.5,
        behavior: "smooth",
      });
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });
    return () => slider.removeEventListener("wheel", handleWheel);
  }, [viewMode]);

  // Track active slide index on scroll
  const handleScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const itemWidth = slider.firstElementChild
      ? (slider.firstElementChild as HTMLElement).offsetWidth + 32
      : 580;
    const idx = Math.round(slider.scrollLeft / itemWidth);
    const clamped = Math.max(0, Math.min(filteredProjects.length - 1, idx));
    if (clamped !== activeIndex) {
      setActiveIndex(clamped);
      sound.playSlide();
    }
  }, [activeIndex, filteredProjects.length]);

  const scrollToIndex = (idx: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    sound.playClick();
    const itemWidth = slider.firstElementChild
      ? (slider.firstElementChild as HTMLElement).offsetWidth + 32
      : 580;
    slider.scrollTo({
      left: idx * itemWidth,
      behavior: "smooth",
    });
    setActiveIndex(idx);
  };

  // Drag handlers with silky smooth inertia
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    dragDistanceRef.current = 0;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    dragDistanceRef.current = Math.abs(x - startX);
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCategorySelect = (cat: string) => {
    sound.playClick();
    setSelectedCategory(cat);
    setActiveIndex(0);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const handleCardClick = (p: Project, e: React.MouseEvent<HTMLDivElement>) => {
    if (dragDistanceRef.current > 8) {
      dragDistanceRef.current = 0;
      return;
    }
    const frameEl = e.currentTarget.querySelector("[data-project-frame]") as HTMLElement | null;
    const rect = (frameEl ?? e.currentTarget).getBoundingClientRect();
    sound.playClick();
    onSelectProject(p, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden pt-20 pb-12 sm:pt-24 bg-transparent select-none">
      {/* Lớp màn khói tối dịu mắt (Soft Atmospheric Veil): Hòa tan êm ở mép trên để chuyển đoạn liền mạch, làm dịu ánh sáng gắt phía sau */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#09090b]/85 via-[#0a0a0d]/82 to-[#09090b]/92"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0px, black 140px, black 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0px, black 140px, black 100%)",
        }}
      />

      {/* 1. Header Section: Title + 5-Category Pillars */}
      <div className="relative z-20 flex flex-col gap-5 px-6 font-sans text-xs sm:px-12">
        {/* Top Counter Bar (Không còn icon thừa) */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold uppercase tracking-wider text-white/95 text-sm">
              SELECTED WORKS ({filteredProjects.length})
            </span>
            <span className="hidden text-[10px] text-white/45 sm:inline-block tracking-widest">
              // ARCHIVE 2025–2026
            </span>
          </div>

          <div className="text-[11px] uppercase tracking-wider text-white/55 font-display font-semibold">
            {selectedCategory}
          </div>
        </div>

        {/* 5-Category Filter Buttons: Dịu mắt, tinh tế */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                onMouseEnter={() => sound.playHover()}
                data-cursor={cat === "ALL" ? "ALL" : "FILTER"}
                className={`group relative flex items-center gap-2 rounded-sm border px-3.5 py-2 font-display text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? "border-white/90 bg-white/95 text-black shadow-sm"
                    : "border-white/15 bg-neutral-900/80 text-white/65 hover:border-white/35 hover:text-white hover:bg-neutral-800/85"
                }`}
              >
                {idx > 0 && (
                  <span
                    className={`text-[10px] font-sans transition-colors ${
                      isSelected ? "text-neutral-500" : "text-white/35 group-hover:text-white/70"
                    }`}
                  >
                    0{idx}
                  </span>
                )}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Content View: Grid or Cinematic Horizontal Slider */}
      {viewMode === "grid" ? (
        /* GRID MODE: Unified Matte Obsidian Cards */
        <div className="relative z-10 my-8 px-6 sm:px-12 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((proj, idx) => (
              <div
                key={proj.id}
                onClick={(e) => handleCardClick(proj, e)}
                onMouseEnter={() => sound.playHover()}
                data-cursor="VIEW"
                className="group cursor-pointer flex flex-col gap-3.5 rounded-sm border border-white/10 bg-[#0d0d10]/95 p-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out hover:border-white/30 hover:bg-[#141418]/98 hover:-translate-y-1"
              >
                {/* Artwork Frame: Chuẩn tỷ lệ 1.414:1 của trang slide, không che chữ */}
                <div data-project-frame className="relative aspect-[1414/1000] w-full overflow-hidden rounded-xs bg-[#161618] border border-white/5">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    loading={idx < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-black/5 transition-opacity duration-300 group-hover:opacity-0" />

                  {/* Corner Expand Pill */}
                  <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full border border-white/25 bg-black/85 px-3 py-1.5 font-display text-[10px] font-semibold uppercase tracking-wider text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span>VIEW</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>

                {/* Metadata Footer inside Dark Card (Dịu mắt, dễ đọc 100%) */}
                <div className="flex flex-col gap-1.5 px-0.5 font-sans text-xs">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex items-baseline gap-2.5 min-w-0">
                      <span className="font-mono text-[11px] text-white/35 shrink-0">
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <span className="font-display text-sm font-semibold tracking-wide text-white/90 truncate transition-colors group-hover:text-white">
                        {proj.title}
                      </span>
                    </div>
                    <span className="text-white/40 shrink-0 font-mono text-[11px]">{proj.year}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/[0.07] text-[11px] text-white/55">
                    <span className="truncate">{proj.client}</span>
                    <span className="text-[10px] border border-white/10 px-2 py-0.5 rounded-xs text-white/70 shrink-0 ml-2 bg-white/[0.04] font-medium tracking-wider">
                      {proj.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* SLIDER MODE: Sleek Unified Horizontal Gallery Track */
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          data-cursor="DRAG"
          className={`relative z-10 my-auto flex w-full items-center gap-8 overflow-x-auto px-6 py-6 sm:px-12 no-scrollbar transition-transform will-change-transform ${
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          }`}
          style={{ scrollSnapType: isDragging ? "none" : "x mandatory" }}
        >
          {filteredProjects.map((proj, idx) => (
            <div
              key={proj.id}
              onClick={(e) => handleCardClick(proj, e)}
              onMouseEnter={() => sound.playHover()}
              data-cursor="VIEW"
              className="group relative flex flex-col gap-3.5 shrink-0 rounded-sm border border-white/10 bg-[#0d0d10]/95 p-3.5 sm:p-4 shadow-[0_14px_40px_rgba(0,0,0,0.65)] transition-all duration-500 ease-out hover:border-white/30 hover:bg-[#141418]/98 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              style={{ width: "min(86vw, 660px)", scrollSnapAlign: "center" }}
            >
              {/* Project Artwork Frame: Chuẩn tỷ lệ ảnh gốc 1414/1000, không đè chữ DATE 2026 */}
              <div data-project-frame className="relative aspect-[1414/1000] w-full overflow-hidden rounded-xs bg-[#161618] border border-white/5">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  priority={idx < 2}
                  loading={idx < 2 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 86vw, 660px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/5 transition-opacity duration-300 group-hover:opacity-0" />

                {/* Floating "VIEW DOSSIER ↗" Pill Button on Hover */}
                <div className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full border border-white/25 bg-black/85 px-4 py-1.5 font-display text-[11px] font-semibold uppercase tracking-wider text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-102 shadow-xl">
                  <span>VIEW DOSSIER</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Metadata Block Inside Dark Card: Dịu mắt, tương phản chuẩn, không bị nền khói cắt ngang chữ */}
              <div className="flex flex-col gap-2 px-1 pt-0.5 font-sans text-xs uppercase tracking-wider">
                <div className="flex items-baseline justify-between gap-3 border-b border-white/[0.08] pb-2">
                  <div className="flex items-baseline gap-2.5 min-w-0">
                    <span className="font-mono text-[11px] text-white/40 shrink-0">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1} / {filteredProjects.length < 10 ? `0${filteredProjects.length}` : filteredProjects.length}
                    </span>
                    <span className="font-display font-semibold text-white/95 truncate text-sm transition-colors group-hover:text-white">
                      {proj.title}
                    </span>
                  </div>
                  <span className="text-white/45 shrink-0 font-mono text-[11px]">
                    [{proj.year}]
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-white/55">
                  <span className="truncate">{proj.client}</span>
                  <span className="text-[10px] rounded-xs border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-white/75 shrink-0 ml-3 font-medium">
                    {proj.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Bottom Controls & Progress Line */}
      <div className="relative z-20 flex flex-col gap-3.5 px-6 sm:px-12">
        {/* Dynamic Progress Indicator */}
        <div className="relative h-[1.5px] w-full overflow-hidden bg-white/10">
          <div
            className="h-full bg-white/85 transition-all duration-500 ease-out"
            style={{
              width: `${((activeIndex + 1) / filteredProjects.length) * 100}%`,
            }}
          />
        </div>

        {/* Counter and Navigation Buttons */}
        <div className="flex items-center justify-between font-sans text-xs text-white font-medium">
          <div className="flex items-center gap-2.5">
            <span className="font-display font-bold text-white/95 text-sm">
              {activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1}
            </span>
            <span className="text-white/30">/</span>
            <span className="text-white/50 font-display text-sm">
              {filteredProjects.length < 10 ? `0${filteredProjects.length}` : filteredProjects.length}
            </span>
            <span className="hidden text-[10px] text-white/40 sm:inline-block ml-3 tracking-widest">
              DRAG OR SCROLL HORIZONTALLY
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              onMouseEnter={() => sound.playHover()}
              disabled={activeIndex === 0}
              data-cursor="PREV"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-neutral-900/95 text-white/80 transition-all hover:border-white/50 hover:bg-white hover:text-black disabled:opacity-20 disabled:pointer-events-none"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              onClick={() => scrollToIndex(Math.min(filteredProjects.length - 1, activeIndex + 1))}
              onMouseEnter={() => sound.playHover()}
              disabled={activeIndex === filteredProjects.length - 1}
              data-cursor="NEXT"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-neutral-900/95 text-white/80 transition-all hover:border-white/50 hover:bg-white hover:text-black disabled:opacity-20 disabled:pointer-events-none"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
