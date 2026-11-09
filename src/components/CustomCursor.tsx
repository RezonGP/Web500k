"use client";

import React, { useEffect, useState, useRef } from "react";

/**
 * CustomCursor: Hiển thị chữ gợi ý (Follower Text) dí theo con trỏ chuột.
 * ĐẶC ĐIỂM:
 * - Bỏ hoàn toàn viền tròn và chấm trắng (tránh 100% lỗi rác vệt trắng sọc hạt trên Chrome GPU).
 * - Chỉ có typography khắc màu (mix-blend-difference), tự động đảo màu trên nền trắng/đen.
 * - Chữ nằm chếch phía dưới chuột (+14px, +18px), không che khuất trỏ chuột hay phần tử tương tác.
 */
export default function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const textRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const textPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Chỉ kích hoạt trên máy tính có chuột (Desktop Pointer), bỏ qua màn hình cảm ứng
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "";
        setCursorText(text);
      } else {
        setCursorText("");
      }
    };

    const handleMouseLeave = () => {
      setCursorText("");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      // Lerp mượt mà cho chữ dí theo chuột
      textPos.current.x += (mousePos.current.x - textPos.current.x) * 0.25;
      textPos.current.y += (mousePos.current.y - textPos.current.y) * 0.25;

      if (textRef.current) {
        textRef.current.style.transform = `translate3d(${textPos.current.x + 14}px, ${textPos.current.y + 18}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[99999] select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* CHỈ CÓ TEXT KHẮC MÀU (mix-blend-difference), TUYỆT ĐỐI KHÔNG DÙNG VIỀN TRÒN HAY CHẤM TRẮNG */}
      <div
        ref={textRef}
        className={`fixed top-0 left-0 will-change-transform mix-blend-difference pointer-events-none transition-opacity duration-150 ${
          cursorText ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="font-display text-[11px] font-extrabold uppercase tracking-widest text-white select-none whitespace-nowrap">
          {cursorText}
        </span>
      </div>
    </div>
  );
}
