"use client";

import Link from "next/link";
import { Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal } from "@/components/ui";

export default function TestimonialsPageClient() {
  const { t, lang } = useLanguage();
  const testimonialsT = t("testimonials");
  const global = t("global");

  return (
    <div className="pt-24 min-h-screen bg-cream">
      {/* Hero */}
      <section className="section pb-12 bg-jungle">
        <div className="container-custom">
          <ScrollReveal>
            <h1 className="font-display text-5xl md:text-7xl tracking-wide leading-none mb-4 text-sand">
              {testimonialsT.headline}
            </h1>
            <p className="text-sand/70 text-base md:text-lg leading-relaxed max-w-2xl">
              {testimonialsT.sub}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialsT.items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex flex-col h-full rounded-2xl border border-sea/15 bg-mist p-8 shadow-card">
                  <Quote size={24} className="text-gold/40 mb-4 flex-shrink-0" />
                  <blockquote className="text-night text-sm leading-relaxed mb-6 flex-1 italic">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <div className="border-t border-sea/10 pt-4">
                    <p className="font-bold text-night text-sm">{item.name}</p>
                    <p className="text-fog text-xs">{item.business}</p>
                    <p className="text-wave text-xs font-semibold mt-1">
                      {item.service}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-sand">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-4 text-night">
              {lang === "es"
                ? "¿Listo para ser el próximo?"
                : "Ready to be next?"}
            </h2>
            <p className="text-fog mb-8 max-w-xl mx-auto">
              {lang === "es"
                ? "Comienza con un sitio de $49 o elige un paquete."
                : "Start with a $49 site or pick a package."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact/" className="btn-primary">
                {global.contactUs}
              </Link>
              <Link href="/services/" className="btn-ghost">
                {lang === "es" ? "Ver Servicios" : "View Services"}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
