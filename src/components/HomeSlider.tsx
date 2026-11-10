"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import type { Project } from "@/types";
import { CATEGORIES } from "@/data/projects";
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles, Layers } from "lucide-react";
import { sound } from "@/utils/audio";

interface HomeSliderProps {
  projects: Project[];
  onSelectProject: (p: Project) => void;
  viewMode: "slider" | "grid";
}

export default function HomeSlider({
  projects,
  onSelectProject,
  viewMode,
}: HomeSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
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
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
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

  const handleCardClick = (p: Project) => {
    sound.playClick();
    onSelectProject(p);
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden pt-20 pb-16 sm:pt-24 bg-transparent select-none">
      {/* 1. Header Section: Title + 5-Category Pillars (Chuẩn Trang 3 Table of Contents) */}
      <div className="z-20 flex flex-col gap-6 px-6 font-sans text-xs sm:px-12">
        {/* Top Counter Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span className="font-display font-bold uppercase tracking-wider text-white text-sm">
              SELECTED WORKS ({filteredProjects.length})
            </span>
            <span className="hidden text-[10px] text-white/50 sm:inline-block tracking-widest">
              // ARCHIVE 2025–2026
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-white/60">
            <Layers className="h-3.5 w-3.5 text-white/40" />
            <span className="text-white font-display font-semibold tracking-wide">{selectedCategory}</span>
          </div>
        </div>

        {/* 5-Category Buttons: Bố cục hình học chuẩn theo Table of Contents trong PDF */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                onMouseEnter={() => sound.playHover()}
                data-cursor={cat === "ALL" ? "ALL" : "FILTER"}
                className={`group relative flex items-center gap-2.5 rounded-xs border px-4 py-2 font-display text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${isSelected
                  ? "border-white bg-white text-black font-bold shadow-[0_0_25px_rgba(255,255,255,0.4)] scale-102"
                  : "border-white/20 bg-neutral-950/80 text-white/70 hover:border-white hover:text-white hover:bg-white/5"
                  }`}
              >
                {idx > 0 && (
                  <span
                    className={`text-[9px] font-sans transition-colors ${isSelected ? "text-neutral-600" : "text-white/40 group-hover:text-amber-300"
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
        /* GRID MODE: Editorial Masonry Layout */
        <div className="my-8 px-6 sm:px-12 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((proj, idx) => (
              <div
                key={proj.id}
                onClick={() => handleCardClick(proj)}
                onMouseEnter={() => sound.playHover()}
                data-cursor="VIEW"
                className="group cursor-pointer flex flex-col gap-4 rounded-xs border border-white/10 bg-neutral-950 p-4 transition-all duration-500 hover:border-white hover:shadow-[0_0_35px_rgba(255,255,255,0.15)] hover:-translate-y-1.5"
              >
                {/* Visual Thumbnail: Sắc nét, không dính chữ rườm rà */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xs bg-black border border-white/5">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-transparent" />

                  {/* Corner Index Tag */}
                  <div className="absolute left-3 top-3 font-display text-[11px] font-bold text-white/90 bg-black/75 px-2.5 py-1 backdrop-blur-xs border border-white/15">
                    0{idx + 1}
                  </div>

                  {/* Corner Expand Icon */}
                  <div className="absolute right-3 top-3 rounded-full bg-white text-black p-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:rotate-45 shadow-lg">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Typography Metadata Block */}
                <div className="flex flex-col gap-1.5 font-sans text-xs">
                  <div className="flex items-baseline justify-between text-white font-bold">
                    <span className="font-display text-sm tracking-wide truncate group-hover:text-amber-300 transition-colors">
                      {proj.title}
                    </span>
                    <span className="text-white/40 shrink-0 ml-2 font-display text-xs">{proj.year}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-white/60">
                    <span className="truncate">{proj.client}</span>
                    <span className="text-[10px] border border-white/15 px-2 py-0.5 rounded-xs text-white/80 shrink-0 ml-2 bg-white/5 font-medium">
                      {proj.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* SLIDER MODE: Cinematic Widescreen Horizontal Track */
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          data-cursor="DRAG"
          className={`my-auto flex h-[64vh] w-full items-center gap-8 overflow-x-auto px-6 sm:px-16 no-scrollbar transition-transform will-change-transform ${isDragging ? "cursor-grabbing select-none scale-[0.995]" : "cursor-grab"
            }`}
          style={{ scrollSnapType: "x mandatory" }}
        >
          {filteredProjects.map((proj, idx) => (
            <div
              key={proj.id}
              onClick={() => handleCardClick(proj)}
              onMouseEnter={() => sound.playHover()}
              data-cursor="VIEW"
              className="group relative flex h-full flex-col justify-between shrink-0"
              style={{ width: "min(88vw, 720px)", scrollSnapAlign: "center" }}
            >
              {/* Project Hero Visual Frame */}
              <div className="relative h-[82%] w-full overflow-hidden rounded-xs bg-black border border-white/15 transition-all duration-500 ease-out group-hover:border-white group-hover:shadow-[0_0_45px_rgba(255,255,255,0.2)]">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  priority={idx < 2}
                  sizes="(max-width: 768px) 88vw, 720px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-transparent" />

                {/* Project Index Badge */}
                <div className="absolute left-4 top-4 font-display text-[11px] font-bold uppercase tracking-wider text-white/90 bg-black/80 px-3 py-1 backdrop-blur-xs border border-white/15">
                  0{idx + 1} // 0{filteredProjects.length}
                </div>

                {/* Floating "VIEW DOSSIER ↗" Pill Button on Hover */}
                <div className="absolute right-5 bottom-5 flex items-center gap-2 rounded-full border border-white/40 bg-black/80 px-5 py-2 font-display text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 shadow-2xl">
                  <span>VIEW DOSSIER</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Clean Antiantiart Metadata Line (Không bị rối chữ) */}
              <div className="flex flex-col justify-end pt-3 font-sans text-xs uppercase tracking-wider text-white">
                <div className="flex items-baseline justify-between border-b border-white/10 pb-2">
                  <span className="font-display font-bold text-white transition-colors group-hover:text-amber-300 truncate text-sm">
                    P: {proj.title} [{proj.year}]
                  </span>
                  <span className="text-white/60 shrink-0 ml-3 text-[11px] font-medium">
                    C: {proj.client}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1.5 text-[11px] text-white/50">
                  <span className="text-white/70 font-medium">FORMAT: {proj.category}</span>
                  <span className="text-[10px] text-white/40 group-hover:text-white transition-colors font-semibold">
                    [CLICK TO OPEN DOSSIER]
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Bottom Controls & Progress Line */}
      <div className="z-20 flex flex-col gap-4 px-6 sm:px-12">
        {/* Dynamic Progress Indicator */}
        <div className="relative h-[2px] w-full overflow-hidden bg-white/10">
          <div
            className="h-full bg-white transition-all duration-300 ease-out shadow-[0_0_12px_#ffffff]"
            style={{
              width: `${((activeIndex + 1) / filteredProjects.length) * 100}%`,
            }}
          />
        </div>

        {/* Counter and Navigation Buttons */}
        <div className="flex items-center justify-between font-sans text-xs text-white font-medium">
          <div className="flex items-center gap-2.5">
            <span className="font-display font-bold text-white text-base">0{activeIndex + 1}</span>
            <span className="text-white/30">/</span>
            <span className="text-white/50 font-display">0{filteredProjects.length}</span>
            <span className="hidden text-[10px] text-white/40 sm:inline-block ml-3 tracking-widest">
              DRAG OR SCROLL HORIZONTALLY
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              onMouseEnter={() => sound.playHover()}
              disabled={activeIndex === 0}
              data-cursor="PREV"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-neutral-950 text-white backdrop-blur-md transition-all hover:border-white hover:bg-white hover:text-black disabled:opacity-20 disabled:pointer-events-none"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              onClick={() => scrollToIndex(Math.min(filteredProjects.length - 1, activeIndex + 1))}
              onMouseEnter={() => sound.playHover()}
              disabled={activeIndex === filteredProjects.length - 1}
              data-cursor="NEXT"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-neutral-950 text-white backdrop-blur-md transition-all hover:border-white hover:bg-white hover:text-black disabled:opacity-20 disabled:pointer-events-none"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
