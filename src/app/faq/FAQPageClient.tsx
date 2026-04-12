"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FAQPageClient() {
  const { t } = useLanguage();
  const faq = t("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="pt-24 min-h-screen">
      {/* Hero */}
      <section className="section pb-12">
        <div className="container-custom">
          <ScrollReveal>
            <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">FAQ</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide leading-none mb-6">
              {faq.pageTitle}
            </h1>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
              {faq.pageSubtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Accordion */}
      <section className="pb-20">
        <div className="max-w-[800px] mx-auto px-4">
          {faq.items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="border-b border-void-lighter">
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                  aria-expanded={openIndex === i}
                >
                  <span className="text-white text-sm md:text-base font-medium pr-4 group-hover:text-gold transition-colors">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i ? "max-h-96 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-void-light">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Reach out directly — we respond within 24 hours.
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
