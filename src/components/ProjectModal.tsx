"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import type { Project } from "@/types";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { sound } from "@/utils/audio";
import { useScrollLock, useKeyPress } from "@/hooks";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onBackToCategory?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function ProjectModal({
  project,
  onClose,
  onBackToCategory,
  onNext,
  onPrev,
}: ProjectModalProps) {
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    if (project) {
      setActiveImage(project.image);
    }
  }, [project]);

  const handleClose = useCallback(() => {
    sound.playClick();
    onClose();
  }, [onClose]);

  const handleNext = useCallback(() => {
    if (onNext) {
      sound.playSlide();
      onNext();
    }
  }, [onNext]);

  const handlePrev = useCallback(() => {
    if (onPrev) {
      sound.playSlide();
      onPrev();
    }
  }, [onPrev]);

  // Lock body scroll and pause Lenis smoothly
  useScrollLock(Boolean(project));

  // Handle keyboard shortcuts (Escape, Next, Prev)
  const keyMap = useMemo(
    () => ({
      Escape: handleClose,
      ArrowRight: handleNext,
      ArrowLeft: handlePrev,
    }),
    [handleClose, handleNext, handlePrev]
  );
  useKeyPress(keyMap, Boolean(project));

  if (!project) return null;

  return (
    <div
      onClick={handleClose}
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-6 md:p-8 backdrop-blur-2xl animate-in fade-in duration-300"
    >
      {/* Modal Dialog Card: Chiều cao tối đa 92vh, flex flex-col cố định header, cuộn mượt mà phần thân */}
      <div
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-xs border border-white/20 bg-neutral-950 shadow-[0_0_80px_rgba(0,0,0,0.95)] animate-in zoom-in-95 duration-300 overflow-hidden"
      >
        {/* 1. Sticky Top Control Bar: Luôn ghim cố định ở đỉnh, không bao giờ bị cuộn mất */}
        <div className="shrink-0 flex items-center justify-between border-b border-white/10 px-5 sm:px-8 py-4 font-sans text-xs uppercase tracking-wider text-white/60 bg-neutral-950 z-20 font-medium">
          <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
            {onBackToCategory && (
              <button
                onClick={onBackToCategory}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors border-r border-white/20 pr-3 sm:pr-4 shrink-0"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">BACK TO {project.category}</span>
                <span className="sm:hidden">BACK</span>
              </button>
            )}
            <span className="text-white font-display font-bold truncate">DOSSIER // {project.id.toUpperCase()}</span>
            <span>•</span>
            <span className="text-amber-300 font-display font-bold shrink-0">{project.category}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0 ml-2">
            {onPrev && (
              <button
                onClick={handlePrev}
                onMouseEnter={() => sound.playHover()}
                title="Previous Project [←]"
                data-cursor="PREV"
                className="p-1 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            {onNext && (
              <button
                onClick={handleNext}
                onMouseEnter={() => sound.playHover()}
                title="Next Project [→]"
                data-cursor="NEXT"
                className="p-1 hover:text-white transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={handleClose}
              onMouseEnter={() => sound.playHover()}
              data-cursor="CLOSE"
              className="flex items-center gap-1.5 rounded-sm border border-white/30 px-3 py-1 text-white hover:bg-white hover:text-black transition-all font-sans text-xs font-semibold ml-1"
            >
              <X className="h-4 w-4" />
              <span>ESC</span>
            </button>
          </div>
        </div>

        {/* 2. Scrollable Body: Cuộn mượt mà toàn bộ nội dung, hỗ trợ con lăn chuột và trackpad */}
        <div
          data-lenis-prevent
          className="overflow-y-auto overflow-x-hidden p-5 sm:p-8 flex-1 custom-scrollbar space-y-6"
          style={{ overscrollBehavior: "contain" }}
        >
          {/* A. FEATURED ARTWORK: Huge, Centered, High-Resolution */}
          <div className="relative h-[48vh] sm:h-[60vh] md:h-[65vh] w-full overflow-hidden rounded-xs bg-black border border-white/15 shadow-2xl flex items-center justify-center">
            <Image
              src={activeImage || project.image}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-contain transition-all duration-300 ease-out select-none"
            />
          </div>

          {/* B. Thumbnail Stills Gallery Strip */}
          {project.stills && project.stills.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[11px] uppercase tracking-wider text-white/50 font-medium">
                PROJECT STILLS // CLICK TO VIEW ({project.stills.length} SLIDES)
              </span>
              <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                {project.stills.map((s, i) => {
                  const isActive = (activeImage || project.image) === s;
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        sound.playClick();
                        setActiveImage(s);
                      }}
                      onMouseEnter={() => sound.playHover()}
                      data-cursor="STILL"
                      className={`relative h-20 w-32 shrink-0 cursor-pointer overflow-hidden rounded-xs border transition-all duration-300 ${
                        isActive
                          ? "border-white ring-2 ring-white/60 scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                          : "border-white/20 opacity-50 hover:opacity-100 hover:border-white/60"
                      }`}
                    >
                      <Image src={s} alt={`Still ${i + 1}`} fill className="object-cover" />
                      <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 font-display text-[10px] font-bold text-white/80">
                        0{i + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* C. Project Header & Detailed Synopsis */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 pt-6 border-t border-white/10">
            <div className="md:col-span-2 flex flex-col gap-4">
              <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
                {project.title}
              </h2>

              {/* Concept Statement */}
              {project.concept && (
                <div className="rounded-xs border border-white/15 bg-white/5 p-4 font-sans text-xs text-white/90">
                  <span className="font-display font-bold text-amber-300 block mb-1.5 tracking-wider">// CONCEPT & ART DIRECTION</span>
                  <p className="leading-relaxed">{project.concept}</p>
                </div>
              )}

              <p className="font-sans text-sm leading-relaxed text-white/75 sm:text-base">
                {project.description}
              </p>

              {/* Scope / Roles Tags */}
              <div className="flex flex-wrap gap-2 pt-2 font-sans text-xs text-white/70 font-medium">
                {project.roles.map((r, i) => (
                  <span
                    key={i}
                    className="rounded-xs border border-white/20 px-3 py-1 bg-white/5 text-white/80"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Specifications Block */}
            <div className="flex flex-col gap-3 font-sans text-xs border-t border-white/10 pt-4 md:border-t-0 md:border-l md:border-white/10 md:pt-0 md:pl-6">
              <span className="font-display font-bold uppercase tracking-wider text-white border-b border-white/10 pb-1">
                SPECIFICATIONS
              </span>
              <div className="flex flex-col gap-2.5 pt-1">
                <div className="flex justify-between">
                  <span className="text-white/40">CLIENT:</span>
                  <span className="text-white font-medium">{project.client}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">YEAR:</span>
                  <span className="text-white font-display font-semibold">{project.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">CATEGORY:</span>
                  <span className="text-amber-300 font-display font-semibold">{project.category}</span>
                </div>
                {project.credits.map((c, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-white/40">{c.role.toUpperCase()}:</span>
                    <span className="text-white font-medium">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
