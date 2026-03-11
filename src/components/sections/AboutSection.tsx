"use client";

import { ScrollReveal } from "@/components/ui";

const REASONS = [
  {
    title: "Nonprofit, Not No-Money",
    desc: "We're a Wyoming 501(c)(3). Every dollar of surplus goes back into serving more entrepreneurs. We don't have shareholders to feed.",
  },
  {
    title: "You Keep Your Rights",
    desc: "We never take ownership of your IP, masters, patents, or creative work. Your work is yours. Period.",
  },
  {
    title: "Aligned Incentives",
    desc: "We earn a commission on the revenue we help generate. If you don't make money, we don't make money. No retainers, no hourly billing.",
  },
  {
    title: "No Lock-In",
    desc: "If it's not working, walk. We don't hold your domain, your brand, or your business hostage. Everything we build is yours.",
  },
];

export default function AboutSection() {
  return (
    <section className="section bg-void-light" id="about">
      <div className="max-w-[1000px] mx-auto px-4">
        <ScrollReveal>
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">
            Why Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-16 tracking-wide leading-none">
            Built <span className="text-gradient">Different.</span>
          </h2>
        </ScrollReveal>

        {REASONS.map((r, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div
              className={`flex gap-6 items-start py-7 ${
                i < REASONS.length - 1 ? "border-b border-void-lighter" : ""
              }`}
            >
              <div className="font-display text-xl text-gold min-w-[32px]">
                0{i + 1}
              </div>
              <div>
                <h3 className="text-white text-lg font-bold mb-2">
                  {r.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
