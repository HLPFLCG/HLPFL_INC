'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = new FormData(form)

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data,
    })

    if (res.ok) {
      setSubmitted(true)
    }
    setLoading(false)
  }

  return (
    <>
      {/* Header */}
      <section className="bg-void pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-3">Contact</p>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] tracking-wider text-white mb-6">
            LET'S TALK<br />
            <span className="text-gold">BUSINESS.</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            24-hour response time. Always. For quick questions, WhatsApp is faster.
          </p>
        </div>
      </section>

      {/* Contact layout */}
      <section className="bg-void pb-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">

          {/* Left: form */}
          <div>
            {submitted ? (
              <div className="border border-gold/30 bg-gold/5 p-8">
                <p className="font-display text-3xl text-gold tracking-wider mb-3">GOT IT.</p>
                <p className="text-white/60">
                  We'll respond within 24 hours. Check WhatsApp if you need a faster reply.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Web3Forms access key — replace with your actual key */}
                <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY_HERE" />
                <input type="hidden" name="subject" value="New HLPFL inquiry" />
                <input type="checkbox" name="botcheck" className="hidden" />

                <div>
                  <label className="block text-xs font-semibold tracking-widest text-gold/60 uppercase mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Maria García"
                    className="w-full bg-void-dark border border-void-border text-white placeholder-white/20 px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-widest text-gold/60 uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@yourbusiness.com"
                    className="w-full bg-void-dark border border-void-border text-white placeholder-white/20 px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-widest text-gold/60 uppercase mb-2">
                    What do you need?
                  </label>
                  <select
                    name="service"
                    className="w-full bg-void-dark border border-void-border text-white/70 px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option>Website ($49)</option>
                    <option>Get Online Package ($79)</option>
                    <option>Local Pro Package ($199)</option>
                    <option>Digital Storefront Package ($299)</option>
                    <option>Full Brand Package ($499)</option>
                    <option>Branding / Logo</option>
                    <option>Google My Business Setup</option>
                    <option>SEO</option>
                    <option>Shopify Store</option>
                    <option>Social Media Content</option>
                    <option>Custom / Not Sure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-widest text-gold/60 uppercase mb-2">
                    Tell us about your business
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="What does your business do? What's your biggest challenge online right now?"
                    className="w-full bg-void-dark border border-void-border text-white placeholder-white/20 px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 text-white font-semibold py-4 text-sm tracking-wide transition-colors"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Right: info + WhatsApp */}
          <div className="space-y-8">
            <div className="border border-void-border p-6 bg-void-dark">
              <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-4">Response Time</p>
              <p className="text-white/60 text-sm leading-relaxed">
                We respond to every message within 24 hours — including weekends.
                For faster replies, WhatsApp is the best channel.
              </p>
            </div>

            <div className="border border-gold/30 p-6 bg-gold/5">
              <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-4">Prefer WhatsApp?</p>
              <p className="text-white/60 text-sm mb-5">
                Send a message directly. Include your business name and what you need.
                Most conversations start and close here.
              </p>
              <a
                href="https://wa.me/50688888888?text=Hola%20HLPFL%2C%20me%20interesa%20sus%20servicios%20para%20mi%20negocio."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-white font-semibold px-6 py-3 text-sm tracking-wide transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Message on WhatsApp
              </a>
            </div>

            <div className="border border-void-border p-6">
              <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-4">Based In</p>
              <p className="text-white/60 text-sm">
                Manzanillo, Limón, Costa Rica.<br />
                Serving clients globally — especially Latin America,
                the Caribbean Coast, and the US Hispanic market.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
