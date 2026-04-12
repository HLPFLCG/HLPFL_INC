"use client";

import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();
  const home = t("home");

  return (
    <section className="section bg-void-light" id="about">
      <div className="max-w-[1000px] mx-auto px-4">
        <ScrollReveal>
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">{home.aboutOverline}</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 tracking-wide leading-none">
            {home.aboutTitle}{" "}
            <span className="text-gradient">{home.aboutTitleAccent}</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-16 max-w-2xl">{home.aboutDesc}</p>
        </ScrollReveal>

        {home.aboutReasons.map((r, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className={`flex gap-6 items-start py-7 ${i < home.aboutReasons.length - 1 ? "border-b border-void-lighter" : ""}`}>
              <div className="font-display text-xl text-gold min-w-[32px]">0{i + 1}</div>
              <div>
                <h3 className="text-white text-lg font-bold mb-2">{r.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
