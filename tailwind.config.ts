import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#4a78f0",
        "text-primary": "#f2f2f2",
        "text-secondary": "#8b93b0",
        "text-muted": "#4a5070",
        "bg-primary": "#0a0c12",
        "bg-secondary": "#111420",
      },
      fontFamily: {
        display: ["Instrument Serif", "Georgia", "serif"],
        mono: ["DM Mono", "monospace"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
