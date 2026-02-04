"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  className?: string;
}

const sizes = {
  sm: { width: 24, height: 36 },
  md: { width: 36, height: 54 },
  lg: { width: 48, height: 72 },
  xl: { width: 72, height: 108 },
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

  const LogoImage = () => (
    <Image
      src="/logo.svg"
      alt="HLPFL INC"
      width={width}
      height={height}
      className={className}
      priority
    />
  );

  if (animated) {
    return (
      <div className="relative">
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
          <LogoImage />
        </motion.div>
      </div>
    );
  }

  return <LogoImage />;
}
