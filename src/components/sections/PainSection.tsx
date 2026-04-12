"use client";

import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PainSection() {
  const { t } = useLanguage();
  const home = t("home");

  return (
    <section className="section bg-jungle" id="pain">
      <div className="max-w-[900px] mx-auto px-4">
        <ScrollReveal>
          <span className="text-wave uppercase tracking-[0.25em] text-xs mb-4 block">
            {home.painOverline}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-12 tracking-wide leading-none text-sand">
            {home.painTitle}{" "}
            <span className="text-gradient">{home.painTitleAccent}</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-4">
          {home.painPoints.map((point, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="flex items-start gap-4 py-3 border-b border-sea/20">
                <span className="text-gold text-lg leading-none mt-0.5">—</span>
                <p className="text-sand text-sm md:text-base leading-relaxed">
                  {point}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
