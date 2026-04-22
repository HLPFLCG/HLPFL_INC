"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { services, categoryLabels, type ServiceCategory, getServicePrice, getStripeLink } from "@/lib/data";
import { ScrollReveal, ServiceCard } from "@/components/ui";

type FilterCategory = ServiceCategory | "all";

export default function ServicesPageClient() {
  const { t, lang } = useLanguage();
  const pageT = t("services");
  const global = t("global");

  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");

  const filtered = services.filter(
    (s) => activeCategory === "all" || s.category === activeCategory
  );

  const categories = Object.keys(categoryLabels) as ServiceCategory[];

  return (
    <div className="pt-24 min-h-screen bg-void">
      {/* Hero */}
      <section className="section pb-12 bg-void">
        <div className="container-custom">
          <ScrollReveal>
            <h1 className="font-display text-5xl md:text-7xl tracking-wide leading-none mb-4 text-cream">
              {pageT.headline}
            </h1>
            <p className="text-cream/70 text-base md:text-lg leading-relaxed max-w-2xl">
              {pageT.sub}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Category filter tabs */}
      <section className="pt-8 pb-4">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 text-sm font-semibold rounded-full border transition-all duration-200 ${
                activeCategory === "all"
                  ? "bg-gold text-white border-gold"
                  : "border-gold/20 text-gray-500 hover:border-gold/40"
              }`}
            >
              {pageT.filterAll}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-semibold rounded-full border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-gold text-white border-gold"
                    : "border-gold/20 text-gray-500 hover:border-gold/40"
                }`}
              >
                {lang === "es" ? categoryLabels[cat].es : categoryLabels[cat].en}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service grid */}
      <section className="pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service, i) => (
              <ScrollReveal key={service.id} delay={i * 0.04}>
                <ServiceCard service={service} useAI={false} lang={lang} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-void-light">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-4 text-white">
              {lang === "es" ? "¿No ves lo que necesitas?" : "Don't see what you need?"}
            </h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">
              {lang === "es"
                ? "Cotización personalizada en 24 horas."
                : "Custom quote within 24 hours."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact/" className="btn-primary">{global.contactUs}</Link>
              <Link href="/packages/" className="btn-ghost">
                {lang === "es" ? "Ver Paquetes" : "View Packages"}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
