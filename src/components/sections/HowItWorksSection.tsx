"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, ClipboardList, Zap } from "lucide-react";
import { ScrollReveal } from "@/components/ui";

const steps = [
  {
    num: "01",
    icon: Package,
    title: "Choose Your Package",
    desc: "Pick the plan that fits where your business is right now. Start at $49 — upgrade whenever you're ready.",
  },
  {
    num: "02",
    icon: ClipboardList,
    title: "Submit Your Info",
    desc: "Fill out a short intake form. Tell us your brand, your goals, and any assets you already have. Takes under 10 minutes.",
  },
  {
    num: "03",
    icon: Zap,
    title: "We Build Your Site in 48 Hours",
    desc: "We handle everything — design, copy, hosting, and launch. You get a hand-built, mobile-first site with your domain. Done.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="section bg-void" id="how-it-works">
      <div className="container-custom">

        {/* Header */}
        <ScrollReveal>
          <span className="eyebrow mb-4 block">How It Works</span>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-wider leading-none mb-4">
            THREE STEPS.
            <br />
            <span className="text-gradient">THAT&apos;S IT.</span>
          </h2>
          <p className="text-white/50 text-base mb-16 max-w-xl">
            No discovery calls. No 47-question briefing doc. No waiting two weeks for a quote.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-6">

          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-[3.25rem] left-[calc(16.666%+1.5rem)] right-[calc(16.666%+1.5rem)] h-px bg-gradient-to-r from-gold/20 via-gold/40 to-gold/20 pointer-events-none" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.num} delay={i * 0.12}>
                <div className="relative bg-void-light border border-void-lighter p-8 h-full group transition-all duration-300 hover:border-gold/30 hover:-translate-y-1">

                  {/* Step number ghost */}
                  <div className="absolute top-3 right-4 font-display text-7xl text-gold/[0.06] leading-none select-none">
                    {step.num}
                  </div>

                  {/* Icon ring */}
                  <div className="relative z-10 w-12 h-12 flex items-center justify-center border border-gold/30 bg-gold/[0.06] mb-6 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>

                  {/* Step label */}
                  <p className="text-[10px] font-semibold tracking-[0.25em] text-gold/50 uppercase mb-2">
                    Step {step.num}
                  </p>

                  {/* Title */}
                  <h3 className="font-display text-2xl md:text-3xl tracking-wider text-white mb-4 leading-tight group-hover:text-gold transition-colors duration-300">
                    {step.title.toUpperCase()}
                  </h3>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Animated bottom border on hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold/60 to-gold/20"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA row */}
        <ScrollReveal delay={0.35}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/packages" className="btn-primary">
              Get Your Site for $49
            </Link>
            <p className="text-white/30 text-xs">
              No contract. You own everything from day one.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
