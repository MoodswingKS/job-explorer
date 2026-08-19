import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canopy: {
          DEFAULT: "#182821",
          light: "#213328",
          dark: "#101B16",
        },
        paper: {
          DEFAULT: "#F3EEDD",
          line: "#C9BE9E",
          dim: "#E7E0C9",
        },
        ink: "#20301F",
        brass: {
          DEFAULT: "#C99A3E",
          light: "#E0B85F",
          dark: "#9A742A",
        },
        rust: {
          DEFAULT: "#B4502F",
          light: "#CB6C4B",
        },
        sage: "#92A088",
      },
      fontFamily: {
        display: ["Barlow", "sans-serif"],
        sans: ["Barlow", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        grain: "120px 120px",
      },
    },
  },
  plugins: [],
};

export default config;
