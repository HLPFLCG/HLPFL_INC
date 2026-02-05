"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const loadingMessages = [
  "Preparing your experience...",
  "Loading creative tools...",
  "Connecting communities...",
  "Empowering entrepreneurs...",
  "Building something special...",
];

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem("hlpfl_loading_seen");
    if (hasSeenLoading) {
      setIsLoading(false);
      return;
    }

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    // Message rotation
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 600);

    // Complete loading
    const completeTimer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hlpfl_loading_seen", "true");
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-void flex items-center justify-center overflow-hidden"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0">
            {/* Radial gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(200,121,65,0.15)_0%,_transparent_50%)]" />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(#c87941 1px, transparent 1px), linear-gradient(90deg, #c87941 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-gold/40"
                initial={{
                  x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
                  scale: 0,
                }}
                animate={{
                  y: [null, -100],
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Scanning line */}
            <motion.div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Glowing orbs behind logo */}
            <div className="relative">
              <motion.div
                className="absolute -inset-8 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(200,121,65,0.3) 0%, transparent 70%)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -inset-16 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(200,121,65,0.15) 0%, transparent 70%)",
                }}
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Logo with entrance animation */}
              <motion.div
                initial={{ rotateY: -180, opacity: 0, scale: 0.5 }}
                animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ perspective: 1000 }}
              >
                <Logo size="xl" />
              </motion.div>
            </div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 font-display text-4xl tracking-wider"
            >
              HLPFL<span className="text-gold">.</span>
            </motion.div>

            {/* Loading message */}
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 text-gray-400 text-sm h-5"
            >
              {loadingMessages[messageIndex]}
            </motion.div>

            {/* Progress bar */}
            <div className="mt-8 w-64 h-1 bg-void-lighter rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.min(Math.round(progress), 100)} aria-valuemin={0} aria-valuemax={100}>
              <motion.div
                className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </div>

            {/* Progress percentage */}
            <motion.div
              className="mt-2 text-gold text-xs font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-gold/20" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-gold/20" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-gold/20" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-gold/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
