"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

// Magnetic hover effect - element follows cursor slightly
export function MagneticHover({ children, className = "" }: AnimatedProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}

// Glow on hover
export function GlowHover({ children, className = "" }: AnimatedProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        className="absolute -inset-1 rounded-lg bg-gold/0 blur-lg"
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 0.5, backgroundColor: "rgba(200, 121, 65, 0.3)" },
        }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

// Tilt on hover (3D effect)
export function TiltHover({ children, className = "" }: AnimatedProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        rotateX: -5,
        rotateY: 5,
        scale: 1.02,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

// Shimmer text effect
export function ShimmerText({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/30 to-transparent z-20"
        animate={{ x: ["-100%", "200%"] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 3,
        }}
        style={{ WebkitBackgroundClip: "text" }}
      />
    </span>
  );
}
