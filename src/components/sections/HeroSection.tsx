"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const home = t("home");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "linear-gradient(155deg, #1A3728 0%, #2D6A4F 100%)" }}
      />

      {/* Subtle sea tint glow */}
      <div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(11,122,122,0.06) 0%, transparent 70%)" }}
      />

      {/* Animated accent lines */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-0 w-full h-px"
          style={{ backgroundImage: "linear-gradient(to right, transparent, rgba(201,148,26,0.3), transparent)" }}
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-3/4 left-0 w-full h-px"
          style={{ backgroundImage: "linear-gradient(to right, transparent, rgba(201,148,26,0.2), transparent)" }}
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Diagonal lines */}
      <div
        className="absolute top-0 right-0 w-[400px] h-full opacity-[0.025] pointer-events-none"
        style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 40px, #F2E4C0 40px, #F2E4C0 41px)" }}
      />

      {/* Content */}
      <div className="relative container-custom text-center px-4 pt-20 pb-16">
        <ScrollReveal>
          <span className="eyebrow text-wave mb-6 block">
            {home.heroEyebrow}
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide leading-none mb-8 text-sand">
            {home.heroHeadline.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                <span className={i > 0 ? "text-gold" : ""}>{line}</span>
              </span>
            ))}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: "rgba(242,228,192,0.80)" }}>
            {home.heroSub}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Link href="/services#website" className="btn-primary">
              {home.heroCTA}
            </Link>
            <Link href="/packages" className="btn-ghost">
              {home.heroSecondaryCTA}
            </Link>
          </div>
        </ScrollReveal>

        {/* Price card */}
        <ScrollReveal delay={0.4}>
          <div className="inline-flex flex-col items-center bg-jungle/60 border border-sea/20 rounded-lg px-8 py-5 backdrop-blur-sm">
            <span className="text-sand/60 text-xs tracking-[0.15em] uppercase mb-1">
              {home.heroPriceFrom}
            </span>
            <span className="font-display text-5xl text-gold tracking-wide">$49</span>
            <span className="text-sand/50 text-xs mt-1">{home.heroPriceNote}</span>
          </div>
        </ScrollReveal>

        {/* Scroll indicator */}
        <ScrollReveal delay={0.6}>
          <motion.div
            className="mt-16 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-wave/40" />
            <span className="text-wave/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
