"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HomeCTA() {
  const { t } = useLanguage();
  const home = t("home");

  return (
    <section className="section bg-jungle" id="cta">
      <div className="max-w-[700px] mx-auto px-4 text-center">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 tracking-wide leading-none text-sand">
            {home.ctaHeadline}
          </h2>
          <p className="text-sand/70 text-base leading-relaxed mb-10">
            {home.ctaSub}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/services" className="btn-primary">
              {home.ctaButton}
            </Link>
            <Link href="/contact" className="text-wave text-sm font-semibold hover:text-sand transition-colors">
              {home.ctaSecondary}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
