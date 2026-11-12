"use client";

import React, { useRef } from "react";
import {
  IntroVideo,
  HeroCover,
  Navigation,
  TableOfContents,
  CategoryModal,
  HomeSlider,
  ProjectModal,
  AboutSection,
  ContactSection,
  SmokeSpotlightCanvas,
} from "@/components";
import { projects } from "@/data/projects";
import { usePortfolioState, useScrollTo } from "@/hooks";

export default function Home() {
  const {
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
  } = usePortfolioState();

  const tocRef = useRef<HTMLDivElement>(null);
  const scrollTo = useScrollTo();

  const handleExploreWorks = () => {
    handleNavigate("works");
    if (tocRef.current) {
      scrollTo(tocRef.current, { offset: -70, duration: 1.2 });
    }
  };

  const onNavigateAndScroll = (section: string) => {
    handleNavigate(section);
    scrollTo(0, { duration: 0.8 });
  };

  return (
    <main className="relative min-h-screen w-full bg-[#08080a] text-white selection:bg-red-500 selection:text-white">
      {/* 0. Nền khói xám chuyển động tự động toàn trang (Fixed Global Smoke & Spotlight Background) */}
      <SmokeSpotlightCanvas />

      {/* 1. Intro Cinematic Video */}
      {showIntro && <IntroVideo onComplete={handleIntroComplete} />}

      {/* 2. Top Header Navigation Bar */}
      {!showIntro && (
        <Navigation
          currentSection={currentSection}
          onNavigate={onNavigateAndScroll}
          viewMode={viewMode}
          onToggleViewMode={handleToggleViewMode}
          audioActive={audioActive}
          onToggleAudio={handleToggleAudio}
        />
      )}

      {/* 3. Main Section Content */}
      <div className="relative z-10 w-full">
        {currentSection === "works" && (
          <>
            {/* 1. Hero Cover */}
            <HeroCover onExplore={handleExploreWorks} />

            {/* 2. Table of Contents (Discipline Matrix) */}
            <div ref={tocRef} className="relative z-10">
              <TableOfContents onSelectCategory={handleSelectCategory} />
            </div>

            {/* 3. Selected Works Gallery (Always active for seamless scrolling) */}
            <div className="relative z-10">
              <HomeSlider
                projects={projects}
                onSelectProject={handleSelectProject}
                viewMode={viewMode}
              />
            </div>
          </>
        )}

        {currentSection === "about" && (
          <AboutSection onBack={() => onNavigateAndScroll("works")} />
        )}

        {currentSection === "directors" && (
          <AboutSection onBack={() => onNavigateAndScroll("works")} />
        )}

        {currentSection === "contact" && (
          <ContactSection />
        )}
      </div>

      {/* 4. Level 2 Category Overview Modal */}
      <CategoryModal
        category={activeCategory}
        projects={projects}
        onClose={handleCloseCategory}
        onSelectProject={handleSelectProject}
        isProjectOpen={Boolean(selectedProject)}
      />

      {/* 5. Level 3 Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        originRect={projectOriginRect}
        onClose={handleCloseProject}
        onBackToCategory={activeCategory ? handleCloseProject : undefined}
        onNext={handleNextProject}
        onPrev={handlePrevProject}
      />
    </main>
  );
}
