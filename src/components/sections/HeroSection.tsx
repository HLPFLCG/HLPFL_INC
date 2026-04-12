"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const home = t("home");

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background gradient simulating rainforest-meets-sea */}
      <div
        className="absolute inset-0 hero-gradient"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(135deg, #1B4332 0%, #0E9AA7 50%, #E07A5F 100%)",
        }}
      />

      {/* Tropical canopy pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 80%, #2D6A4F 0%, transparent 50%), radial-gradient(circle at 80% 20%, #0E9AA7 0%, transparent 40%), radial-gradient(circle at 50% 50%, #1B4332 0%, transparent 70%)",
        }}
      />

      {/* Placeholder image area with descriptive alt */}
      <div
        className="absolute inset-0 opacity-30"
        role="img"
        aria-label="Lush rainforest canopy meeting white-sand beach on the Caribbean coast of Costa Rica near Cahuita National Park"
        style={{
          background:
            "linear-gradient(to bottom, rgba(27,67,50,0.6) 0%, rgba(14,154,167,0.3) 40%, rgba(245,230,200,0.2) 100%)",
        }}
      />

      <div className="relative container-custom text-center text-white py-24">
        <p className="text-turquoise-light text-sm font-semibold tracking-widest uppercase mb-4">
          Limón Province, Costa Rica
        </p>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
          {home.heroHeadline}
        </h1>

        <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {home.heroSubhead}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/plan"
            className="btn-primary text-base min-h-[44px] flex items-center justify-center px-8 py-3"
          >
            {home.heroCta1}
          </Link>
          <Link
            href="/explore"
            className="btn-outline-white text-base min-h-[44px] flex items-center justify-center px-8 py-3"
          >
            {home.heroCta2}
          </Link>
        </div>

        {/* Scroll cue */}
        <div className="mt-16 flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs tracking-widest uppercase">
            Cahuita · Puerto Viejo · Manzanillo
          </span>
          <div className="w-px h-10 bg-white/30" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
