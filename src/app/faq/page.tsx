'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'Why is the website only $49?',
    a: "Because a clean 5-page static site on Cloudflare Pages takes 3–5 hours if you know what you're doing. Most agencies quote $2,000–$10,000 because they have overhead, project managers, and revision spirals. We don't. The $49 is a real price for a real deliverable — not a bait-and-switch. The real revenue comes from retainers and add-on services, which we earn by doing good work, not by locking you into an overpriced contract.",
  },
  {
    q: 'What does "+ domain" mean?',
    a: "The domain (yourname.com) is registered and owned by you — not us. We recommend Cloudflare Registrar, which charges at cost (~$8–15/year for most .com domains). You log in, you buy it, it's yours. We then set up the DNS and connect it to your site. If we ever part ways, you keep your domain, your hosting, and your code. No dependency.",
  },
  {
    q: 'Do you use AI?',
    a: "Not on client deliverables. Every website, logo, and piece of content we deliver is made by hand — coded, designed, or written by a person. The market is flooded with AI-generated work sold at premium prices. We don't do that. Where AI-assisted content is offered (social media, blog posts), we label it clearly and price it differently. You always know what you're getting.",
  },
  {
    q: 'How fast is delivery?',
    a: "Standard delivery for a 5-page website is 5–7 business days. Most a la carte services are 1–5 business days depending on complexity. Rush delivery (48-hour turnaround) is available as an add-on for $29 on most services. We don't pad timelines. When we give you a delivery date, we hit it.",
  },
  {
    q: 'What if I need changes after delivery?',
    a: "Every project includes one round of revisions. After that, changes fall into two categories: if you're on a retainer, updates are included up to your tier's hours. If you're not on a retainer, updates are billed at $75/hr and quoted before work starts. No surprise invoices.",
  },
  {
    q: 'Do I own my site and code?',
    a: "Yes. 100%. The domain is registered in your name. The hosting account is yours. The GitHub repo (if applicable) is yours. We don't keep a copy, we don't put a footer link saying 'Built by X', and we don't hold anything hostage if you want to move on. Your business is yours.",
  },
  {
    q: 'What\'s the difference between AI-Assisted and Human-Made content?',
    a: "Human-Made content is written from scratch by a person — it takes longer, is more tailored to your specific voice and business, and costs more for that reason. AI-Assisted content starts with an AI draft that is then edited and reviewed by a human before delivery — it's faster, still quality-checked, and priced lower. Neither is a scam. One is just a bigger investment. The choice is yours, always labeled on the services page.",
  },
  {
    q: 'Can I cancel a retainer?',
    a: "Yes, any time, with no penalty. Retainers are month-to-month. Cancel before your next billing date and you won't be charged again. We keep clients by doing good work, not by trapping them in contracts.",
  },
  {
    q: 'Do you work internationally?',
    a: "Yes. We're based in Costa Rica and serve clients across Latin America, the Caribbean, the US Hispanic market, and globally. The website is bilingual (EN/ES) and all pricing is in USD. Payment is handled through Stripe — works from anywhere.",
  },
  {
    q: 'How do I pay?',
    a: "All services use Stripe Payment Links — click 'Buy Now' on any service or package and you'll be taken to a secure Stripe checkout. We accept all major credit and debit cards. After payment, you'll receive a confirmation and we'll reach out within 24 hours to get started. For custom projects, we send a Stripe invoice directly.",
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      {/* Header */}
      <section className="bg-void pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-3">FAQ</p>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] tracking-wider text-white mb-6">
            STRAIGHT<br />ANSWERS.
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            No marketing speak. No runarounds. Everything you actually need to know before buying.
          </p>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="bg-void pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="border border-void-border">
            {faqs.map((faq, i) => (
              <div key={i} className={`border-b border-void-border last:border-0 ${open === i ? 'bg-void-light' : ''}`}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-start justify-between gap-6 px-8 py-6 text-left group"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-display text-sm text-gold/50 tracking-widest mt-0.5 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white/80 group-hover:text-white font-medium transition-colors text-sm leading-relaxed">
                      {faq.q}
                    </span>
                  </div>
                  <span className="text-gold shrink-0 mt-0.5">
                    {open === i ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                {open === i && (
                  <div className="px-8 pb-6 pl-[4.5rem]">
                    <p className="text-white/55 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-void-dark border-t border-void-border py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] tracking-wider text-white mb-6">
            STILL HAVE A QUESTION?
          </h2>
          <p className="text-white/50 mb-8">24-hour response time. Always.</p>
          <a
            href="https://wa.me/50688888888"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-white font-semibold px-8 py-4 text-sm tracking-wide transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
        </div>
      </section>
    </>
  )
}
