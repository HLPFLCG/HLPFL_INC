"use client";

import { ScrollReveal } from "@/components/ui";

const SERVICES = [
  {
    icon: "◆",
    title: "Brand Development",
    desc: "Strategy, visual identity, and market positioning that turns your talent into a recognizable brand.",
    tags: ["Strategy", "Identity", "Positioning"],
  },
  {
    icon: "⬡",
    title: "Business Formation",
    desc: "LLC setup, EIN, registration, and compliance — your legal foundation, handled.",
    tags: ["Entity Setup", "Registration", "Compliance"],
  },
  {
    icon: "△",
    title: "Sales Representation",
    desc: "We sell for you. Outreach, negotiation, deal closing, pipeline management.",
    tags: ["Outreach", "Negotiation", "Pipeline"],
  },
  {
    icon: "○",
    title: "Marketing & PR",
    desc: "Go-to-market, content strategy, PR, and campaigns that reach the right people.",
    tags: ["Go-To-Market", "PR", "Campaigns"],
  },
  {
    icon: "□",
    title: "Web & Digital",
    desc: "Custom website, social setup, e-commerce — your entire digital presence, built.",
    tags: ["Website", "Social", "E-commerce"],
  },
  {
    icon: "⊕",
    title: "Contracts & Legal Templates",
    desc: "NDAs, service agreements, licensing — professional documents ready to sign.",
    tags: ["NDAs", "Agreements", "Licensing"],
  },
];

export default function ServicesSection() {
  return (
    <section className="section" id="services">
      <div className="container-custom">
        <ScrollReveal>
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">
            What We Build
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-16 tracking-wide leading-none">
            A Full Business Team.
            <br />
            <span className="text-gradient">One Partner.</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="bg-void-light border border-void-lighter p-8 h-full group transition-all duration-300 hover:border-gold/25">
                <span className="text-2xl text-gold block mb-4">
                  {s.icon}
                </span>
                <h3 className="font-display text-xl md:text-2xl text-white mb-3 tracking-wide group-hover:text-gold transition-colors">
                  {s.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] text-gold tracking-wider uppercase px-2.5 py-1 border border-gold/20 bg-gold/[0.04]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
