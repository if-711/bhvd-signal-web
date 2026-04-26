import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-base":    "#0a0c12",
        "bg-surface": "#111420",
        "bg-raised":  "#181c2e",
        "bg-high":    "#1f2438",
        "text-primary":   "#f2f2f2",
        "text-secondary": "#8b93b0",
        "text-muted":     "#4a5070",
        "signal-green":     "#1e9459",
        "signal-green-bg":  "#071610",
        "signal-yellow":    "#c07718",
        "signal-yellow-bg": "#16100a",
        "signal-red":       "#9e3028",
        "signal-red-bg":    "#150a08",
        "accent": "#4a78f0",
      },
      fontFamily: {
        display: ["Instrument Serif", "Georgia", "serif"],
        mono:    ["DM Mono", "monospace"],
        sans:    ["DM Sans", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0.3" },
        },
        skeleton: {
          "0%,100%": { opacity: "0.4" },
          "50%":     { opacity: "0.8" },
        },
      },
      animation: {
        "fade-up":   "fadeUp 0.6s ease both",
        "pulse-dot": "pulseDot 2s ease infinite",
        "skeleton":  "skeleton 1.2s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
