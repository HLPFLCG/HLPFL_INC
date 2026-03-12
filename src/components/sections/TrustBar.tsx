"use client";

import { ScrollReveal } from "@/components/ui";

const TRUST = [
  { stat: "501(c)(3)", label: "Nonprofit Status", sub: "Wyoming" },
  { stat: "100%", label: "Rights Retained", sub: "Always yours" },
  { stat: "10–25%", label: "Commission", sub: "Aligned incentives" },
  { stat: "$0", label: "Hidden Fees", sub: "Ever" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-void-lighter py-12 px-4">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {TRUST.map((t, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl text-gold tracking-wide">
                {t.stat}
              </div>
              <div className="text-white text-xs tracking-[0.15em] uppercase mt-1 mb-0.5">
                {t.label}
              </div>
              <div className="text-gray-500 text-[11px] tracking-wider">
                {t.sub}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
