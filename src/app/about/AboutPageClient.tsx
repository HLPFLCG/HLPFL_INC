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
    <div className="pt-24 min-h-screen bg-void">
      {/* Hero */}
      <section className="section pb-12 bg-void">
        <div className="container-custom">
          <ScrollReveal>
            <h1 className="font-display text-5xl md:text-7xl tracking-wide leading-none mb-4 text-cream">
              {about.headline}
            </h1>
            <p className="text-cream/70 text-base md:text-lg leading-relaxed max-w-2xl">
              {about.sub}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-void-light">
        <div className="max-w-[800px] mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8 text-white">
              {about.storyHeadline}
            </h2>
          </ScrollReveal>
          {about.story.map((paragraph, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                {paragraph}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section bg-void-lighter">
        <div className="container-custom">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-12 text-white text-center">
              {about.valuesHeadline}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {about.values.map((value, i) => {
              const Icon = iconMap[value.icon];
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-void rounded-2xl border border-gold/15 p-6 h-full">
                    {Icon && (
                      <div className="w-10 h-10 rounded-lg bg-turquoise/10 flex items-center justify-center mb-4">
                        <Icon size={20} className="text-turquoise" />
                      </div>
                    )}
                    <h3 className="font-body text-lg font-bold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
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
      <section className="section bg-void">
        <div className="max-w-[800px] mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8 text-white">
              {about.toolsHeadline}
            </h2>
          </ScrollReveal>
          <ul className="space-y-3">
            {about.tools.map((tool, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <li className="flex items-center gap-3 text-gray-500 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  {tool}
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-void">
        <div className="max-w-[800px] mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-8 text-cream">
              {about.missionHeadline}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="mb-8">
              <p className="text-gold text-xs uppercase tracking-[0.2em] mb-2">
                {lang === "es" ? "Misión" : "Mission"}
              </p>
              <p className="text-cream text-lg leading-relaxed">
                {about.mission}
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div>
              <p className="text-gold text-xs uppercase tracking-[0.2em] mb-2">
                {lang === "es" ? "Visión" : "Vision"}
              </p>
              <p className="text-cream text-lg leading-relaxed">
                {about.vision}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Founder block */}
      <section className="section bg-void-light" id="founder">
        <div className="max-w-[800px] mx-auto px-4">
          <ScrollReveal>
            <span className="text-gold text-xs uppercase tracking-[0.2em] mb-6 block">
              {lang === "es" ? "El Fundador" : "The Founder"}
            </span>
            <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-10 text-white">
              {about.founderHeadline}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              {/* Photo placeholder */}
              <div className="shrink-0">
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-void border-2 border-gold/30 flex items-center justify-center overflow-hidden">
                  {/* Replace src with real photo when available */}
                  <span className="text-gold/40 text-5xl font-display tracking-wider select-none">H</span>
                </div>
                <div className="mt-4 text-center">
                  <p className="font-display text-2xl text-gold tracking-wider">{about.founderYears}</p>
                  <p className="text-white/40 text-xs uppercase tracking-wider mt-0.5">{about.founderYearsLabel}</p>
                </div>
              </div>

              {/* Bio + LinkedIn */}
              <div className="flex-1">
                <p className="text-gray-400 text-base leading-relaxed mb-6">
                  {about.founderBio}
                </p>
                <a
                  href="https://www.linkedin.com/company/hlpfl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors font-medium"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  {about.founderLinkedIn}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-void">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-4 text-white">
              {lang === "es" ? "¿Listo para hablar?" : "Ready to talk?"}
            </h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">
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
