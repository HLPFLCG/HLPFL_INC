"use client";

import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CompetitorSection() {
  const { t } = useLanguage();
  const home = t("home");

  return (
    <section className="section bg-mist" id="why-hlpfl">
      <div className="container-custom">
        <ScrollReveal>
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block text-center">
            {home.competitorOverline}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-center mb-16 tracking-wide leading-none text-night">
            {home.competitorTitle}{" "}
            <span className="text-gradient">{home.competitorTitleAccent}</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {home.competitorItems.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-cream border border-sea/15 p-8 h-full">
                <div className="text-wave text-xs tracking-[0.2em] uppercase mb-3">
                  {item.vs}
                </div>
                <p className="text-fog text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
