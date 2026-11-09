import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#f5f5f5",
        cine: {
          dark: "#050505",
          panel: "#0d0d0d",
          border: "rgba(255, 255, 255, 0.12)",
          rec: "#ff2222",
          hud: "rgba(255, 255, 255, 0.85)",
          dim: "rgba(255, 255, 255, 0.45)",
          accent: "#ffe95a",
          cyan: "#49dbe5",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        wide: "0.08em",
        widest: "0.18em",
      },
    },
  },
  plugins: [],
};
export default config;
