'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui'
import SocialProofSection from '@/components/sections/SocialProofSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'

// ─── DATA ────────────────────────────────────────────────────────────────────

const trustItems = [
  'Websites', 'Google My Business', 'SEO', 'Shopify Stores',
  'Social Media Content', 'WhatsApp Business', 'Branding & Logos',
  'Hosting & SSL', 'QR Codes & NFC', 'Consulting',
]

const stats = [
  { value: '$49', label: 'Website' },
  { value: '5–7', label: 'Day delivery' },
  { value: '0', label: 'Contracts' },
  { value: '24hr', label: 'Response time' },
  { value: '100%', label: 'You own it' },
]

const comparisonRows = [
  { item: '5-Page Website',      agency: '$2,000–$10,000', hlpfl: '$49' },
  { item: 'Logo Design',         agency: '$500–$5,000',    hlpfl: '$75' },
  { item: 'Full Brand Kit',      agency: '$2,000–$8,000',  hlpfl: '$149' },
  { item: 'GMB Setup',           agency: '$200–$500',      hlpfl: '$59' },
  { item: 'On-Page SEO',         agency: '$500–$2,000',    hlpfl: '$99' },
  { item: 'Shopify Store',       agency: '$3,000–$10,000', hlpfl: '$149–$249' },
  { item: 'Social Media (8/mo)', agency: '$500–$2,000/mo', hlpfl: '$45–$85/mo' },
]

const serviceCategories = [
  {
    icon: '◆',
    title: 'Foundation',
    tags: ['Website', 'Hosting', 'Logo', 'Brand Kit', 'QR & NFC'],
    desc: 'Everything needed to exist and look real online. Website, hosting, visual identity, and branded assets.',
  },
  {
    icon: '⬡',
    title: 'Presence',
    tags: ['GMB', 'WhatsApp Biz', 'G-Suite', 'Apple Maps', 'Directories'],
    desc: 'Show up where customers are looking. Google, Apple Maps, WhatsApp, and every directory that matters.',
  },
  {
    icon: '△',
    title: 'Commerce',
    tags: ['Shopify', 'Stripe', 'PayPal', 'Merch Store'],
    desc: 'Sell online. Shopify setup, payment system integration, and print-on-demand merch stores.',
  },
  {
    icon: '○',
    title: 'Growth',
    tags: ['SEO Audit', 'On-Page SEO', 'Chatbot', 'API', 'Web Enhancements'],
    desc: 'Get found and perform. Technical SEO, schema markup, chatbots, and performance optimization.',
  },
  {
    icon: '□',
    title: 'Content',
    tags: ['Social Posts', 'Blog', 'Email', 'Product Descriptions'],
    desc: 'Human-made or AI-assisted — your choice, your price. Content that sounds like your business, not a generator.',
  },
  {
    icon: '⊕',
    title: 'Business Intelligence',
    tags: ['Strategy Session', 'Consulting', 'Custom Projects'],
    desc: '7 years of entrepreneurship, zero fluff. Bring a problem, leave with a real solution and a prioritized action plan.',
  },
]

