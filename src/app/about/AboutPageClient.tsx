"use client";

import Link from "next/link";
import {
  ShieldOff,
  Lock,
  Key,
  FileX,
  Clock,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";

const iconMap: Record<string, LucideIcon> = {
  ShieldOff,
  Lock,
  Key,
  FileX,
  Clock,
  Users,
};

export default function AboutPageClient() {
  const { t, lang } = useLanguage();
  const about = t("about");
  const global = t("global");

  return (
    <div className="pt-24 min-h-screen bg-cream">
      {/* Hero */}
      <section className="section pb-12 bg-jungle">
        <div className="container-custom">
          <ScrollReveal>
            <h1 className="font-display text-5xl md:text-7xl tracking-wide leading-none mb-4 text-sand">
              {about.headline}
            </h1>
            <p className="text-sand/70 text-base md:text-lg leading-relaxed max-w-2xl">
              {about.sub}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-sand">
        <div className="max-w-[800px] mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8 text-night">
              {about.storyHeadline}
            </h2>
          </ScrollReveal>
          {about.story.map((paragraph, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <p className="text-fog text-base leading-relaxed mb-6">
                {paragraph}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section bg-mist">
        <div className="container-custom">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-12 text-night text-center">
              {about.valuesHeadline}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {about.values.map((value, i) => {
              const Icon = iconMap[value.icon];
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-cream rounded-2xl border border-sea/15 p-6 h-full">
                    {Icon && (
                      <div className="w-10 h-10 rounded-lg bg-sea/10 flex items-center justify-center mb-4">
                        <Icon size={20} className="text-sea" />
                      </div>
                    )}
                    <h3 className="font-body text-lg font-bold text-night mb-2">
                      {value.title}
                    </h3>
                    <p className="text-fog text-sm leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools / Stack */}
      <section className="section bg-cream">
        <div className="max-w-[800px] mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8 text-night">
              {about.toolsHeadline}
            </h2>
          </ScrollReveal>
          <ul className="space-y-3">
            {about.tools.map((tool, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <li className="flex items-center gap-3 text-fog text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-wave flex-shrink-0" />
                  {tool}
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-jungle">
        <div className="max-w-[800px] mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8 text-sand">
              {about.missionHeadline}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="mb-8">
              <p className="text-gold text-xs uppercase tracking-[0.2em] mb-2">
                {lang === "es" ? "Misión" : "Mission"}
              </p>
              <p className="text-sand text-lg leading-relaxed">
                {about.mission}
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div>
              <p className="text-gold text-xs uppercase tracking-[0.2em] mb-2">
                {lang === "es" ? "Visión" : "Vision"}
              </p>
              <p className="text-sand text-lg leading-relaxed">
                {about.vision}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-cream">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-4 text-night">
              {lang === "es" ? "¿Listo para hablar?" : "Ready to talk?"}
            </h2>
            <p className="text-fog mb-8 max-w-xl mx-auto">
              {lang === "es"
                ? "Cuéntanos sobre tu negocio. Sin presión — solo una conversación."
                : "Tell us about your business. No pressure — just a conversation."}
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
