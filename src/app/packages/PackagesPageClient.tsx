"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { packages, retainers } from "@/lib/data";
import { PackageCard, RetainerCard, ScrollReveal } from "@/components/ui";

export default function PackagesPageClient() {
  const { t, lang } = useLanguage();
  const pkgT = t("packages");
  const retT = t("retainers");
  const global = t("global");

  return (
    <div className="pt-24 min-h-screen bg-cream">
      {/* Hero */}
      <section className="section pb-12 bg-jungle">
        <div className="container-custom">
          <ScrollReveal>
            <h1 className="font-display text-5xl md:text-7xl tracking-wide leading-none mb-4 text-sand">
              {pkgT.headline}
            </h1>
            <p className="text-sand/70 text-base md:text-lg leading-relaxed max-w-2xl">
              {pkgT.sub}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Packages grid */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map((pkg, i) => (
              <ScrollReveal key={pkg.id} delay={i * 0.08}>
                <PackageCard pkg={pkg} lang={lang} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <p className="text-center text-fog text-sm mt-8">
              {pkgT.customNote}{" "}
              <Link
                href="/contact/"
                className="text-sea hover:text-canopy font-semibold transition-colors"
              >
                {pkgT.customCTA}
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Retainers */}
      <section className="section bg-sand">
        <div className="container-custom">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-5xl tracking-wide mb-4 text-night text-center">
              {retT.headline}
            </h2>
            <p className="text-fog text-base md:text-lg leading-relaxed max-w-2xl mx-auto text-center mb-12">
              {retT.sub}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {retainers.map((retainer, i) => (
              <ScrollReveal key={retainer.id} delay={i * 0.08}>
                <RetainerCard retainer={retainer} lang={lang} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <p className="text-center text-fog text-sm mt-8">
              {retT.cancelAnytime}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-cream">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-4 text-night">
              {lang === "es" ? "¿Listo para comenzar?" : "Ready to get started?"}
            </h2>
            <p className="text-fog mb-8 max-w-xl mx-auto">
              {lang === "es"
                ? "Elige un paquete o arma el tuyo propio."
                : "Pick a package or build your own."}
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
