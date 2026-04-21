import Link from 'next/link'

const packages = [
  {
    emoji: '🔥',
    name: 'Get Online',
    tagline: '"I have nothing. I need something."',
    price: 79,
    savings: 24,
    popular: false,
    stripeLink: 'https://buy.stripe.com/PLACEHOLDER_PKG_ONLINE',
    retainer: null,
    includes: [
      '5-Page Website',
      'Cloudflare Hosting Setup',
      '1 Branded QR Code',
      'Google My Business Setup',
      'WhatsApp Business Setup',
    ],
  },
  {
    emoji: '🚀',
    name: 'Local Pro',
    tagline: '"I have a business. I need a presence."',
    price: 199,
    savings: 78,
    popular: true,
    stripeLink: 'https://buy.stripe.com/PLACEHOLDER_PKG_LOCAL_PRO',
    retainer: { name: 'Starter Retainer', price: 25 },
    includes: [
      'Everything in Get Online',
      'Logo Design',
      'HTML Email Signature',
      'Google Workspace (G-Suite) Setup',
      'SEO Audit Report',
      'First month of Starter Retainer ($25/mo)',
    ],
  },
  {
    emoji: '🛒',
    name: 'Digital Storefront',
    tagline: '"I need to sell online."',
    price: 299,
    savings: 87,
    popular: false,
    stripeLink: 'https://buy.stripe.com/PLACEHOLDER_PKG_STOREFRONT',
    retainer: { name: 'Growth Retainer', price: 75 },
    includes: [
      '5-Page Website',
      'Shopify Store (Basic, up to 20 products)',
      'Stripe Payment Integration',
      'On-Page SEO Setup',
      'Chatbot — Basic FAQ',
      'First month of Growth Retainer ($75/mo)',
    ],
  },
  {
    emoji: '💼',
    name: 'Full Brand',
    tagline: '"I want everything done right, once."',
    price: 499,
    savings: 150,
    popular: false,
    stripeLink: 'https://buy.stripe.com/PLACEHOLDER_PKG_FULL_BRAND',
    retainer: { name: 'Partner Retainer', price: 149 },
    includes: [
      'Everything in Digital Storefront',
      'Full Brand Kit (logo + colors + fonts + guide)',
      'Privacy & Security Audit (Basic)',
      'Business Analysis Session (1hr)',
      '3 months of Social Media Content (8 posts/mo)',
      'First month of Partner Retainer ($149/mo)',
    ],
  },
]

const retainerTiers = [
  {
    name: 'Starter',
    price: 25,
    desc: 'Up to 2hrs of updates per month. Text/image changes, minor fixes.',
  },
  {
    name: 'Growth',
    price: 75,
    desc: 'Updates + 8 social media posts/mo + basic reporting.',
  },
  {
    name: 'Partner',
    price: 149,
    desc: 'Updates + 16 posts + monthly performance report + 1hr consulting.',
  },
]

export default function PackagesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-void pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-3">Packages</p>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] tracking-wider text-white mb-6">
            THE SMART WAY<br />TO START.
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Everything bundled at a discount. Pick your package, add a retainer, and grow from there.
            All prices include first month of retainer where noted.
          </p>
        </div>
      </section>

      {/* Packages grid */}
      <section className="bg-void pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-px bg-void-border">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative p-8 flex flex-col ${pkg.popular ? 'bg-void-light' : 'bg-void'}`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gold text-white text-xs font-semibold tracking-widest px-4 py-1.5 uppercase">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <span className="text-3xl mb-3 block">{pkg.emoji}</span>
                  <h2 className="font-display text-2xl tracking-wider text-white mb-1">{pkg.name}</h2>
                  <p className="text-white/40 text-sm italic">{pkg.tagline}</p>
                </div>

                <div className="mb-6 flex items-baseline gap-2">
                  <span className="font-display text-5xl text-white tracking-wider">${pkg.price}</span>
                  <div className="text-sm text-white/40">
                    + domain<br />
                    <span className="text-gold text-xs">Save ${pkg.savings} vs. à la carte</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                      <span className="text-gold mt-0.5 shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={pkg.stripeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-center font-semibold text-sm py-4 tracking-wide transition-colors ${
                    pkg.popular
                      ? 'bg-gold hover:bg-gold-light text-white'
                      : 'border border-gold/40 hover:border-gold text-gold hover:text-white hover:bg-gold'
                  }`}
                >
                  Buy Now — ${pkg.price}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retainer tiers */}
      <section className="bg-void-dark border-t border-void-border py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-3">Monthly Retainers</p>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] tracking-wider text-white mb-4">
            KEEP IT RUNNING.
          </h2>
          <p className="text-white/50 text-sm mb-12 max-w-lg">
            No contracts. Cancel any time. If a task exceeds included hours, you get a quote before work starts.
            No surprises.
          </p>
          <div className="grid md:grid-cols-3 gap-px bg-void-border">
            {retainerTiers.map((tier) => (
              <div key={tier.name} className="bg-void-dark p-8">
                <p className="font-display text-3xl tracking-wider text-white mb-1">{tier.name}</p>
                <p className="font-display text-4xl text-gold tracking-wider mb-4">${tier.price}<span className="text-lg text-gold/50">/mo</span></p>
                <p className="text-white/50 text-sm leading-relaxed">{tier.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-white/25 text-xs">
            Retainer rule: tasks exceeding included hours are quoted separately before work starts.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-void border-t border-void-border py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] tracking-wider text-white mb-6">
            NOT SURE WHICH ONE?
          </h2>
          <p className="text-white/50 mb-8">
            Tell us about your business — we&apos;ll tell you exactly what you need (and what you don&apos;t).
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-gold hover:bg-gold-light text-white font-semibold px-8 py-4 text-sm tracking-wide transition-colors"
            >
              Ask a Question
            </Link>
            <Link
              href="/services"
              className="border border-white/20 hover:border-white/50 text-white/70 hover:text-white font-medium px-8 py-4 text-sm tracking-wide transition-colors"
            >
              Browse À La Carte
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
