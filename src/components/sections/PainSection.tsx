"use client";

import { Clock, DollarSign, Bot } from "lucide-react";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";

const iconMap = { Clock, DollarSign, Bot } as const;

export default function PainSection() {
  const { t } = useLanguage();
  const home = t("home");

  return (
    <section className="section bg-void" id="pain">
      <div className="container-custom">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 tracking-wide leading-none text-cream">
            {home.painHeadline}
          </h2>
          <p className="text-cream/70 text-base leading-relaxed mb-12 max-w-2xl">
            {home.painSub}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {home.painPoints.map((point, i) => {
            const Icon = iconMap[point.icon as keyof typeof iconMap];
            return (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-void border border-gold/20 p-8 h-full group transition-all duration-300 hover:border-gold">
                  {Icon && (
                    <div className="w-10 h-10 flex items-center justify-center border border-gold/20 mb-5 group-hover:border-gold transition-colors">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                  )}
                  <h3 className="font-body text-lg font-bold text-cream mb-2">{point.title}</h3>
                  <p className="text-cream/60 text-sm leading-relaxed">{point.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
