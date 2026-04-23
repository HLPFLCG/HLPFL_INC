'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/services', label: 'Services', badge: null },
  { href: '/packages', label: 'Packages', badge: null },
  { href: '/stays', label: 'Stays', badge: 'New' },
  { href: '/about', label: 'About', badge: null },
  { href: '/faq', label: 'FAQ', badge: null },
  { href: '/contact', label: 'Contact', badge: null },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-void-dark/95 backdrop-blur-sm border-b border-void-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <Image src="/logo.svg" alt="HLPFL logo" width={32} height={32} className="w-8 h-8" />
          <span className="font-display text-2xl tracking-widest text-white">
            HLPFL<span className="text-gold">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-white/70 hover:text-white transition-colors tracking-wide inline-flex items-center gap-1.5"
            >
              {link.label}
              {link.badge && (
                <span className="text-[9px] font-bold uppercase tracking-wider text-void bg-gold px-1.5 py-0.5 leading-none">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/packages"
            className="hidden md:inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white text-sm font-semibold px-5 py-2.5 transition-colors"
          >
            Get Started
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-1"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-void-dark border-t border-void-border px-6 py-6 flex flex-col gap-5">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-2 text-base font-medium text-white/80 hover:text-gold transition-colors"
            >
              {link.label}
              {link.badge && (
                <span className="text-[9px] font-bold uppercase tracking-wider text-void bg-gold px-1.5 py-0.5 leading-none">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
          <Link
            href="/packages"
            onClick={() => setMobileOpen(false)}
            className="bg-gold hover:bg-gold-light text-white text-sm font-semibold px-5 py-3 text-center transition-colors mt-2"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  )
}
