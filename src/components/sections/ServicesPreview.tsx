"use client";

import Link from "next/link";
import { ScrollReveal, ServiceCard } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";
import { services } from "@/lib/data";

export default function ServicesPreview() {
  const { t, lang } = useLanguage();
  const home = t("home");

  const featured = services.filter((s) => s.featured).slice(0, 6);

  return (
    <section className="section bg-cream" id="services">
      <div className="container-custom">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 tracking-wide leading-none text-night">
            {home.servicesHeadline}
          </h2>
          <p className="text-fog text-base leading-relaxed mb-16 max-w-2xl">
            {home.servicesSub}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.06}>
              <ServiceCard service={service} useAI={false} lang={lang} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12">
            <Link href="/services" className="text-sea font-semibold text-sm tracking-wider hover:text-wave transition-colors">
              {home.servicesViewAll}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
