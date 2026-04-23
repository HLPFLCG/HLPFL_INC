import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-void-dark border-t border-gold/10">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand + address */}
          <div className="md:col-span-2">
            <Link href="/" className="font-display text-3xl tracking-wider hover:text-gold transition-colors">
              HLPFL<span className="text-gold">.</span>
            </Link>
            <p className="mt-4 text-white/50 text-sm leading-relaxed max-w-xs">
              Modern Services. Local Prices.<br />
              Built by hand. No AI. No tracking. Fast.
            </p>
            <p className="mt-3 text-white/30 text-xs">
              Serving small business owners globally —<br />
              especially Latin America & the Caribbean.
            </p>

            {/* Physical address */}
            <address className="mt-5 not-italic">
              <p className="text-white/25 text-xs leading-relaxed">
                HLPFL INC<br />
                Caribbean Coast, Costa Rica<br />
                Cahuita – Puerto Viejo Corridor
              </p>
            </address>

            {/* Contact */}
            <div className="mt-4 space-y-1">
              <a
                href="mailto:hello@hlpfl.com"
                className="block text-xs text-white/40 hover:text-gold transition-colors"
              >
                hello@hlpfl.com
              </a>
              <a
                href="https://wa.me/50688888888"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* HLPFL links */}
          <div>
            <p className="eyebrow mb-4">HLPFL</p>
            <ul className="space-y-3">
              {[
                { href: '/services', label: 'Services' },
                { href: '/packages', label: 'Packages' },
                { href: '/about', label: 'About' },
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="eyebrow mb-4">Legal</p>
            <ul className="space-y-3">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Trust / payment badges */}
            <div className="mt-8">
              <p className="text-white/30 text-[10px] uppercase tracking-wider mb-3">Secure Payments</p>
              <div className="flex flex-wrap gap-2 items-center">
                {/* Stripe badge */}
                <span className="inline-flex items-center gap-1.5 border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/50 tracking-wide">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-[#6772e5]" aria-hidden="true">
                    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
                  </svg>
                  Stripe
                </span>
                {/* Visa */}
                <span className="inline-flex items-center border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/50 tracking-wide font-bold">
                  VISA
                </span>
                {/* Mastercard */}
                <span className="inline-flex items-center border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/50 tracking-wide">
                  MC
                </span>
                {/* SSL */}
                <span className="inline-flex items-center gap-1 border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/50 tracking-wide">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                  </svg>
                  SSL
                </span>
              </div>
              <p className="mt-3 text-white/20 text-[10px] leading-relaxed">
                Payments processed securely by Stripe.<br />
                We never store card details.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-white/30 text-xs">© 2026 HLPFL INC. All rights reserved.</p>
          <p className="text-white/20 text-xs">Hand-built. No AI. No tracking. Fast.</p>
        </div>
      </div>
    </footer>
  )
}
