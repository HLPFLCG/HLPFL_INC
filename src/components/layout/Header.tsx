'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/packages', label: 'Packages' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
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
        scrolled ? 'glass-dark' : 'glass'
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16" aria-label="Main navigation">

          {/* Logo */}
          <Link
            href="/"
            className="font-display text-2xl tracking-wider hover:opacity-80 transition-opacity"
          >
            HLPFL<span className="text-gold">.</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-sm font-medium tracking-wide uppercase hover:text-gold transition-colors text-white/80"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/packages"
              className="hidden md:block btn-primary text-xs"
            >
              Get Started
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 hover:text-gold transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-void-dark/90 backdrop-blur-sm md:hidden z-[55]"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-out panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-void-dark border-r border-gold/20 md:hidden z-[60]"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex flex-col h-full">
                {/* Panel header */}
                <div className="flex items-center justify-between px-6 h-16 border-b border-gold/20">
                  <span className="font-display text-xl tracking-wider">
                    HLPFL<span className="text-gold">.</span>
                  </span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 hover:text-gold transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Nav links */}
                <nav className="flex-1 py-6">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-6 py-3 text-base text-white/80 hover:text-gold hover:bg-gold/5 transition-all border-l-2 border-transparent hover:border-gold"
                      >
                        <span className="w-1.5 h-1.5 rounded-full border border-gold/50" />
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Panel footer */}
                <div className="p-6 border-t border-gold/20">
                  <Link
                    href="/packages"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary w-full text-center block"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
