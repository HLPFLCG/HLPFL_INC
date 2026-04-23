'use client'

import Link from 'next/link'
import { ScrollReveal } from '@/components/ui'

const steps = [
  {
    num: '01',
    title: 'Choose Your Package',
    desc: "Pick the plan that fits where your business is right now. Start at $49 — upgrade whenever you're ready.",
  },
  {
    num: '02',
    title: 'Submit Your Info',
    desc: 'Fill out a short intake form. Tell us your brand, your goals, and any assets you already have. Takes under 10 minutes.',
  },
  {
    num: '03',
    title: 'We Build in 48 Hours',
    desc: 'We handle everything — design, copy, hosting, and launch. You get a hand-built, mobile-first site with your domain. Done.',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="section bg-void" id="how-it-works">
      <div className="container-custom">

        <ScrollReveal>
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">
            How It Works
          </span>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-wider leading-none mb-4">
            THREE STEPS.
            <br />
            <span className="text-gradient">THAT&apos;S IT.</span>
          </h2>
          <p className="text-white/50 text-base mb-16 max-w-xl">
            No discovery calls. No 47-question briefing doc. No waiting two weeks for a quote.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.12}>
              <div className="relative bg-void-light border border-void-lighter p-10 h-full group transition-all duration-300 hover:border-gold/25 hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-3 right-4 font-display text-7xl text-gold/[0.06] leading-none select-none">
                  {step.num}
                </div>
                <p className="font-display text-5xl text-gold tracking-wider mb-4">{step.num}</p>
                <h3 className="font-display text-2xl md:text-3xl tracking-wider text-white mb-4 leading-tight">
                  {step.title.toUpperCase()}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.35}>
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/packages"
              className="bg-gold hover:bg-gold-light text-white font-semibold px-8 py-4 text-sm tracking-wide transition-colors"
            >
              Get Your Site for $49
            </Link>
            <p className="text-white/30 text-xs">No contract. You own everything from day one.</p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
