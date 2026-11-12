"use client";

import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import type { Project, CategoryType, CategoryMeta } from "@/types";
import { X, ArrowUpRight, ArrowLeft } from "lucide-react";
import { sound } from "@/utils/audio";
import { useScrollLock, useKeyPress } from "@/hooks";

interface CategoryModalProps {
  category: CategoryType | null;
  projects: Project[];
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  isProjectOpen?: boolean;
}

const categoryMeta: Record<CategoryType, CategoryMeta> = {
  "KEY VISUAL": {
    subtitle: "Art Direction & Key Visual",
    intro:
      "Khám phá nghệ thuật thị giác định hình phong cách, khai thác độ tương phản, chất liệu gai góc và chiều sâu không gian trừu tượng.",
    heroButton: "/images/category_buttons/btn_hero_key_visual.png",
  },
  "PACKAGING DESIGN": {
    subtitle: "Packaging & Print Production",
    intro:
      "Giải pháp bao bì toàn diện từ đồ uống năng động, bìa sách văn học, ấn phẩm lịch để bàn cho đến sản phẩm công nghiệp cao cấp.",
    heroButton: "/images/category_buttons/btn_hero_packaging.png",
  },
  "BRANDING": {
    subtitle: "Brand Identity & Design System",
    intro:
      "Hệ thống nhận diện thương hiệu hoàn chỉnh: định hình ngôn ngữ biểu tượng, logo typography, ấn phẩm ứng dụng và cẩm nang quy chuẩn.",
    heroButton: "/images/category_buttons/btn_hero_branding.png",
  },
  "TYPOGRAPHIC": {
    subtitle: "3D Spatial Form & Liquid Chrome",
    intro:
      "Nghệ thuật chữ trong không gian 3 chiều và bề mặt kim loại lỏng. Phá vỡ cấu trúc chữ 2D truyền thống để tạo nên những tác phẩm điêu khắc đương đại.",
    heroButton: "/images/category_buttons/btn_hero_typographic.png",
  },
  "CAMPAIGN": {
    subtitle: "Social Media & Advertising",
    intro:
      "Hệ thống ấn phẩm truyền thông mạng xã hội và poster quảng bá sản phẩm, tối ưu thị giác và gia tăng nhận diện thương hiệu đa nền tảng.",
    heroButton: "/images/category_buttons/btn_hero_campaign.png",
  },
};

export default function CategoryModal({
  category,
  projects,
  onClose,
  onSelectProject,
  isProjectOpen = false,
}: CategoryModalProps) {
  const handleClose = useCallback(() => {
    sound.playClick();
    onClose();
  }, [onClose]);

  // Lock body scroll and pause Lenis smoothly
  useScrollLock(Boolean(category));

  // Handle ESC keyboard shortcut - only active when no child modal (ProjectModal) is open
  const keyMap = useMemo(() => ({ Escape: handleClose }), [handleClose]);
  useKeyPress(keyMap, Boolean(category && !isProjectOpen));

  if (!category) return null;

  const categoryProjects = projects.filter((p) => p.category === category);
  const meta = categoryMeta[category] || {
    subtitle: "Selected Works",
    intro: "Tập hợp các tác phẩm thiết kế đồ họa tiêu biểu.",
    heroButton: "/images/category_buttons/btn_hero_key_visual.png",
  };

  const handleCardClick = (p: Project) => {
    sound.playClick();
    onSelectProject(p);
  };

  return (
    <div
      onClick={handleClose}
      data-lenis-prevent
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/92 p-3 sm:p-6 md:p-8 backdrop-blur-2xl animate-in fade-in duration-300"
    >
      {/* Modal Dialog Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-xs border border-white/20 bg-neutral-950 shadow-[0_0_80px_rgba(0,0,0,0.95)] animate-in zoom-in-95 duration-300 overflow-hidden"
      >
        {/* 1. Sticky Top Control Bar */}
        <div className="shrink-0 flex items-center justify-between border-b border-white/10 px-5 sm:px-8 py-4 font-sans text-xs uppercase tracking-wider text-white/60 bg-neutral-950 z-20 font-medium">
          <div className="flex items-center gap-3">
            <button
              onClick={handleClose}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors border-r border-white/20 pr-4"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>RETURN TO INDEX</span>
            </button>
            <span className="text-white font-display font-bold text-sm">{category}</span>
            <span>•</span>
            <span className="text-amber-300 font-display font-bold">{categoryProjects.length} PROJECTS</span>
          </div>

          <button
            onClick={handleClose}
            onMouseEnter={() => sound.playHover()}
            data-cursor="CLOSE"
            className="flex items-center gap-1.5 rounded-sm border border-white/30 px-3.5 py-1.5 text-white hover:bg-white hover:text-black transition-all font-sans text-xs font-semibold"
          >
            <X className="h-4 w-4" />
            <span>ESC</span>
          </button>
        </div>

        {/* 2. Scrollable Modal Content */}
        <div
          data-lenis-prevent
          className="overflow-y-auto overflow-x-hidden p-5 sm:p-8 flex-1 custom-scrollbar space-y-8"
          style={{ overscrollBehavior: "contain" }}
        >
          {/* Category Header with Hero Button Banner */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-8">
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="font-display text-xs uppercase tracking-wider text-amber-400 font-bold">
                // {meta.subtitle}
              </span>
              <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
                {category}
              </h2>
              <p className="font-sans text-sm text-white/75 leading-relaxed pt-2">
                {meta.intro}
              </p>
            </div>

            {/* Hero Button Art Graphic as Visual Anchor */}
            <div className="relative w-full md:w-80 aspect-[2014/696] shrink-0 overflow-hidden rounded-[2px] border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.15)] bg-black">
              <Image
                src={meta.heroButton}
                alt={category}
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Projects Grid: Thể hiện các tác phẩm của Button này */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-2">
            {categoryProjects.map((proj, idx) => (
              <div
                key={proj.id}
                onClick={() => handleCardClick(proj)}
                onMouseEnter={() => sound.playHover()}
                data-cursor="OPEN"
                className="group cursor-pointer flex flex-col gap-3.5 rounded-xs border border-white/15 bg-black p-4 transition-all duration-300 hover:border-white hover:shadow-[0_0_35px_rgba(255,255,255,0.22)] hover:-translate-y-1"
              >
                {/* Project Hero Visual Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xs bg-neutral-900 border border-white/10">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />

                  {/* Index Badge */}
                  <div className="absolute left-3 top-3 font-display text-[11px] font-bold text-white/90 bg-black/85 px-2.5 py-1 backdrop-blur-xs border border-white/20">
                    0{idx + 1} // {proj.year}
                  </div>

                  {/* Open Indicator */}
                  <div className="absolute right-3 top-3 rounded-full bg-white text-black p-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:rotate-45 shadow-lg">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Title & Metadata Line */}
                <div className="flex flex-col gap-1 font-sans text-xs pt-1">
                  <div className="flex items-baseline justify-between text-white font-bold">
                    <span className="font-display text-sm tracking-wide truncate group-hover:text-amber-300 transition-colors">
                      {proj.title}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-white/60">
                    <span className="truncate">{proj.client}</span>
                    <span className="text-[11px] text-amber-300/90 group-hover:text-white transition-colors flex items-center gap-1 font-semibold">
                      DOSSIER <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
