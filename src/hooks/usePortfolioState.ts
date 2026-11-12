"use client";

import { useState, useCallback, useEffect } from "react";
import type { Project, CategoryType, NavSection, ViewMode, OriginRect } from "@/types";
import { projects } from "@/data/projects";

/**
 * Custom hook centralizing portfolio navigation and modal state logic.
 * Keeps page.tsx declarative, clean, and highly readable.
 */
export function usePortfolioState() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentSection, setCurrentSection] = useState<NavSection>("works");
  const [viewMode, setViewMode] = useState<ViewMode>("slider");
  const [activeCategory, setActiveCategory] = useState<CategoryType | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectOriginRect, setProjectOriginRect] = useState<OriginRect | null>(null);
  const [audioActive, setAudioActive] = useState(false);

  // Check URL query to allow instant skip for dev testing / direct linking
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("skipIntro") === "true") {
        setShowIntro(false);
      }
    }
  }, []);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  const handleNavigate = useCallback((section: NavSection | string) => {
    setCurrentSection(section as NavSection);
  }, []);

  const handleToggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === "slider" ? "grid" : "slider"));
  }, []);

  const handleToggleAudio = useCallback(() => {
    setAudioActive((prev) => !prev);
  }, []);

  const handleSelectCategory = useCallback((cat: CategoryType) => {
    setActiveCategory(cat);
  }, []);

  const handleCloseCategory = useCallback(() => {
    setActiveCategory(null);
  }, []);

  const handleSelectProject = useCallback((p: Project, originRect?: OriginRect) => {
    setProjectOriginRect(originRect ?? null);
    setSelectedProject(p);
  }, []);

  const handleCloseProject = useCallback(() => {
    setProjectOriginRect(null);
    setSelectedProject(null);
  }, []);

  const handleNextProject = useCallback(() => {
    if (!selectedProject) return;
    const currentList = activeCategory
      ? projects.filter((p) => p.category === activeCategory)
      : projects;
    const idx = currentList.findIndex((p) => p.id === selectedProject.id);
    const nextIdx = (idx + 1) % currentList.length;
    setProjectOriginRect(null);
    setSelectedProject(currentList[nextIdx]);
  }, [selectedProject, activeCategory]);

  const handlePrevProject = useCallback(() => {
    if (!selectedProject) return;
    const currentList = activeCategory
      ? projects.filter((p) => p.category === activeCategory)
      : projects;
    const idx = currentList.findIndex((p) => p.id === selectedProject.id);
    const prevIdx = (idx - 1 + currentList.length) % currentList.length;
    setProjectOriginRect(null);
    setSelectedProject(currentList[prevIdx]);
  }, [selectedProject, activeCategory]);

  return {
    showIntro,
    currentSection,
    viewMode,
    activeCategory,
    selectedProject,
    projectOriginRect,
    audioActive,
    handleIntroComplete,
    handleNavigate,
    handleToggleViewMode,
    handleToggleAudio,
    handleSelectCategory,
    handleCloseCategory,
    handleSelectProject,
    handleCloseProject,
    handleNextProject,
    handlePrevProject,
  };
}
