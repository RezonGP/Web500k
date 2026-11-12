"use client";

import React, { useEffect, useRef } from "react";

/**
 * CustomCursor: Hiển thị chữ gợi ý (Follower Text) dí theo con trỏ chuột.
 * Tối ưu hiệu năng: cập nhật DOM trực tiếp qua ref (0 React re-render),
 * chỉ chạy requestAnimationFrame khi chuột di chuyển và tự ngủ khi đứng yên,
 * không dùng mix-blend-difference toàn màn hình.
 */
export default function CustomCursor() {
  const textRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const textPos = useRef({ x: -100, y: -100 });
  const lastTextRef = useRef("");

  useEffect(() => {
    // Chỉ kích hoạt trên máy tính có chuột (Desktop Pointer), bỏ qua màn hình cảm ứng
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rafId = 0;

    const updateLabel = (text: string) => {
      if (text === lastTextRef.current) return;
      lastTextRef.current = text;
      if (spanRef.current) {
        spanRef.current.textContent = text;
      }
      if (textRef.current) {
        textRef.current.style.opacity = text ? "1" : "0";
      }
    };

    const render = () => {
      const dx = mousePos.current.x - textPos.current.x;
      const dy = mousePos.current.y - textPos.current.y;

      textPos.current.x += dx * 0.25;
      textPos.current.y += dy * 0.25;

      if (textRef.current) {
        textRef.current.style.transform = `translate3d(${textPos.current.x + 14}px, ${textPos.current.y + 18}px, 0)`;
      }

      if (Math.abs(dx) > 0.25 || Math.abs(dy) > 0.25) {
        rafId = requestAnimationFrame(render);
      } else {
        rafId = 0;
      }
    };

    const wakeRaf = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest("[data-cursor]") as HTMLElement | null;
      const nextText = cursorTarget?.getAttribute("data-cursor") || "";
      updateLabel(nextText);

      if (nextText) {
        wakeRaf();
      }
    };

    const handleMouseLeave = () => {
      updateLabel("");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={textRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[99999] select-none opacity-0 will-change-transform transition-opacity duration-150"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      <span
        ref={spanRef}
        className="font-display text-[11px] font-extrabold uppercase tracking-widest text-white select-none whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
      />
    </div>
  );
}
