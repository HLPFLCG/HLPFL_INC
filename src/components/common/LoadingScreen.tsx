"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem("hlpfl_loading_seen");
    if (hasSeenLoading) {
      setIsLoading(false);
      return;
    }

    const completeTimer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hlpfl_loading_seen", "true");
    }, 1200);

    return () => {
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-void flex items-center justify-center overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(200,121,65,0.15)_0%,_transparent_50%)]" />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative">
              <div
                className="absolute -inset-8 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(200,121,65,0.3) 0%, transparent 70%)",
                }}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Logo size="xl" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-8 font-display text-4xl tracking-wider"
            >
              HLPFL<span className="text-gold">.</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-4 text-gray-400 text-sm"
            >
              Empowering Creative Entrepreneurs
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
