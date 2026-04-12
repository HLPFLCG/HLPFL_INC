"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPageClient() {
  const { t } = useLanguage();
  const about = t("about");

  return (
    <div className="pt-24 min-h-screen bg-cream">
      {/* Hero */}
      <section className="section pb-12 bg-jungle">
        <div className="container-custom">
          <ScrollReveal>
            <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">About</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide leading-none mb-6 text-sand">
              {about.pageTitle}
            </h1>
            <p className="text-sand/70 text-base md:text-lg leading-relaxed max-w-2xl">
              {about.pageSubtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-sand">
        <div className="max-w-[800px] mx-auto px-4">
          <ScrollReveal>
            <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">{about.storyTitle}</span>
            <p className="text-night text-base md:text-lg leading-relaxed">{about.storyDesc}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission */}
      <section className="section bg-cream">
        <div className="max-w-[800px] mx-auto px-4">
          <ScrollReveal>
            <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">{about.missionTitle}</span>
            <p className="text-night text-base md:text-lg leading-relaxed">{about.missionDesc}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-mist">
        <div className="max-w-[900px] mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-16 text-night">{about.valuesTitle}</h2>
          </ScrollReveal>
          {about.values.map((v, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className={`flex gap-6 items-start py-7 ${i < about.values.length - 1 ? "border-b border-sea/15" : ""}`}>
                <div className="font-display text-xl text-gold min-w-[32px]">0{i + 1}</div>
                <div>
                  <h3 className="text-night text-lg font-bold mb-2">{v.title}</h3>
                  <p className="text-fog text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-cream">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-4 text-night">
              Ready to Talk?
            </h2>
            <p className="text-fog mb-8 max-w-xl mx-auto">
              Tell us about your operation. No pitch, no pressure — just a conversation about where you are and where you want to be.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">Get in Touch</Link>
              <Link href="/services" className="btn-ghost">View Services</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
