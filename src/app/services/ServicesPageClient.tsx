"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";
import { services } from "@/lib/data";

const beforeAfters = [
  {
    service: "Custom E-Commerce / Online Booking",
    before: "Taking reservations via WhatsApp at midnight. Guests lose the thread and never follow up.",
    after: "Clean booking page where guests reserve and pay in any currency, any time zone — while you sleep.",
  },
  {
    service: "Digital Marketing",
    before: "Posting to Instagram occasionally. No strategy. Followers but no bookings.",
    after: "Targeted campaigns reaching travelers actively planning their Caribbean coast trip. Real inquiries, not just likes.",
  },
  {
    service: "Systems, Processes & Logistics",
    before: "Every check-in is different. Housekeeping is ad hoc. You can't leave the property.",
    after: "Documented SOPs that run the same whether you're on-site or back in the city. Five-star consistency.",
  },
];

export default function ServicesPageClient() {
  const { t, lang } = useLanguage();
  const pageT = t("services");

  return (
    <div className="pt-24 min-h-screen bg-cream">
      {/* Hero */}
      <section className="section pb-12 bg-jungle">
        <div className="container-custom">
          <ScrollReveal>
            <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">What We Build</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide leading-none mb-6 text-sand">
              {pageT.pageTitle}
            </h1>
            <p className="text-sand/70 text-base md:text-lg leading-relaxed max-w-2xl">
              {pageT.pageSubtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              const title = lang === "es" ? service.titleEs : service.title;
              const description = lang === "es" ? service.descriptionEs : service.description;
              const tags = lang === "es" ? service.tagsEs : service.tags;

              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-mist border border-sea/15 p-8 h-full group transition-all duration-300 hover:border-sea/40 hover:-translate-y-1 flex flex-col">
                    <div className="w-10 h-10 flex items-center justify-center border border-gold/20 mb-6 group-hover:border-gold/50 transition-colors">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div className="text-gold text-xs tracking-[0.2em] uppercase mb-2">0{i + 1}</div>
                    <h2 className="font-display text-2xl md:text-3xl text-night tracking-wide mb-4">{title}</h2>
                    <p className="text-fog text-sm leading-relaxed mb-6 flex-1">{description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tags.map((tag, j) => (
                        <span key={j} className="text-[11px] text-gold/70 border border-gold/15 px-2 py-0.5 tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href="/contact" className="text-sea text-sm tracking-wider hover:text-canopy transition-colors">
                      Learn More / Get Started →
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Before vs After */}
      <section className="section bg-sand">
        <div className="container-custom">
          <ScrollReveal>
            <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block text-center">Transformation</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-center mb-16 tracking-wide leading-none text-night">
              Before vs. <span className="text-gradient">After</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-8">
            {beforeAfters.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-mist border border-sea/15 p-8">
                  <h3 className="font-display text-xl text-gold tracking-wide mb-6">{item.service}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <span className="text-red-400/70 text-xs tracking-[0.2em] uppercase mb-2 block">Before</span>
                      <p className="text-fog text-sm leading-relaxed">{item.before}</p>
                    </div>
                    <div>
                      <span className="text-wave text-xs tracking-[0.2em] uppercase mb-2 block">After</span>
                      <p className="text-night text-sm leading-relaxed">{item.after}</p>
                    </div>
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
              {pageT.ctaTitle}
            </h2>
            <p className="text-fog mb-8 max-w-xl mx-auto">{pageT.ctaDesc}</p>
            <Link href="/contact" className="btn-primary">{pageT.ctaButton}</Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
