"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const home = t("home");

  const scrollToApply = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void to-void-light" />

      {/* Radial gold glow */}
      <div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,121,65,0.04) 0%, transparent 70%)" }}
      />

      {/* Caribbean turquoise glow accent */}
      <div
        className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,154,167,0.03) 0%, transparent 70%)" }}
      />

      {/* Animated gold accent lines */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Diagonal lines */}
      <div
        className="absolute top-0 right-0 w-[400px] h-full opacity-[0.025] pointer-events-none"
        style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 40px, #fff 40px, #fff 41px)" }}
      />

      {/* Content */}
      <div className="relative container-custom text-center px-4 pt-20 pb-16">
        <ScrollReveal>
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-6 block">
            Cahuita · Puerto Viejo · Manzanillo
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide leading-none mb-4">
            {home.heroHeadline}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide leading-none mb-8">
            <span className="text-gradient">{home.heroChaos}</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            {home.heroSubhead}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={scrollToApply} className="btn-primary">
              {home.heroCta1}
            </button>
            <a href="#services" className="btn-ghost">
              {home.heroCta2}
            </a>
          </div>
        </ScrollReveal>

        {/* Scroll indicator */}
        <ScrollReveal delay={0.6}>
          <motion.div
            className="mt-16 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold/40" />
            <span className="text-gold/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
