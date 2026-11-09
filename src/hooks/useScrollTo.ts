"use client";

import { useCallback } from "react";

interface ScrollOptions {
  offset?: number;
  duration?: number;
  behavior?: ScrollBehavior;
}

/**
 * Hook providing a unified smooth scroll function that integrates with Lenis
 * and falls back safely to native window.scrollTo.
 */
export function useScrollTo() {
  const scrollTo = useCallback((target: HTMLElement | number, options?: ScrollOptions) => {
    if (typeof window === "undefined") return;

    const win = window as unknown as {
      lenis?: {
        scrollTo: (
          target: HTMLElement | number,
          opts?: { offset?: number; duration?: number }
        ) => void;
      };
    };

    if (win.lenis) {
      win.lenis.scrollTo(target, {
        offset: options?.offset ?? 0,
        duration: options?.duration ?? 1.0,
      });
      return;
    }

    if (typeof target === "number") {
      window.scrollTo({
        top: target + (options?.offset ?? 0),
        behavior: options?.behavior ?? "smooth",
      });
    } else if (target && typeof target.scrollIntoView === "function") {
      target.scrollIntoView({
        behavior: options?.behavior ?? "smooth",
      });
    }
  }, []);

  return scrollTo;
}

