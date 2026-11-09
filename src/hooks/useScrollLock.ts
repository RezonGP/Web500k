"use client";

import { useEffect } from "react";

/**
 * Hook to pause Lenis and lock body scroll when an overlay / modal is open.
 * Restores original scroll behavior automatically on cleanup.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const win = window as unknown as {
      lenis?: { stop: () => void; start: () => void };
    };

    if (win.lenis) {
      win.lenis.stop();
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      if (win.lenis) {
        win.lenis.start();
      }
      document.body.style.overflow = originalOverflow;
    };
  }, [locked]);
}

