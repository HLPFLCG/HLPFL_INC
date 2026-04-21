import Link from 'next/link'

const values = [
  { title: 'No AI on Deliverables', desc: 'Every site, logo, and piece of content is made by a person. Not generated. Not templated.' },
  { title: 'No Tracking on Your Site', desc: 'No Google Analytics. No Meta Pixel. No cookies banner. Your visitors\' data stays private.' },
  { title: 'You Own Everything', desc: 'Domain, code, accounts — all in your name from day one. No dependency. Walk away any time.' },
  { title: 'No Contracts', desc: 'Retainers are month-to-month. We keep clients by doing good work, not by locking them in.' },
  { title: '24hr Response Time', desc: 'Not 3 business days. Not a ticket queue. A real person who responds within 24 hours.' },
  { title: 'Human to Human', desc: 'No account managers. No handoffs. You work directly with the person building your business.' },
]

const timeline = [
  { year: '2017', label: 'Started Building', desc: 'First client website. First lesson that agencies overcharge and underdeliver.' },
  { year: '2019', label: 'Went Full Digital', desc: 'Expanded into branding, GMB, and local SEO. Built systems for fast, consistent delivery.' },
  { year: '2022', label: 'Latin America Focus', desc: 'Moved to Costa Rica. Recognized the massive gap in affordable digital services for local business owners.' },
  { year: '2024', label: 'HLPFL INC', desc: 'Formalized the business. Committed to the $49 model and the anti-AI positioning.' },
  { year: '2026', label: 'Scaling', desc: 'Serving small business owners across Costa Rica, the Caribbean, and the US Hispanic market.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-void pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-3">About</p>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] tracking-wider text-white mb-6">
            BUILT BY SOMEONE<br />
            <span className="text-gold">WHO&apos;S BEEN THERE.</span>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="bg-void pb-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              7 years as an entrepreneur across multiple verticals. Built this because I got tired of
              watching business owners get overcharged for work done by software.
            </p>
            <p className="text-white/50 leading-relaxed mb-6">
              Every agency charges $2,000–$10,000 for a website. Every &quot;guru&quot; uses AI,
              slaps their name on it, and charges like they built it by hand.
              HLPFL does the opposite: every deliverable is human-made, fast-turnaround,
              and priced for the business owner who built something real — not the one with an investor.
            </p>
            <p className="text-white/50 leading-relaxed">
              We operate from Costa Rica, serving local business owners in Manzanillo, Puerto Viejo,
              and the wider Caribbean coast — and globally via referral.
              The model is simple: charge what&apos;s fair, deliver what you promised, do it fast.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { value: '7', label: 'Years building digital businesses' },
              { value: '$49', label: 'Starting price for a full website' },
              { value: '24hr', label: 'Maximum response time, always' },
              { value: '100%', label: 'Client ownership of all assets' },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-6 border border-void-border p-5 bg-void-dark">
                <span className="font-display text-3xl text-gold tracking-wider shrink-0">{stat.value}</span>
                <span className="text-white/50 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-void-dark border-t border-void-border py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-3">Values</p>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] tracking-wider text-white mb-16">
            HOW WE OPERATE.
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-void-border">
            {values.map((v, i) => (
              <div key={v.title} className="bg-void-dark p-8">
                <p className="font-display text-3xl text-gold/30 tracking-wider mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-semibold text-white mb-3">{v.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-void py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-3">The Journey</p>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] tracking-wider text-white mb-16">
            BUILDING SOMETHING DIFFERENT.
          </h2>
          <div className="relative border-l border-void-border pl-8 space-y-12 ml-4">
            {timeline.map((item) => (
              <div key={item.year} className="relative">
                <div className="absolute -left-[2.625rem] top-0 w-3 h-3 rounded-full border-2 border-gold bg-void" />
                <p className="font-display text-2xl text-gold tracking-wider mb-1">{item.year}</p>
                <p className="font-semibold text-white text-sm mb-2">{item.label}</p>
                <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-void-dark border-t border-void-border py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] tracking-wider text-white mb-6">
            READY TO WORK TOGETHER?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/packages" className="bg-gold hover:bg-gold-light text-white font-semibold px-8 py-4 text-sm tracking-wide transition-colors">
              See Packages
            </Link>
            <Link href="/contact" className="border border-white/20 hover:border-white/50 text-white/70 hover:text-white font-medium px-8 py-4 text-sm tracking-wide transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
