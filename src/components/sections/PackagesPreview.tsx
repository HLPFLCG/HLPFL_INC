"use client";

import Link from "next/link";
import { ScrollReveal, PackageCard } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";
import { packages } from "@/lib/data";

export default function PackagesPreview() {
  const { t, lang } = useLanguage();
  const home = t("home");

  return (
    <section className="section bg-sand" id="packages">
      <div className="container-custom">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 tracking-wide leading-none text-night">
            {home.packagesHeadline}
          </h2>
          <p className="text-fog text-base leading-relaxed mb-16 max-w-2xl">
            {home.packagesSub}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <ScrollReveal key={pkg.id} delay={i * 0.08}>
              <PackageCard pkg={pkg} lang={lang} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12">
            <Link href="/packages" className="text-sea font-semibold text-sm tracking-wider hover:text-wave transition-colors">
              {home.packagesViewAll}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
