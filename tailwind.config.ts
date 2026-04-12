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
        jungle: {
          DEFAULT: "#1A3728",
        },
        canopy: {
          DEFAULT: "#2D6A4F",
        },
        sea: {
          DEFAULT: "#0B7A7A",
        },
        wave: {
          DEFAULT: "#4BBFBF",
        },
        gold: {
          DEFAULT: "#C9941A",
          hover: "#B8841A",
        },
        cream: {
          DEFAULT: "#FBF8F1",
        },
        sand: {
          DEFAULT: "#F2E4C0",
        },
        mist: {
          DEFAULT: "#E8F4F1",
        },
        night: {
          DEFAULT: "#0D1C14",
        },
        bark: {
          DEFAULT: "#6B4C2A",
        },
        fog: {
          DEFAULT: "#5C7A6A",
        },
        wa: {
          DEFAULT: "#25D366",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Nunito", "system-ui", "sans-serif"],
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
        card: "0 1px 4px rgba(13, 28, 20, 0.08)",
        cta: "0 2px 8px rgba(201, 148, 26, 0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-up": "fadeUp 0.6s ease-out",
        "slide-in": "slideIn 0.4s ease-out",
        "hero-scale": "heroScale 12s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        fadeUp: { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        slideIn: { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(0)" } },
        heroScale: { "0%": { transform: "scale(1)" }, "100%": { transform: "scale(1.04)" } },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
} satisfies Config;
