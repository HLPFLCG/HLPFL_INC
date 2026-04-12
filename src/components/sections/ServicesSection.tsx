"use client";

import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";
import { services } from "@/lib/data";

export default function ServicesSection() {
  const { t, lang } = useLanguage();
  const home = t("home");

  return (
    <section className="section bg-cream" id="services">
      <div className="container-custom">
        <ScrollReveal>
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">What We Build</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 tracking-wide leading-none text-night">
            {home.servicesTitle}{" "}
            <span className="text-gradient">{home.servicesTitleAccent}</span>
          </h2>
          <p className="text-fog text-base leading-relaxed mb-16 max-w-2xl">
            {home.servicesSubtitle}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            const title = lang === "es" ? service.titleEs : service.title;
            const description = lang === "es" ? service.descriptionEs : service.description;
            const tags = lang === "es" ? service.tagsEs : service.tags;

            return (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="bg-mist border border-sea/15 shadow-card p-8 h-full group transition-all duration-300 hover:border-sea hover:-translate-y-[2px]">
                  <div className="w-10 h-10 flex items-center justify-center border border-sea/15 mb-6 group-hover:border-sea transition-colors">
                    <Icon className="w-5 h-5 text-sea" />
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-jungle tracking-wide mb-3">{title}</h3>
                  <p className="text-fog text-sm leading-relaxed mb-5">{description}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, j) => (
                      <span key={j} className="text-[11px] text-gold border border-gold/15 px-2 py-0.5 tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