const values = [
  {
    num: '01',
    title: 'Human-Made',
    desc: 'Every site, every logo, every post is built by a person. Not generated. Not templated. Not outsourced. Made.',
  },
  {
    num: '02',
    title: 'You Own Everything',
    desc: 'Domain, code, hosting account, Google account — all in your name. No dependency. No hostage-taking. Walk away any time.',
  },
  {
    num: '03',
    title: 'No Contracts',
    desc: 'Retainers are month-to-month. Cancel any time. We keep clients by doing good work, not by locking them in.',
  },
  {
    num: '04',
    title: 'Prices That Make Sense',
    desc: 'We work with local business owners, not venture-backed startups. The pricing reflects that. Always.',
  },
]

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function HomePageClient() {
  return (
    <>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-void-dark via-void to-void-light" />

        {/* Radial gold glow */}
        <div
          className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(171,108,61,0.06) 0%, transparent 70%)' }}
        />

        {/* Animated accent lines */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent"
            initial={{ x: '100%' }}
            animate={{ x: '-100%' }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Diagonal lines */}
        <div
          className="absolute top-0 right-0 w-[400px] h-full opacity-[0.03] pointer-events-none"
          style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 40px, #fff 40px, #fff 41px)' }}
        />

        {/* Content */}
        <div className="relative container-custom text-center px-4 pt-20 pb-16">
          <ScrollReveal>
            <span className="eyebrow mb-6 block">No AI. No Agency. No Markup.</span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-none tracking-wider text-white mb-6">
              MODERN<br />
              <span className="text-gradient">SERVICES.</span><br />
              LOCAL PRICES.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
              Your website, Google presence, and brand — built by hand,
              delivered fast, priced for real business.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/packages" className="btn-primary">
                Get Your Site for $49
              </Link>
              <Link href="/services" className="btn-ghost">
                See All Services
              </Link>
            </div>
          </ScrollReveal>

          {/* Price badge */}
          <ScrollReveal delay={0.4}>
            <div className="inline-flex items-baseline gap-3 border-l-2 border-gold pl-5">
              <span className="font-display text-5xl text-white tracking-wide">$49</span>
              <span className="text-sm text-white/40">website + domain (you own it)</span>
            </div>
          </ScrollReveal>

          {/* Scroll indicator */}
          <ScrollReveal delay={0.6}>
            <motion.div
              className="mt-16 flex flex-col items-center gap-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold/40" />
              <span className="text-gold/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────────────────── */}
      <div className="bg-void-dark border-y border-gold/10 py-4 overflow-hidden">
        <div className="trust-bar-track">
          {[...trustItems, ...trustItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-6 text-sm font-medium text-white/40 whitespace-nowrap">
              <span className="text-gold text-xs">◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── PAIN SECTION ─────────────────────────────────────────────────── */}
      <section className="section bg-void" id="pain">
        <div className="container-custom">
          <ScrollReveal>
            <span className="eyebrow mb-4 block">The Problem</span>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-wider text-white mb-4 leading-none">
              YOU BUILT SOMETHING REAL.
            </h2>
            <p className="text-gold text-base mb-16">
              Your online presence shouldn&apos;t look like it was an afterthought.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                head: "You don't have time for this",
                body: "Running a business is a full-time job. Your website shouldn't be your second one.",
              },
              {
                head: 'Agencies cost too much',
                body: "The average agency charges $2,000–$5,000 for a website. That's inventory money. That's payroll.",
              },
              {
                head: "Everyone's using AI now",
                body: "Your competitors got a site that looks like everyone else's. Yours won't.",
              },
            ].map((problem, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-void-light border border-gold/15 p-8 h-full group transition-all duration-300 hover:border-gold hover:-translate-y-1">
                  <p className="text-xs font-semibold tracking-widest text-gold/60 uppercase mb-3">Problem {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-body font-semibold text-white text-lg mb-3">{problem.head}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{problem.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="bg-void-dark border-y border-gold/10 py-12">
        <div className="container-custom grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="text-center">
                <p className="font-display text-3xl md:text-4xl tracking-wide text-gold mb-1">{stat.value}</p>
                <p className="text-xs text-white/40 tracking-wide uppercase">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS (CUSTOMER FUNNEL) ──────────────────────────────── */}
      <HowItWorksSection />

      {/* ── PRICE COMPARISON ─────────────────────────────────────────────── */}
      <section className="section bg-void-dark" id="pricing">
        <div className="container-custom">
          <ScrollReveal>
            <span className="eyebrow mb-4 block">The Math</span>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-wider leading-none mb-4">
              $49 REPLACES
              <br />
              <span className="text-gradient">$2,000–$10,000</span>
            </h2>
            <p className="text-white/50 mb-12 max-w-xl">
              Other companies charge agency prices for work done by software.
              Here&apos;s what the same deliverables cost at HLPFL.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="border border-gold/15">
              <div className="grid grid-cols-3 bg-void-light px-6 py-3 border-b border-gold/15">
                <span className="text-xs font-semibold tracking-widest text-white/40 uppercase">Service</span>
                <span className="text-xs font-semibold tracking-widest text-white/40 uppercase">Agency Rate</span>
                <span className="text-xs font-semibold tracking-widest text-gold uppercase">HLPFL Price</span>
              </div>
              {comparisonRows.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 px-6 py-4 border-b border-gold/10 last:border-0 ${i % 2 === 0 ? 'bg-void' : 'bg-void-dark'}`}
                >
                  <span className="text-sm text-white/80 font-medium">{row.item}</span>
                  <span className="text-sm text-white/30 line-through">{row.agency}</span>
                  <span className="text-sm text-gold font-semibold">{row.hlpfl}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-8 flex items-center justify-between border border-gold/30 bg-gold/5 px-6 py-4">
              <span className="text-white/60 text-sm">Market value of Get Online + Local Pro package</span>
              <div className="text-right">
                <span className="text-white/30 line-through text-sm mr-4">$277</span>
                <span className="text-gold font-bold text-xl">$199</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SERVICE CATEGORIES ───────────────────────────────────────────── */}
      <section className="section bg-void" id="services">
        <div className="container-custom">
          <ScrollReveal>
            <span className="eyebrow mb-4 block">What We Build</span>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-wider leading-none mb-16">
              EVERYTHING A SMALL
              <br />
              <span className="text-gradient">BUSINESS NEEDS.</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((cat, i) => (
              <ScrollReveal key={cat.title} delay={i * 0.08}>
                <div className="bg-void-light border border-void-lighter p-8 h-full group transition-all duration-300 hover:border-gold/25 hover:-translate-y-1 cursor-default">
                  <span className="text-2xl text-gold block mb-4">{cat.icon}</span>
                  <h3 className="font-display text-xl tracking-wider text-white mb-3 group-hover:text-gold transition-colors">{cat.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-5">{cat.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.tags.map(tag => (
                      <span key={tag} className="text-[10px] text-gold tracking-wider uppercase px-2.5 py-1 border border-gold/20 bg-gold/[0.04]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 text-center">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm font-medium transition-colors"
              >
                See all services with pricing →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── WHY HLPFL ────────────────────────────────────────────────────── */}
      <section className="section bg-void-dark" id="why">
        <div className="container-custom">
          <ScrollReveal>
            <span className="eyebrow mb-4 block">Why Us</span>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-wider leading-none mb-16">
              BUILT
              <br />
              <span className="text-gradient">DIFFERENT.</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <ScrollReveal key={value.num} delay={i * 0.1}>
                <div className="bg-void border border-void-lighter p-10 relative overflow-hidden group transition-all duration-300 hover:border-gold/25 hover:-translate-y-1">
                  <div className="absolute top-4 right-4 font-display text-6xl text-gold/[0.06] select-none leading-none">
                    {value.num}
                  </div>
                  <div className="font-display text-4xl text-gold/30 tracking-wider mb-4">{value.num}</div>
                  <h3 className="font-body font-semibold text-white text-xl mb-3">{value.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{value.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF (LOGOS + TESTIMONIALS + BEFORE/AFTER) ──────────── */}
      <SocialProofSection />

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="section bg-void-dark border-t border-gold/10" id="cta">
        <div className="max-w-[700px] mx-auto px-4 text-center">
          <ScrollReveal>
            <span className="eyebrow mb-4 block">Get Started</span>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] tracking-wider leading-none mb-6">
              READY TO
              <br />
              <span className="text-gradient">GET FOUND?</span>
            </h2>
            <p className="text-white/50 text-lg mb-10">
              Start with a $49 website. Build from there.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/packages" className="btn-primary">
                Get Your Site for $49
              </Link>
              <Link href="/contact" className="btn-ghost">
                Ask a Question
              </Link>
            </div>
            <p className="mt-8 text-white/25 text-xs">
              No contract required. You own everything from day one.
            </p>
          </ScrollReveal>
        </div>
      </section>

    </>
  )
}
