import Link from 'next/link'

// ─── DATA ────────────────────────────────────────────────────────────────────

const trustItems = [
  'Websites', 'Google My Business', 'SEO', 'Shopify Stores',
  'Social Media Content', 'WhatsApp Business', 'Branding & Logos',
  'Hosting & SSL', 'QR Codes & NFC', 'Consulting',
]

const steps = [
  {
    num: '01',
    price: '$49',
    title: 'Hook',
    desc: 'A fast, clean, hand-built website. 5 pages, mobile-first, live on Cloudflare Pages. Delivered in 5–7 business days. Client owns the domain. Always.',
  },
  {
    num: '02',
    price: 'À la carte',
    title: 'Upsell',
    desc: 'Google My Business. Brand kit. On-page SEO. Shopify store. Email newsletter. They pick exactly what they need — nothing pushed, nothing bundled they didn\'t ask for.',
  },
  {
    num: '03',
    price: '$25–$149/mo',
    title: 'Retainer',
    desc: 'Monthly updates, content delivery, and ongoing support. The flywheel. Every project client converted to a retainer is recurring revenue with zero new acquisition cost.',
  },
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

const testimonials = [
  {
    quote: 'I had been putting off building a website for 3 years because every quote I got was over $1,000. HLPFL built mine in a week and it actually looks better than the expensive ones I saw.',
    name: 'Maria G.',
    biz: 'Restaurant · Costa Rica',
    service: 'Website + Google My Business',
  },
  {
    quote: 'What I appreciate most is that I own everything. No dependency. He set it all up under my name, walked me through it, and now I know how it works.',
    name: 'Carlos R.',
    biz: 'Tour Operator · Caribbean Coast',
    service: 'Full Brand Package',
  },
  {
    quote: 'The Shopify setup was seamless. I was selling within 10 days of reaching out. The price I paid was a fraction of what the agency quoted me.',
    name: 'Priya S.',
    biz: 'Boutique · Online',
    service: 'Shopify Store + Payment Integration',
  },
]

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center bg-void overflow-hidden pt-24">

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(171,108,61,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(171,108,61,0.4) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Gold corner accent */}
        <div className="absolute top-0 right-0 w-px h-48 bg-gradient-to-b from-gold/40 to-transparent" />
        <div className="absolute top-0 right-0 w-48 h-px bg-gradient-to-l from-gold/40 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 py-20">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-gold/30 px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-medium tracking-widest text-gold uppercase">
              No AI. No Agency. No Markup.
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-none tracking-wider text-white mb-6">
            MODERN<br />
            <span className="text-gold">SERVICES.</span><br />
            LOCAL PRICES.
          </h1>

          {/* Subtext */}
          <p className="text-lg text-white/60 max-w-xl mb-10 leading-relaxed">
            Your website, Google presence, and brand — built by hand,
            delivered fast, priced for real business.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link
              href="/packages"
              className="bg-gold hover:bg-gold-light text-white font-semibold px-8 py-4 text-sm tracking-wide transition-colors"
            >
              Get Your Site for $49
            </Link>
            <Link
              href="/services"
              className="border border-white/20 hover:border-white/50 text-white/70 hover:text-white font-medium px-8 py-4 text-sm tracking-wide transition-colors"
            >
              See All Services
            </Link>
          </div>

          {/* Price badge */}
          <div className="inline-flex items-baseline gap-2 border-l-2 border-gold pl-4">
            <span className="font-display text-4xl text-white tracking-wide">$49</span>
            <span className="text-sm text-white/40">website + domain (you own it)</span>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────────────────── */}
      <div className="bg-void-dark border-y border-void-border py-4 overflow-hidden">
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
      <section className="bg-void py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-wider text-white mb-4">
            YOU BUILT SOMETHING REAL.
          </h2>
          <p className="text-xl text-gold mb-16">
            Your online presence shouldn't look like it was an afterthought.
          </p>
          <div className="grid md:grid-cols-3 gap-px bg-void-border">
            {[
              {
                head: 'You don\'t have time for this',
                body: 'Running a business is a full-time job. Your website shouldn\'t be your second one.',
              },
              {
                head: 'Agencies cost too much',
                body: 'The average agency charges $2,000–$5,000 for a website. That\'s inventory money. That\'s payroll.',
              },
              {
                head: 'Everyone\'s using AI now',
                body: 'Your competitors got a site that looks like everyone else\'s. Yours won\'t.',
              },
            ].map((p, i) => (
              <div key={i} className="bg-void p-8">
                <p className="text-xs font-semibold tracking-widest text-gold/60 uppercase mb-3">Problem {String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-semibold text-white text-lg mb-3">{p.head}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="bg-void-dark border-y border-void-border py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
          {[
            { value: '$49', label: 'Website' },
            { value: '5–7', label: 'Day delivery' },
            { value: '0', label: 'Contracts' },
            { value: '24hr', label: 'Response time' },
            { value: '100%', label: 'You own it' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-display text-3xl md:text-4xl tracking-wider text-gold mb-1">{stat.value}</p>
              <p className="text-xs text-white/40 tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS (3 STEPS) ───────────────────────────────────────── */}
      <section className="bg-void py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-3">The Process</p>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-wider text-white mb-16">
            THREE STEPS TO RECURRING REVENUE
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-void-border">
            {steps.map((step) => (
              <div key={step.num} className="bg-void p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 font-display text-6xl text-white/[0.04] tracking-wider select-none">
                  {step.num}
                </div>
                <p className="font-display text-5xl text-gold tracking-wider mb-1">{step.num}</p>
                <p className="text-xs font-semibold tracking-widest text-gold/60 uppercase mb-2">{step.price}</p>
                <h3 className="font-display text-2xl tracking-wider text-white mb-4">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICE COMPARISON ─────────────────────────────────────────────── */}
      <section className="bg-void-dark py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-3">The Math</p>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-wider text-white mb-4">
            $49 REPLACES $2,000–$10,000
          </h2>
          <p className="text-white/50 mb-12 max-w-xl">
            Other companies charge agency prices for work done by software.
            Here's what the same deliverables cost at HLPFL.
          </p>

          <div className="border border-void-border">
            <div className="grid grid-cols-3 bg-void-light px-6 py-3 border-b border-void-border">
              <span className="text-xs font-semibold tracking-widest text-white/40 uppercase">Service</span>
              <span className="text-xs font-semibold tracking-widest text-white/40 uppercase">Agency Rate</span>
              <span className="text-xs font-semibold tracking-widest text-gold uppercase">HLPFL Price</span>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 px-6 py-4 border-b border-void-border last:border-0 ${i % 2 === 0 ? 'bg-void' : 'bg-void-dark'}`}
              >
                <span className="text-sm text-white/80 font-medium">{row.item}</span>
                <span className="text-sm text-white/30 line-through">{row.agency}</span>
                <span className="text-sm text-gold font-semibold">{row.hlpfl}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between border border-gold/30 bg-gold/5 px-6 py-4">
            <span className="text-white/60 text-sm">Market value of Get Online + Local Pro package</span>
            <div className="text-right">
              <span className="text-white/30 line-through text-sm mr-4">$277</span>
              <span className="text-gold font-bold text-xl">$199</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE CATEGORIES ───────────────────────────────────────────── */}
      <section className="bg-void py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-3">What We Build</p>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-wider text-white mb-16">
            EVERYTHING A SMALL BUSINESS NEEDS.
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-void-border">
            {serviceCategories.map((cat) => (
              <div key={cat.title} className="bg-void p-8 card-gold-border group cursor-default">
                <div className="text-gold text-2xl mb-4">{cat.icon}</div>
                <h3 className="font-display text-xl tracking-wider text-white mb-3">{cat.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-5">{cat.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.tags.map(tag => (
                    <span key={tag} className="text-xs text-gold/70 border border-gold/20 px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm font-medium transition-colors"
            >
              See all services with pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY HLPFL ────────────────────────────────────────────────────── */}
      <section className="bg-void-dark py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-3">Why Us</p>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-wider text-white mb-16">
            BUILT DIFFERENT.
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-void-border">
            {values.map((v) => (
              <div key={v.num} className="bg-void-dark p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 font-display text-5xl text-white/[0.04] select-none">
                  {v.num}
                </div>
                <p className="font-display text-5xl text-gold/30 tracking-wider mb-4">{v.num}</p>
                <h3 className="font-semibold text-white text-xl mb-3">{v.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="bg-void py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-3">Real Results</p>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-wider text-white mb-16">
            REAL BUSINESSES. REAL RESULTS.
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-void-border">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-void p-8 flex flex-col">
                <p className="text-gold text-3xl font-display mb-4">"</p>
                <p className="text-white/70 text-sm leading-relaxed flex-1 mb-6 italic">
                  {t.quote}
                </p>
                <div className="border-t border-void-border pt-5">
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs mt-1">{t.biz}</p>
                  <span className="inline-block mt-3 text-xs text-gold/70 border border-gold/20 px-2 py-1">
                    {t.service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="bg-void-dark border-t border-void-border py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-4">Get Started</p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] tracking-wider text-white mb-6">
            READY TO GET FOUND?
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto">
            Start with a $49 website. Build from there.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/packages"
              className="bg-gold hover:bg-gold-light text-white font-semibold px-10 py-4 text-sm tracking-wide transition-colors"
            >
              Get Your Site for $49
            </Link>
            <Link
              href="/contact"
              className="border border-white/20 hover:border-white/50 text-white/70 hover:text-white font-medium px-10 py-4 text-sm tracking-wide transition-colors"
            >
              Ask a Question
            </Link>
          </div>
          <p className="mt-8 text-white/25 text-xs">
            No contract required. You own everything from day one.
          </p>
        </div>
      </section>

    </>
  )
}
