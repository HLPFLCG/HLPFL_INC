"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";
import { services } from "@/lib/data";

export default function ServicesPageClient() {
  const { t, lang } = useLanguage();
  const pageT = t("services");

  return (
    <div className="pt-24 min-h-screen">
      {/* Hero */}
      <section className="section pb-12">
        <div className="container-custom">
          <ScrollReveal>
            <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">What We Build</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide leading-none mb-6">
              {pageT.pageTitle}
            </h1>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
              {pageT.pageSubtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              const title = lang === "es" ? service.titleEs : service.title;
              const description = lang === "es" ? service.descriptionEs : service.description;
              const tags = lang === "es" ? service.tagsEs : service.tags;

              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-void-light border border-void-lighter p-8 h-full group transition-all duration-300 hover:border-gold/25 hover:-translate-y-1">
                    <div className="w-10 h-10 flex items-center justify-center border border-gold/20 mb-6 group-hover:border-gold/50 transition-colors">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div className="text-gold text-xs tracking-[0.2em] uppercase mb-2">0{i + 1}</div>
                    <h2 className="font-display text-2xl md:text-3xl text-white tracking-wide mb-4">{title}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{description}</p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, j) => (
                        <span key={j} className="text-[11px] text-gold/70 border border-gold/15 px-2 py-0.5 tracking-wider">
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

      {/* CTA */}
      <section className="section bg-void-light">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-4">
              {pageT.ctaTitle}
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">{pageT.ctaDesc}</p>
            <Link href="/contact" className="btn-primary">{pageT.ctaButton}</Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
