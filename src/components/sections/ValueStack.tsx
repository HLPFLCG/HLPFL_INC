"use client";

import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ValueStack() {
  const { t } = useLanguage();
  const home = t("home");

  return (
    <section id="value" className="section bg-void-light">
      <div className="max-w-[900px] mx-auto px-4">
        <ScrollReveal>
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">What We Deliver</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 tracking-wide leading-none">
            {home.valueTitle}{" "}
            <span className="text-gradient">{home.valueTitleAccent}</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-12 max-w-[700px]">
            {home.valueSubtitle}
          </p>
        </ScrollReveal>

        {home.valueItems.map((v, i) => (
          <ScrollReveal key={i} delay={i * 0.06}>
            <div className="flex justify-between items-center py-4 border-b border-void-lighter">
              <div className="flex items-center gap-3">
                <span className="text-gold text-sm">✓</span>
                <span className="text-gray-200 text-sm md:text-base">{v.service}</span>
              </div>
              <div className="flex items-center gap-5">
                <span className="text-turquoise text-xs tracking-wider hidden sm:inline">{v.market}</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
