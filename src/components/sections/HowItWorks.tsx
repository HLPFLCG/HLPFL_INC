"use client";

import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HowItWorks() {
  const { t } = useLanguage();
  const home = t("home");

  const STEPS = [
    { num: home.howStep1Num, title: home.howStep1Title, price: home.howStep1Price, desc: home.howStep1Desc },
    { num: home.howStep2Num, title: home.howStep2Title, price: home.howStep2Price, desc: home.howStep2Desc },
    { num: home.howStep3Num, title: home.howStep3Title, price: home.howStep3Price, desc: home.howStep3Desc },
  ];

  return (
    <section id="how-it-works" className="section bg-cream">
      <div className="container-custom">
        <ScrollReveal>
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">The Process</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-16 tracking-wide leading-none text-night">
            {home.howTitle}
            <br />
            <span className="text-gradient">{home.howTitleAccent}</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="relative bg-mist border border-sea/15 p-10 h-full group transition-all duration-300 hover:border-sea hover:-translate-y-[1px] overflow-hidden">
                <div className="absolute top-3 right-4 font-display text-7xl text-gold/[0.06] leading-none select-none">
                  {s.num}
                </div>
                <div className="text-gold text-xs tracking-[0.2em] uppercase mb-2">{s.price}</div>
                <h3 className="font-display text-3xl text-jungle tracking-wide mb-4">{s.title}</h3>
                <p className="text-fog text-sm leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
