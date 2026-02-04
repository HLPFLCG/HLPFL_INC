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

// Floating animation (continuous)
export function FloatingElement({ children, className = "" }: AnimatedProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Pulse animation
export function PulseElement({ children, className = "" }: AnimatedProps) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
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

// Bounce on click
export function BounceClick({ children, className = "" }: AnimatedProps) {
  return (
    <motion.div
      className={className}
      whileTap={{
        scale: [1, 0.9, 1.1, 1],
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </motion.div>
  );
}

// Rotate on hover
export function RotateHover({ children, className = "" }: AnimatedProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

// Slide up reveal on hover (for cards)
export function SlideRevealHover({
  children,
  overlay,
  className = ""
}: AnimatedProps & { overlay: ReactNode }) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover="hover"
      initial="initial"
    >
      {children}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-gold/90 via-gold/50 to-transparent flex items-end p-4"
        variants={{
          initial: { y: "100%" },
          hover: { y: 0 },
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {overlay}
      </motion.div>
    </motion.div>
  );
}

// Stagger children on mount
export function StaggerChildren({ children, className = "" }: AnimatedProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: AnimatedProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Typewriter effect
export function TypewriterText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.03,
            delay: delay + index * 0.03,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Counter animation
export function AnimatedCounter({
  value,
  className = "",
  duration = 2,
}: {
  value: number;
  className?: string;
  duration?: number;
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration }}
      >
        {value.toLocaleString()}
      </motion.span>
    </motion.span>
  );
}
