"use client";

import { ScrollReveal } from "@/components/ui";

const VALUE_STACK = [
  { service: "Entity Formation + EIN", market: "$500–$1,500" },
  { service: "Brand Strategy Session", market: "$1,000–$3,000" },
  { service: "Logo + Visual Identity", market: "$1,500–$5,000" },
  { service: "Custom Website", market: "$3,000–$10,000" },
  { service: "Contract Templates", market: "$500–$2,000 each" },
  { service: "Sales Materials", market: "$1,000–$3,000" },
  { service: "Social Media Setup", market: "$500–$2,000" },
];

export default function ValueStack() {
  return (
    <section id="value" className="section bg-void-light">
      <div className="max-w-[900px] mx-auto px-4">
        <ScrollReveal>
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">
            The Math
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 tracking-wide leading-none">
            $1,000 Replaces{" "}
            <span className="text-gradient">$10,000+</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-12 max-w-[700px]">
            Other companies charge $10,000–$30,000 for what we deliver in the
            activation alone. Here&apos;s what your $1,000 actually buys:
          </p>
        </ScrollReveal>

        {VALUE_STACK.map((v, i) => (
          <ScrollReveal key={i} delay={i * 0.06}>
            <div className="flex justify-between items-center py-4 border-b border-void-lighter">
              <div className="flex items-center gap-3">
                <span className="text-gold text-sm">✓</span>
                <span className="text-gray-200 text-sm md:text-base">
                  {v.service}
                </span>
              </div>
              <div className="flex items-center gap-5">
                <span className="text-gray-500 text-xs md:text-sm line-through hidden sm:inline">
                  {v.market}
                </span>
                <span className="text-gold text-xs font-bold tracking-wider">
                  INCLUDED
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}

        <ScrollReveal delay={0.5}>
          <div className="mt-10 p-8 border border-gold/20 bg-gold/[0.03] text-center">
            <div className="text-gray-500 text-xs tracking-[0.15em] uppercase mb-2">
              Market Value
            </div>
            <div className="font-display text-3xl md:text-4xl text-gray-500 line-through mb-1">
              $10,000–$31,500
            </div>
            <div className="font-display text-5xl md:text-6xl text-gold">
              $1,000
            </div>
            <div className="text-gray-400 text-sm mt-2">
              3–10 cents on the dollar.
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
