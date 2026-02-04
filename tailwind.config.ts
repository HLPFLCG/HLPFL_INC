import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // HLPFL Design System Colors
        void: {
          DEFAULT: "#0a0a0a",
          light: "#141414",
          lighter: "#1a1a1a",
        },
        gold: {
          DEFAULT: "#c87941",
          light: "#d4945c",
          dark: "#a86535",
          muted: "#c8794133",
        },
        cream: "#f5f5f5",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Bebas Neue", "sans-serif"],
        body: ["var(--font-space)", "Space Grotesk", "sans-serif"],
      },
      letterSpacing: {
        tight: "-0.02em",
        wide: "0.02em",
        wider: "0.05em",
        widest: "0.1em",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-up": "fadeUp 0.6s ease-out",
        "slide-in": "slideIn 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(200, 121, 65, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(200, 121, 65, 0.6)" },
        },
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
} satisfies Config;
