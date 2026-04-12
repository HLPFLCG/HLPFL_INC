"use client";

import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ResultsSection() {
  const { t } = useLanguage();
  const home = t("home");

  return (
    <section className="section" id="results">
      <div className="container-custom">
        <ScrollReveal>
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block text-center">
            {home.resultsOverline}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-center mb-16 tracking-wide leading-none">
            {home.resultsTitle}{" "}
            <span className="text-gradient">{home.resultsTitleAccent}</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {home.resultsMetrics.map((metric, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="bg-void-light border border-void-lighter p-8 text-center group transition-all duration-300 hover:border-gold/25">
                <div className="font-display text-3xl md:text-4xl text-gold tracking-wide mb-3">
                  {metric.stat}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {metric.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
