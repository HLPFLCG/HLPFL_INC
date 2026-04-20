"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal } from "@/components/ui";

export default function PrivacyPageClient() {
  const { t } = useLanguage();
  const privacy = t("privacy");

  return (
    <div className="pt-24 min-h-screen bg-void">
      <section className="section">
        <div className="max-w-[800px] mx-auto px-4">
          <ScrollReveal>
            <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">
              Legal
            </span>
            <h1 className="font-display text-5xl md:text-7xl tracking-wide leading-none mb-4 text-white">
              {privacy.headline}
            </h1>
            <p className="text-gray-400 text-sm mb-12">{privacy.lastUpdated}</p>
          </ScrollReveal>

          <div className="space-y-8">
            {privacy.content.map((section, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div>
                  <h2 className="font-display text-2xl text-white tracking-wide mb-3">
                    {section.heading}
                  </h2>
                  <p className="text-gray-500 text-base leading-relaxed">
                    {section.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
