"use client";

import { Hand, Zap, Tag } from "lucide-react";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";

const iconMap = { Hand, Zap, Tag } as const;

export default function WhyHLPFL() {
  const { t } = useLanguage();
  const home = t("home");

  return (
    <section className="section bg-void-lighter" id="why-hlpfl">
      <div className="container-custom">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-center mb-16 tracking-wide leading-none text-white">
            {home.whyHeadline}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {home.whyPoints.map((point, i) => {
            const Icon = iconMap[point.icon as keyof typeof iconMap];
            return (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-void border border-gold/15 p-8 h-full text-center group transition-all duration-300 hover:border-gold hover:-translate-y-[1px]">
                  {Icon && (
                    <div className="w-12 h-12 mx-auto flex items-center justify-center border border-gold/15 mb-5 group-hover:border-gold transition-colors">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                  )}
                  <h3 className="font-body text-lg font-bold text-white mb-3">{point.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{point.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
