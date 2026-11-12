"use client";

import React, { useState, useCallback, useMemo, useRef, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import type { Project, OriginRect } from "@/types";
import { X, ArrowLeft, ArrowRight, ChevronDown, ArrowUp } from "lucide-react";
import { sound } from "@/utils/audio";
import { useScrollLock, useKeyPress } from "@/hooks";

interface ProjectModalProps {
  project: Project | null;
  originRect?: OriginRect | null;
  onClose: () => void;
  onBackToCategory?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

interface ProjectDeckProps {
  project: Project;
  originRect?: OriginRect | null;
  onClose: () => void;
  onBackToCategory?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const SLIDE_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

function ProjectDeck({
  project,
  originRect,
  onClose,
  onBackToCategory,
  onNext,
  onPrev,
}: ProjectDeckProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const infoScrollRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const chromeHeaderRef = useRef<HTMLElement>(null);
  const chromeRailRef = useRef<HTMLElement>(null);
  const firstFrameRef = useRef<HTMLDivElement>(null);
  const transitionLockRef = useRef<number>(0);
  const touchStartYRef = useRef<number | null>(null);

  const slides = useMemo(
    () => (project.stills && project.stills.length > 0 ? project.stills : [project.image]),
    [project]
  );

  // Tổng số lớp: các slide ảnh + 1 màn hình thông tin ở cuối
  const totalSections = slides.length + 1;
  const infoSectionIndex = slides.length;
  const isOnInfoSection = activeSlideIndex === infoSectionIndex;

  const goToSection = useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(0, Math.min(totalSections - 1, nextIndex));
      if (clamped === activeSlideIndex) return;
      const now = performance.now();
      transitionLockRef.current = now;
      if (clamped === infoSectionIndex && infoScrollRef.current) {
        infoScrollRef.current.scrollTop = 0;
      }
      sound.playSlide();
      setActiveSlideIndex(clamped);
    },
    [activeSlideIndex, totalSections, infoSectionIndex]
  );

  const handleClose = useCallback(() => {
    sound.playClick();
    onClose();
  }, [onClose]);

  const handleNextProject = useCallback(() => {
    if (onNext) {
      sound.playSlide();
      onNext();
    }
  }, [onNext]);

  const handlePrevProject = useCallback(() => {
    if (onPrev) {
      sound.playSlide();
      onPrev();
    }
  }, [onPrev]);

  const handleStepDown = useCallback(() => {
    goToSection(activeSlideIndex + 1);
  }, [activeSlideIndex, goToSection]);

  const handleStepUp = useCallback(() => {
    goToSection(activeSlideIndex - 1);
  }, [activeSlideIndex, goToSection]);

  // Phím tắt: ESC đóng, Trái/Phải đổi dự án, Lên/Xuống chuyển slide
  const keyMap = useMemo(
    () => ({
      Escape: handleClose,
      ArrowRight: handleNextProject,
      ArrowLeft: handlePrevProject,
      ArrowDown: handleStepDown,
      ArrowUp: handleStepUp,
    }),
    [handleClose, handleNextProject, handlePrevProject, handleStepDown, handleStepUp]
  );
  useKeyPress(keyMap, true);

  // Wheel gesture: khóa nhịp 560ms để mỗi lần lăn/vuốt trackpad chuyển đúng 1 lớp mượt mà
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (Math.abs(e.deltaY) < 10) return;

      // Nếu đang ở màn Info và nội dung còn cuộn được bên trong thì nhường cho cuộn tự nhiên
      if (isOnInfoSection && infoScrollRef.current) {
        const el = infoScrollRef.current;
        const canScrollInternally = el.scrollHeight > el.clientHeight + 2;
        if (canScrollInternally) {
          if (e.deltaY > 0) return;
          if (e.deltaY < 0 && el.scrollTop > 2) return;
        }
      }

      const now = performance.now();
      if (now - transitionLockRef.current < 560) return;

      if (e.deltaY > 0 && activeSlideIndex < totalSections - 1) {
        goToSection(activeSlideIndex + 1);
      } else if (e.deltaY < 0 && activeSlideIndex > 0) {
        goToSection(activeSlideIndex - 1);
      }
    },
    [activeSlideIndex, totalSections, isOnInfoSection, goToSection]
  );

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    touchStartYRef.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (touchStartYRef.current === null) return;
      const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
      touchStartYRef.current = null;
      if (Math.abs(deltaY) < 42) return;

      if (isOnInfoSection && infoScrollRef.current) {
        const el = infoScrollRef.current;
        if (deltaY > 0 && el.scrollHeight > el.clientHeight + 2) return;
        if (deltaY < 0 && el.scrollTop > 2) return;
      }

      const now = performance.now();
      if (now - transitionLockRef.current < 500) return;

      if (deltaY > 0 && activeSlideIndex < totalSections - 1) {
        goToSection(activeSlideIndex + 1);
      } else if (deltaY < 0 && activeSlideIndex > 0) {
        goToSection(activeSlideIndex - 1);
      }
    },
    [activeSlideIndex, totalSections, isOnInfoSection, goToSection]
  );

  // Reset khóa khi vừa mount project mới
  useEffect(() => {
    transitionLockRef.current = 0;
  }, [project.id]);

  // FLIP Expand Animation: phóng mượt từ đúng tọa độ & kích thước khung ảnh vừa click ra đúng cỡ Fullscreen 1414/1000
  useLayoutEffect(() => {
    if (!originRect) return;
    const frameEl = firstFrameRef.current;
    if (!frameEl) return;

    const targetRect = frameEl.getBoundingClientRect();
    if (targetRect.width === 0 || targetRect.height === 0) return;

    const dx =
      originRect.left + originRect.width / 2 - (targetRect.left + targetRect.width / 2);
    const dy =
      originRect.top + originRect.height / 2 - (targetRect.top + targetRect.height / 2);
    const sx = originRect.width / targetRect.width;
    const sy = originRect.height / targetRect.height;

    const frameAnim = frameEl.animate(
      [
        {
          transform: `translate3d(${dx}px, ${dy}px, 0) scale(${sx}, ${sy})`,
          opacity: 0.9,
        },
        {
          transform: "translate3d(0, 0, 0) scale(1, 1)",
          opacity: 1,
        },
      ],
      {
        duration: 480,
        easing: SLIDE_EASING,
        fill: "both",
      }
    );

    const backdropAnim = backdropRef.current?.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 360, easing: "ease-out", fill: "both" }
    );
    const headerAnim = chromeHeaderRef.current?.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 300, delay: 120, easing: "ease-out", fill: "both" }
    );
    const railAnim = chromeRailRef.current?.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 300, delay: 120, easing: "ease-out", fill: "both" }
    );

    return () => {
      frameAnim.cancel();
      backdropAnim?.cancel();
      headerAnim?.cancel();
      railAnim?.cancel();
    };
  }, [originRect, project.id]);

  return (
    <div
      data-lenis-prevent
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`fixed inset-0 z-50 overflow-hidden text-white select-none ${
        originRect ? "bg-transparent" : "bg-[#070709] animate-in fade-in duration-300"
      }`}
    >
      {/* Nền tối độc lập để có thể fade êm từ 0 -> 1 trong khi ảnh card đang phóng to */}
      <div
        ref={backdropRef}
        className="pointer-events-none absolute inset-0 bg-[#070709]"
      />

      {/* 1. Floating Top Minimal Bar */}
      <header
        ref={chromeHeaderRef}
        className="pointer-events-none fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5"
      >
        <div className="pointer-events-auto flex items-center gap-3 rounded-xs border border-white/10 bg-[#0b0b0e]/90 px-3.5 py-2 font-sans text-[11px] uppercase tracking-wider text-white/70">
          {onBackToCategory && (
            <button
              onClick={onBackToCategory}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-1.5 text-white/75 hover:text-white transition-colors border-r border-white/15 pr-3 shrink-0"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{project.category}</span>
              <span className="sm:hidden">BACK</span>
            </button>
          )}
          <span className="font-display font-bold text-white truncate max-w-[160px] sm:max-w-xs">
            {project.title}
          </span>
          <span className="hidden md:inline text-white/30">/</span>
          <span className="hidden md:inline font-display font-semibold text-amber-300/90 shrink-0">
            {project.category}
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2 rounded-xs border border-white/10 bg-[#0b0b0e]/90 px-2.5 py-1.5 font-sans text-[11px] uppercase tracking-wider">
          <button
            onClick={() => goToSection(isOnInfoSection ? 0 : infoSectionIndex)}
            onMouseEnter={() => sound.playHover()}
            data-cursor={isOnInfoSection ? "SLIDES" : "INFO"}
            className={`px-2.5 py-1 rounded-xs font-display font-bold transition-colors ${isOnInfoSection
                ? "bg-white text-black"
                : "text-white/75 hover:text-white hover:bg-white/10"
              }`}
          >
            {isOnInfoSection ? "SLIDES" : "INFO"}
          </button>

          {onPrev && (
            <button
              onClick={handlePrevProject}
              onMouseEnter={() => sound.playHover()}
              title="Previous Project [←]"
              data-cursor="PREV"
              className="p-1.5 text-white/65 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
          )}
          {onNext && (
            <button
              onClick={handleNextProject}
              onMouseEnter={() => sound.playHover()}
              title="Next Project [→]"
              data-cursor="NEXT"
              className="p-1.5 text-white/65 hover:text-white transition-colors"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}

          <button
            onClick={handleClose}
            onMouseEnter={() => sound.playHover()}
            data-cursor="CLOSE"
            className="flex items-center gap-1 rounded-xs border border-white/25 px-2.5 py-1 text-white hover:bg-white hover:text-black transition-all font-semibold ml-1"
          >
            <X className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">ESC</span>
          </button>
        </div>
      </header>

      {/* 2. Vertical Progress Rail (Mép phải) */}
      <nav
        ref={chromeRailRef}
        aria-label="Slide navigation"
        className="fixed right-4 sm:right-7 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-2.5"
      >
        {slides.map((_, idx) => {
          const isActive = activeSlideIndex === idx;
          const slideLabel = String(idx + 1).padStart(2, "0");
          return (
            <button
              key={idx}
              onClick={() => goToSection(idx)}
              onMouseEnter={() => sound.playHover()}
              data-cursor={slideLabel}
              aria-label={`Slide ${idx + 1}`}
              className="group flex items-center gap-2 py-0.5 focus:outline-hidden"
            >
              <span
                className={`font-display text-[10px] tracking-widest transition-opacity duration-300 ${isActive
                    ? "opacity-100 text-white font-bold"
                    : "opacity-0 group-hover:opacity-80 text-white/60"
                  }`}
              >
                {slideLabel}
              </span>
              <span
                className={`block transition-all duration-300 rounded-full ${isActive
                    ? "h-6 w-[3px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                    : "h-2.5 w-[2px] bg-white/30 group-hover:bg-white/75 group-hover:h-4"
                  }`}
              />
            </button>
          );
        })}

        <button
          onClick={() => goToSection(infoSectionIndex)}
          onMouseEnter={() => sound.playHover()}
          data-cursor="INFO"
          aria-label="Project Info"
          className="group flex items-center gap-2 pt-1.5 mt-1 border-t border-white/15 focus:outline-hidden"
        >
          <span
            className={`font-display text-[10px] tracking-widest transition-opacity duration-300 ${isOnInfoSection
                ? "opacity-100 text-amber-300 font-bold"
                : "opacity-40 group-hover:opacity-100 text-white/70"
              }`}
          >
            INFO
          </span>
          <span
            className={`block transition-all duration-300 rounded-full ${isOnInfoSection
                ? "h-6 w-[3px] bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.7)]"
                : "h-2.5 w-[2px] bg-white/30 group-hover:bg-amber-300/80 group-hover:h-4"
              }`}
          />
        </button>
      </nav>

      {/* 3. GPU Curtain Stack: Từng slide trồi từ dưới lên mượt bằng transform translate3d */}
      <div className="relative h-full w-full">
        {slides.map((slideSrc, idx) => {
          const isPast = idx < activeSlideIndex;
          const isCurrent = idx === activeSlideIndex;
          const currentLabel = String(idx + 1).padStart(2, "0");
          const totalLabel = String(slides.length).padStart(2, "0");

          const transformStyle = isCurrent
            ? "translate3d(0, 0, 0) scale(1)"
            : isPast
              ? "translate3d(0, -4%, 0) scale(0.95)"
              : "translate3d(0, 100%, 0) scale(1)";

          return (
            <section
              key={`${project.id}-slide-${idx}`}
              aria-hidden={!isCurrent}
              style={{
                zIndex: 10 + idx,
                transform: transformStyle,
                opacity: isPast ? 0.22 : 1,
                transition: `transform 620ms ${SLIDE_EASING}, opacity 620ms ${SLIDE_EASING}`,
              }}
              className={`absolute inset-0 h-full w-full ${
                idx === 0 ? "bg-transparent" : "bg-[#070709] border-t border-white/10"
              } flex items-center justify-center px-4 sm:px-10 md:px-16 pt-16 pb-16 sm:pt-[4.25rem] sm:pb-[4.25rem] will-change-transform ${
                isCurrent ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              {/* Khung ảnh khớp chuẩn tỷ lệ gốc 1414/1000 để FLIP zoom và ảnh hiển thị đúng cỡ không dư viền */}
              <div
                ref={idx === 0 ? firstFrameRef : undefined}
                style={{ width: "min(100%, calc((100dvh - 8.5rem) * 1.414), 1720px)" }}
                className="relative aspect-[1414/1000] will-change-transform flex items-center justify-center"
              >
                <Image
                  src={slideSrc}
                  alt={`${project.title} — Slide ${idx + 1}`}
                  fill
                  priority={idx <= 1}
                  loading="eager"
                  sizes="100vw"
                  className="object-contain select-none"
                />
              </div>

              {/* Chỉ báo số trang góc trái dưới */}
              <div className="pointer-events-none absolute left-5 sm:left-9 bottom-4 sm:bottom-5 flex items-center gap-2.5 font-display text-xs tracking-widest text-white/55">
                <span className="text-white font-bold">{currentLabel}</span>
                <span>/</span>
                <span>{totalLabel}</span>
              </div>

              {/* Gợi ý vuốt/cuộn xuống trồi lớp tiếp theo */}
              <button
                onClick={() => goToSection(idx + 1)}
                onMouseEnter={() => sound.playHover()}
                data-cursor="NEXT SLIDE"
                className="absolute bottom-3.5 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/15 bg-[#0e0e12]/90 px-4 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75 hover:border-white/50 hover:text-white transition-colors"
              >
                <span>{idx === slides.length - 1 ? "PROJECT INFO" : "SCROLL FOR NEXT"}</span>
                <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
              </button>
            </section>
          );
        })}

        {/* 4. Final Curtain: Màn hình thông tin dự án tối giản */}
        <section
          ref={infoScrollRef}
          aria-hidden={!isOnInfoSection}
          style={{
            zIndex: 10 + slides.length,
            transform: isOnInfoSection ? "translate3d(0, 0, 0)" : "translate3d(0, 100%, 0)",
            transition: `transform 620ms ${SLIDE_EASING}`,
          }}
          className={`absolute inset-0 h-full w-full overflow-y-auto bg-[#09090c] border-t border-white/15 flex items-start md:items-center justify-center px-6 sm:px-12 md:px-20 py-20 sm:py-24 will-change-transform custom-scrollbar ${isOnInfoSection ? "pointer-events-auto" : "pointer-events-none"
            }`}
        >
          <div className="w-full max-w-4xl mx-auto flex flex-col gap-10 sm:gap-12">
            {/* Heading tối giản */}
            <div className="flex flex-col gap-3 border-b border-white/10 pb-8">
              <div className="flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em] text-white/45">
                <span>{project.category}</span>
                <span>—</span>
                <span>{project.year}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white">
                {project.title}
              </h2>
            </div>

            {/* Nội dung cô đọng */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-7 flex flex-col gap-6">
                <p className="font-sans text-base sm:text-lg leading-relaxed text-white/80 select-text">
                  {project.description}
                </p>

                {project.roles.length > 0 && (
                  <p className="font-sans text-xs uppercase tracking-widest text-white/45 pt-1">
                    {project.roles.join("  ·  ")}
                  </p>
                )}
              </div>

              <div className="md:col-span-5 flex flex-col gap-3.5 font-sans text-xs border-t border-white/10 pt-6 md:border-t-0 md:border-l md:border-white/10 md:pt-0 md:pl-10">
                <div className="flex justify-between gap-4">
                  <span className="text-white/40 uppercase tracking-wider">Client</span>
                  <span className="text-white/90 text-right">{project.client}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/40 uppercase tracking-wider">Year</span>
                  <span className="text-white/90">{project.year}</span>
                </div>
                {project.credits
                  .filter((c) => {
                    const roleKey = c.role.trim().toLowerCase();
                    return roleKey !== "year" && roleKey !== "client" && roleKey !== "category";
                  })
                  .map((c, i) => (
                    <div key={i} className="flex justify-between gap-4">
                      <span className="text-white/40 uppercase tracking-wider">{c.role}</span>
                      <span className="text-white/90 text-right">{c.name}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Điều hướng đáy */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10 font-sans text-xs uppercase tracking-widest">
              <button
                onClick={() => goToSection(0)}
                onMouseEnter={() => sound.playHover()}
                data-cursor="TOP"
                className="flex items-center gap-2 text-white/55 hover:text-white transition-colors"
              >
                <ArrowUp className="h-3.5 w-3.5" />
                <span>Back to Slide 01</span>
              </button>

              <div className="flex items-center gap-3">
                {onPrev && (
                  <button
                    onClick={handlePrevProject}
                    onMouseEnter={() => sound.playHover()}
                    data-cursor="PREV"
                    className="flex items-center gap-2 rounded-xs border border-white/20 px-4 py-2 text-white/80 hover:border-white hover:text-white transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Prev</span>
                  </button>
                )}
                {onNext && (
                  <button
                    onClick={handleNextProject}
                    onMouseEnter={() => sound.playHover()}
                    data-cursor="NEXT"
                    className="flex items-center gap-2 rounded-xs bg-white px-4 py-2 text-black font-semibold hover:bg-white/90 transition-colors"
                  >
                    <span>Next Project</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function ProjectModal({
  project,
  originRect,
  onClose,
  onBackToCategory,
  onNext,
  onPrev,
}: ProjectModalProps) {
  useScrollLock(Boolean(project));

  if (!project) return null;

  return (
    <ProjectDeck
      key={project.id}
      project={project}
      originRect={originRect}
      onClose={onClose}
      onBackToCategory={onBackToCategory}
      onNext={onNext}
      onPrev={onPrev}
    />
  );
}
