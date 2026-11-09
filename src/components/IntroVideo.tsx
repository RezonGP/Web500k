"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Volume2, VolumeX, FastForward } from "lucide-react";
import CamcorderHUD from "./CamcorderHUD";

interface IntroVideoProps {
  onComplete: () => void;
}

export default function IntroVideo({ onComplete }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const isFinishedRef = useRef<boolean>(false);

  const finishIntro = useCallback(() => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;

    // Pause video exactly on the stable cover frame so it doesn't loop or cut to black
    if (videoRef.current) {
      videoRef.current.pause();
    }

    // Trigger smooth fade-out of video overlay and HUD elements
    setIsTransitioning(true);

    // After fade transition, unmount intro completely
    setTimeout(() => {
      onComplete();
    }, 450);
  }, [onComplete]);

  // 1. Vừa vào web là tự động chạy video ngay lập tức (không cần click)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay muted prevented by browser:", err);
        });
      }
    }
  }, []);

  // 2. Cắt khúc mờ tối ở cuối video: dừng ở cuối giây thứ 5 (~5.20s - Frame 156)
  // ngay khi trang bìa Portfolio TRẦN NAM TIẾN đạt độ sáng và độ nét tối đa (100%)
  const handleTimeUpdate = () => {
    if (videoRef.current && !isFinishedRef.current) {
      if (videoRef.current.currentTime >= 5.2) {
        finishIntro();
      }
    }
  };

  const handleEnded = () => {
    finishIntro();
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    finishIntro();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        finishIntro();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [finishIntro]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-transparent transition-opacity duration-500 ease-out ${
        isTransitioning ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Camcorder Viewfinder HUD: Chỉ hiển thị bên trong IntroVideo khi đang chiếu.
          Sau khi video xong (~5.2s) thì mờ dần và tắt hoàn toàn cùng video */}
      <CamcorderHUD
        visible={!isTransitioning}
        isRecording={true}
        aspectRatio="16:9"
        title="TRẦN NAM TIẾN"
      />

      {/* Intro Video Element: Tự động chạy ngay lập tức khi vào web */}
      <video
        ref={videoRef}
        src="/intro.mp4"
        autoPlay
        muted={isMuted}
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className="h-full w-full object-cover select-none pointer-events-none"
      />

      {/* Control Pills: Sound toggle & Skip Intro */}
      <div
        className={`absolute bottom-6 right-6 z-50 flex items-center gap-3 font-display text-[11px] font-bold uppercase tracking-wider sm:bottom-10 sm:right-12 transition-opacity duration-300 ${
          isTransitioning ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <button
          onClick={toggleSound}
          data-cursor="SOUND"
          className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-white/90 backdrop-blur-md transition-all hover:border-white hover:bg-white hover:text-black"
        >
          {isMuted ? <VolumeX className="h-3.5 w-3.5 text-red-400" /> : <Volume2 className="h-3.5 w-3.5 text-emerald-400" />}
          <span>{isMuted ? "SOUND OFF" : "SOUND ON"}</span>
        </button>

        <button
          onClick={handleSkip}
          data-cursor="SKIP"
          className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-white/90 backdrop-blur-md transition-all hover:border-white hover:bg-white hover:text-black"
        >
          <span>SKIP</span>
          <FastForward className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
