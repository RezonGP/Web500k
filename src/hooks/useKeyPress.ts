"use client";

import { useEffect } from "react";

type KeyHandler = (e: KeyboardEvent) => void;

/**
 * Hook to listen for specific key presses and trigger callbacks with automatic cleanup.
 */
export function useKeyPress(keyMap: Record<string, KeyHandler>, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const handler = keyMap[e.key];
      if (handler) {
        handler(e);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyMap, enabled]);
}

