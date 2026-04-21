import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#344968',            // primary background — navy blue
        'void-dark': '#273856',     // deeper navy for contrast sections
        'void-light': '#3e5578',    // lighter navy for card surfaces
        'void-lighter': '#4a6484',  // even lighter navy for subtle borders
        'void-border': '#4a6285',   // subtle border color
        gold: '#ab6c3d',            // primary accent — copper/amber
        'gold-light': '#c47d4a',    // hover states
        'gold-dark': '#8a5230',     // depth / darker gold
        'gold-dim': '#1e2e42',      // very subtle gold tint bg
        turquoise: '#5b8fa8',       // secondary accent for links
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'scroll-left': 'scrollLeft 30s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
