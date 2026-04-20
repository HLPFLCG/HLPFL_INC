"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TrustBar() {
  const { t } = useLanguage();
  const home = t("home");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const items = home.trustBarItems;
  const ticker = [...items, ...items];

  return (
    <section className="bg-jungle border-y border-sea/15 py-4 overflow-hidden">
      <div className="flex items-center gap-4 px-4">
        <span className="text-sand/60 text-xs tracking-[0.15em] uppercase whitespace-nowrap flex-shrink-0">
          {home.trustBarLabel}
        </span>
        <div className="relative flex-1 overflow-hidden">
          <motion.div
            className="flex items-center gap-0 whitespace-nowrap"
            animate={reducedMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={reducedMotion ? undefined : { duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {ticker.map((item, i) => (
              <span key={i} className="flex items-center gap-4 text-gold text-sm tracking-wider">
                <span>{item}</span>
                <span className="text-wave/40 text-xs">·</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
