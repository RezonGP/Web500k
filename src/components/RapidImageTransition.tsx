"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface RapidImageTransitionProps {
  active: boolean;
  onFinish: () => void;
  images?: string[];
}

// ONLY real project images from Nam Tien's portfolio
const realProjectImages = [
  "/images/proj_247express.jpg",
  "/images/proj_247_poster.jpg",
  "/images/proj_haita_matcha.jpg",
  "/images/proj_obt_rap.jpg",
  "/images/proj_typography.jpg",
  "/images/proj_monaco.jpg",
  "/images/proj_lsima.jpg",
  "/images/cv_profile.jpg",
];

function playShutterSound() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const bufferSize = ctx.sampleRate * 0.04;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 2200;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch {
    // audio muted/blocked
  }
}

export default function RapidImageTransition({
  active,
  onFinish,
  images = realProjectImages,
}: RapidImageTransitionProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    if (!active) return;

    setCurrentIdx(0);
    playShutterSound();

    let step = 0;
    const totalSteps = images.length;
    const intervalTime = 60; // 60ms per frame

    const timer = setInterval(() => {
      step++;
      if (step < totalSteps) {
        setCurrentIdx(step);
        if (step % 2 === 0) playShutterSound();
      } else {
        clearInterval(timer);
        setTimeout(() => {
          onFinishRef.current();
        }, 80);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [active, images.length]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black pointer-events-none select-none"
      aria-hidden="true"
    >
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={images[currentIdx] || images[0]}
          alt="Shutter Frame"
          fill
          priority
          sizes="100vw"
          className="object-contain sm:object-cover"
        />

        {/* Film Flash Glitch Light Leak */}
        <div className="absolute inset-0 bg-white/10 mix-blend-screen" />
        <div className="absolute inset-0 bg-radial-vignette opacity-50" />

        {/* Frame metadata tag */}
        <div className="absolute bottom-10 left-10 font-display text-xs font-bold uppercase tracking-wider text-white/90 drop-shadow bg-black/60 px-3 py-1 border border-white/20">
          <span>FRAME // 00{currentIdx + 1}</span>
        </div>
      </div>
    </div>
  );
}
