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
        void: {
          DEFAULT: "#0a0a0a",
          light: "#111111",
          lighter: "#1a1a1a",
        },
        gold: {
          DEFAULT: "#c87941",
          light: "#d4924f",
          dark: "#a8622e",
        },
        turquoise: {
          DEFAULT: "#0E9AA7",
          light: "#1BB5C4",
          dark: "#0A7A85",
          muted: "#0E9AA720",
        },
        cream: {
          DEFAULT: "#F5E6C8",
          light: "#FAF2E2",
          dark: "#E8D4A8",
        },
        wa: {
          DEFAULT: "#25D366",
        },
      },
      fontFamily: {
        display: ["Bebas Neue", "Impact", "sans-serif"],
        body: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tight: "-0.02em",
        wide: "0.05em",
        wider: "0.1em",
        widest: "0.2em",
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        pill: "50px",
      },
      boxShadow: {
        card: "0 1px 4px rgba(0, 0, 0, 0.2)",
        cta: "0 2px 8px rgba(200, 121, 65, 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-up": "fadeUp 0.6s ease-out",
        "slide-in": "slideIn 0.4s ease-out",
        "hero-scale": "heroScale 12s ease-in-out infinite alternate",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        fadeUp: { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        slideIn: { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(0)" } },
        heroScale: { "0%": { transform: "scale(1)" }, "100%": { transform: "scale(1.04)" } },
        glow: { "0%": { boxShadow: "0 0 20px rgba(200,121,65,0.3)" }, "100%": { boxShadow: "0 0 40px rgba(200,121,65,0.6)" } },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
} satisfies Config;
