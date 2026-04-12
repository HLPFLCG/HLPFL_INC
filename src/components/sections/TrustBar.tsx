"use client";

import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TrustBar() {
  const { t } = useLanguage();
  const home = t("home");

  const TRUST = [
    { stat: home.trustStat1, label: home.trustLabel1, sub: home.trustSub1 },
    { stat: home.trustStat2, label: home.trustLabel2, sub: home.trustSub2 },
    { stat: home.trustStat3, label: home.trustLabel3, sub: home.trustSub3 },
    { stat: home.trustStat4, label: home.trustLabel4, sub: home.trustSub4 },
  ];

  return (
    <section className="border-y border-void-lighter py-12 px-4">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {TRUST.map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl text-gold tracking-wide">{item.stat}</div>
              <div className="text-white text-xs tracking-[0.15em] uppercase mt-1 mb-0.5">{item.label}</div>
              <div className="text-gray-500 text-[11px] tracking-wider">{item.sub}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
