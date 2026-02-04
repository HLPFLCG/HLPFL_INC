"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  className?: string;
}

const sizes = {
  sm: { width: 32, height: 32, fontSize: "text-xl" },
  md: { width: 48, height: 48, fontSize: "text-2xl" },
  lg: { width: 64, height: 64, fontSize: "text-3xl" },
  xl: { width: 96, height: 96, fontSize: "text-5xl" },
};

export default function Logo({ size = "md", animated = false, className = "" }: LogoProps) {
  const { width, height } = sizes[size];

  const logoVariants = {
    initial: { rotateY: -180, opacity: 0 },
    animate: {
      rotateY: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const LogoSVG = () => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="#0a0a0a" stroke="#c87941" strokeWidth="2" />

      {/* Inner glow */}
      <defs>
        <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c87941" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#c87941" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4945c" />
          <stop offset="50%" stopColor="#c87941" />
          <stop offset="100%" stopColor="#a86535" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="40" fill="url(#innerGlow)" />

      {/* H letter stylized */}
      <path
        d="M30 25 L30 75 M30 50 L50 50 M50 25 L50 75"
        stroke="url(#goldGradient)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Dot */}
      <circle cx="70" cy="65" r="6" fill="#c87941" />

      {/* Decorative arc */}
      <path
        d="M55 30 Q75 50 55 70"
        stroke="#c87941"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );

  if (animated) {
    return (
      <div className="relative">
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gold/20 blur-xl"
          variants={glowVariants}
          animate="animate"
        />
        <motion.div
          variants={logoVariants}
          initial="initial"
          animate="animate"
          style={{ perspective: 1000 }}
        >
          <LogoSVG />
        </motion.div>
      </div>
    );
  }

  return <LogoSVG />;
}
