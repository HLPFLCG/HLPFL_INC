'use client'

import { Quote, TrendingUp, CheckCircle, XCircle, ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui'

// ─── DATA ────────────────────────────────────────────────────────────────────

const partnerLogos = [
  { name: 'Google', abbr: 'G', sub: 'My Business' },
  { name: 'Shopify', abbr: 'Sf', sub: 'Commerce' },
  { name: 'Cloudflare', abbr: 'CF', sub: 'Pages & DNS' },
  { name: 'Stripe', abbr: 'St', sub: 'Payments' },
  { name: 'WhatsApp', abbr: 'WA', sub: 'Business' },
  { name: 'Adobe', abbr: 'Ai', sub: 'Illustrator' },
  { name: 'Next.js', abbr: 'N', sub: 'Framework' },
  { name: 'GitHub', abbr: 'GH', sub: 'Version Control' },
]

const testimonials = [
  {
    quote:
      'I had been putting off building a website for 3 years because every quote I got was over $1,000. HLPFL built mine in a week and it actually looks better than the expensive ones I saw.',
    name: 'Maria G.',
    company: 'Restaurant · Costa Rica',
    service: 'Website + Google My Business',
    metric: 'Live in 6 days',
    initials: 'MG',
    color: '#5b8fa8',
  },
  {
    quote:
      'What I appreciate most is that I own everything. No dependency. He set it all up under my name, walked me through it, and now I know how it works.',
    name: 'Carlos R.',
    company: 'Tour Operator · Caribbean Coast',
    service: 'Full Brand Package',
    metric: '100% asset ownership',
    initials: 'CR',
    color: '#ab6c3d',
  },
  {
    quote:
      'The Shopify setup was seamless. I was selling within 10 days of reaching out. The price I paid was a fraction of what the agency quoted me.',
    name: 'Priya S.',
    company: 'Boutique · Online',
    service: 'Shopify Store + Payment Integration',
    metric: 'Selling in 10 days',
    initials: 'PS',
    color: '#4a8c6e',
  },
]

const beforeAfter = {
  before: [
    { label: 'Cost', value: '$2,000–$10,000' },
    { label: 'Delivery', value: '4–12 weeks' },
    { label: 'Domain ownership', value: 'Agency holds it' },
    { label: 'Source code', value: 'Locked in CMS' },
    { label: 'Revisions', value: 'Billed extra every time' },
    { label: 'Contract', value: 'Required — min. 12 months' },
  ],
  after: [
    { label: 'Cost', value: 'From $49' },
    { label: 'Delivery', value: '5–7 business days' },
    { label: 'Domain ownership', value: 'Registered in your name' },
    { label: 'Source code', value: 'Yours — GitHub repo in your account' },
    { label: 'Revisions', value: 'One round included, retainer for ongoing' },
    { label: 'Contract', value: 'None — month-to-month retainers' },
  ],
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function SocialProofSection() {
  const logoTrack = [...partnerLogos, ...partnerLogos]

  return (
    <>
      {/* ── LOGOS BANNER ──────────────────────────────────────────────────── */}
      <section className="bg-void-dark border-y border-gold/10 py-8 overflow-hidden" aria-label="Partner integrations">
        <ScrollReveal>
          <p className="text-center text-xs tracking-[0.25em] text-white/30 uppercase mb-6">
            Built with &amp; connected to
          </p>
        </ScrollReveal>

        <div className="relative overflow-hidden">
          {/* left/right fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-void-dark to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-void-dark to-transparent" />

          <div
            className="flex items-center gap-0 w-max"
            style={{ animation: 'scrollLeft 28s linear infinite' }}
          >
            {logoTrack.map((logo, i) => (
              <div
                key={i}
                className="inline-flex flex-col items-center justify-center gap-1 px-10 opacity-40 hover:opacity-80 transition-opacity duration-300 cursor-default select-none"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center font-display text-lg tracking-wider text-white bg-white/[0.06] border border-white/[0.08]"
                  aria-hidden="true"
                >
                  {logo.abbr}
                </div>
                <span className="text-[10px] font-medium text-white/60 tracking-wider whitespace-nowrap">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="section bg-void" id="testimonials">
        <div className="container-custom">
          <ScrollReveal>
            <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">Real Results</span>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-wider leading-none text-white mb-4">
              REAL BUSINESSES.
              <br />
              <span className="text-gradient">REAL RESULTS.</span>
            </h2>
            <p className="text-white/40 text-sm mb-16 max-w-lg">
              These aren&apos;t stock photos or made-up reviews. They&apos;re real business owners who hired us and saw results.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1}>
                <article className="bg-void-light border border-void-lighter p-8 h-full flex flex-col group transition-all duration-300 hover:border-gold/30 hover:-translate-y-1">
                  {/* Avatar + identity */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-body font-bold text-sm text-white"
                      style={{ background: t.color }}
                      aria-hidden="true"
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm leading-tight">{t.name}</p>
                      <p className="text-white/40 text-xs mt-0.5 leading-tight">{t.company}</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative flex-1 mb-6">
                    <Quote className="absolute -top-1 -left-1 w-5 h-5 text-gold/20" aria-hidden="true" />
                    <p className="text-white/65 text-sm leading-relaxed pl-5 italic">
                      {t.quote}
                    </p>
                  </div>

                  {/* Metric + service */}
                  <div className="border-t border-gold/15 pt-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-gold flex-shrink-0" aria-hidden="true" />
                      <span className="text-gold text-xs font-semibold tracking-wide">{t.metric}</span>
                    </div>
                    <span className="text-[10px] text-white/30 border border-white/10 px-2 py-1 tracking-wider whitespace-nowrap">
                      {t.service}
                    </span>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ────────────────────────────────────────────────── */}
      <section className="section bg-void-dark" id="before-after">
        <div className="container-custom">
          <ScrollReveal>
            <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">The Transformation</span>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-wider leading-none mb-4">
              BEFORE VS.
              <br />
              <span className="text-gradient">AFTER HLPFL.</span>
            </h2>
            <p className="text-white/40 text-sm mb-16 max-w-lg">
              Same business. Same goals. Completely different digital reality.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Before */}
            <ScrollReveal delay={0.0}>
              <div className="bg-void border border-red-500/15 p-8 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <XCircle className="w-5 h-5 text-red-400/70 flex-shrink-0" aria-hidden="true" />
                  <h3 className="font-display text-2xl tracking-wider text-white/50">BEFORE HLPFL</h3>
                </div>
                <div className="space-y-5">
                  {beforeAfter.before.map((row) => (
                    <div key={row.label} className="flex items-start justify-between gap-4 border-b border-white/[0.04] pb-5 last:border-0 last:pb-0">
                      <span className="text-xs text-white/30 tracking-wider uppercase flex-shrink-0 pt-0.5 w-36">
                        {row.label}
                      </span>
                      <span className="text-sm text-red-300/60 text-right leading-snug">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* After */}
            <ScrollReveal delay={0.12}>
              <div className="bg-void border border-gold/25 p-8 h-full relative overflow-hidden">
                {/* subtle glow */}
                <div
                  className="absolute top-0 right-0 w-48 h-48 pointer-events-none rounded-full"
                  aria-hidden="true"
                  style={{ background: 'radial-gradient(circle at top right, rgba(171,108,61,0.07), transparent 70%)' }}
                />
                <div className="flex items-center gap-3 mb-8">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" aria-hidden="true" />
                  <h3 className="font-display text-2xl tracking-wider text-white">AFTER HLPFL</h3>
                </div>
                <div className="space-y-5">
                  {beforeAfter.after.map((row) => (
                    <div key={row.label} className="flex items-start justify-between gap-4 border-b border-gold/[0.08] pb-5 last:border-0 last:pb-0">
                      <span className="text-xs text-white/30 tracking-wider uppercase flex-shrink-0 pt-0.5 w-36">
                        {row.label}
                      </span>
                      <span className="text-sm text-gold/80 text-right leading-snug">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Bottom CTA nudge */}
          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex justify-center">
              <a
                href="/packages"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm font-medium transition-colors"
              >
                Start your transformation for $49
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
