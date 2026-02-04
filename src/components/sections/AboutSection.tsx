"use client";

import Link from "next/link";
import { ArrowRight, Heart, Zap, Shield } from "lucide-react";
import { ScrollReveal, Button } from "@/components/ui";

const values = [
  {
    icon: Heart,
    title: "Creator-First",
    description:
      "Every decision we make starts with one question: does this help creators?",
  },
  {
    icon: Zap,
    title: "Transparency",
    description:
      "No hidden fees, no confusing contracts, no surprises. What you see is what you get.",
  },
  {
    icon: Shield,
    title: "Independence",
    description:
      "We're here to support, not control. Your work stays yours—always.",
  },
];

export default function AboutSection() {
  return (
    <section className="section" id="about">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div>
            <ScrollReveal>
              <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
                Our Mission
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
                Built by Creatives,{" "}
                <span className="text-gradient">For Creatives</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We started HLPFL because we were tired of seeing talented
                creative entrepreneurs get trapped in exploitative deals. The
                industry is changing, and creatives deserve partners who
                actually help—not extract.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                We&apos;re not a label, management company, or publisher. We&apos;re a
                nonprofit providing the infrastructure and support that creative
                entrepreneurs need to thrive independently.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <Link href="/about">
                <Button variant="outline" className="group">
                  Read Our Story
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>
            </ScrollReveal>
          </div>

          {/* Values Side */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.15} direction="left">
                <div className="flex gap-5 p-6 rounded-xl bg-void-light border border-gold/10 hover:border-gold/30 transition-colors group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-void transition-all">
                    <value.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl mb-2 group-hover:text-gold transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-gray-400">{value.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
