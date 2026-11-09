"use client";

import React, { useEffect, useState } from "react";

interface CamcorderHUDProps {
  visible?: boolean;
  isRecording?: boolean;
  aspectRatio?: "16:9" | "4:3";
  title?: string;
}

export default function CamcorderHUD({
  visible = true,
  isRecording = true,
  aspectRatio = "16:9",
  title = "TRẦN NAM TIẾN",
}: CamcorderHUDProps) {
  const [timeStr, setTimeStr] = useState<string>("00:00:00 PM");
  const [batteryLevel, setBatteryLevel] = useState<number>(85);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      setTimeStr(`${String(hours).padStart(2, "0")}:${minutes}:${seconds} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 select-none overflow-hidden font-mono text-[11px] uppercase tracking-widest text-white/80 sm:text-[13px]"
      aria-hidden="true"
    >
      {/* 4 Corner Viewfinder Brackets */}
      <div className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-white/60 sm:left-8 sm:top-8 sm:h-9 sm:w-9" />
      <div className="absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-white/60 sm:right-8 sm:top-8 sm:h-9 sm:w-9" />
      <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-white/60 sm:bottom-8 sm:left-8 sm:h-9 sm:w-9" />
      <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-white/60 sm:bottom-8 sm:right-8 sm:h-9 sm:w-9" />

      {/* Center Subtle Crosshair / Focus Marks */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
        <div className="relative h-12 w-12 sm:h-16 sm:w-16">
          <div className="absolute left-0 top-1/2 h-[1px] w-3 -translate-y-1/2 bg-white" />
          <div className="absolute right-0 top-1/2 h-[1px] w-3 -translate-y-1/2 bg-white" />
          <div className="absolute left-1/2 top-0 h-3 w-[1px] -translate-x-1/2 bg-white" />
          <div className="absolute bottom-0 left-1/2 h-3 w-[1px] -translate-x-1/2 bg-white" />
          <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60" />
        </div>
      </div>

      {/* Top HUD Bar */}
      <div className="absolute left-6 right-6 top-6 flex items-center justify-between sm:left-12 sm:right-12 sm:top-8">
        <div className="flex items-center gap-4 sm:gap-8">
          <span className="font-semibold text-white drop-shadow">CAMERA 01</span>
          <span className="hidden opacity-60 md:inline-block">•</span>
          <span className="text-white/90 drop-shadow">{title}</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <span className="border border-white/30 px-1.5 py-0.5 text-[10px] tracking-normal sm:text-xs">
            {aspectRatio}
          </span>

          {/* Battery Indicator */}
          <div className="flex items-center gap-1.5">
            <span className="hidden sm:inline-block text-[10px] text-white/60">BATT</span>
            <div className="relative flex h-3 w-6 items-center rounded-sm border border-white/60 p-0.5">
              <div
                className="h-full rounded-xs bg-emerald-400"
                style={{ width: `${batteryLevel}%` }}
              />
              <div className="absolute -right-[3px] top-[2px] h-[6px] w-[2px] rounded-r-xs bg-white/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom HUD Bar */}
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between sm:bottom-8 sm:left-12 sm:right-12">
        {/* Timecode & Optical Settings */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
          <span className="text-white font-medium drop-shadow tabular-nums">{timeStr}</span>
          <div className="flex items-center gap-2 sm:gap-4 text-white/60 text-[10px] sm:text-xs">
            <span>F4.5</span>
            <span>•</span>
            <span>ISO AUTO</span>
            <span>•</span>
            <span>1/50</span>
            <span>•</span>
            <span className="hidden xs:inline">4K 60FPS</span>
          </div>
        </div>

        {/* REC Indicator */}
        <div className="flex items-center gap-2">
          {isRecording && (
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-full w-full rounded-full bg-red-600 shadow-[0_0_8px_#ff2222]" />
            </span>
          )}
          <span className="font-bold tracking-widest text-red-500 drop-shadow">REC</span>
        </div>
      </div>
    </div>
  );
}

