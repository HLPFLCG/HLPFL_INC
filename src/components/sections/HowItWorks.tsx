"use client";

import { ScrollReveal } from "@/components/ui";

const STEPS = [
  {
    num: "01",
    title: "Activate",
    price: "$1,000",
    desc: "Full business audit, entity setup, brand strategy, and market positioning. In 2–4 weeks, you have a legitimate business.",
  },
  {
    num: "02",
    title: "Build",
    price: "Included",
    desc: "Custom website, brand identity, contracts, sales materials, social presence. Everything you need to sell professionally.",
  },
  {
    num: "03",
    title: "Grow",
    price: "Commission",
    desc: "We actively sell for you. Outreach, negotiation, deal closing, pipeline management. We earn when you earn.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section" >
      <div className="container-custom">
        <ScrollReveal>
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">
            The Process
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-16 tracking-wide leading-none">
            Three Steps to a
            <br />
            <span className="text-gradient">Real Business</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="relative bg-void-light border border-void-lighter p-10 h-full group transition-all duration-300 hover:border-gold/25 hover:-translate-y-1 overflow-hidden">
                {/* Large background number */}
                <div className="absolute top-3 right-4 font-display text-7xl text-gold/[0.06] leading-none select-none">
                  {s.num}
                </div>
                <div className="text-gold text-xs tracking-[0.2em] uppercase mb-2">
                  {s.price}
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-white mb-4 tracking-wide">
                  {s.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
