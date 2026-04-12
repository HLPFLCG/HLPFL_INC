"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem("caribesur_loading_seen");
    if (hasSeenLoading) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("caribesur_loading_seen", "true");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "#1B4332" }}
          aria-label="Loading Caribe Sur CR"
          aria-live="polite"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl font-bold text-sandy"
            >
              Caribe Sur{" "}
              <span style={{ color: "#0E9AA7" }}>CR</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/60 text-sm"
            >
              Caribbean Coast of Costa Rica
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
