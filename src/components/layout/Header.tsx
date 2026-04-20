"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LanguageToggle from "@/components/common/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const nav = t("nav");

  const navLinks = [
    { href: "/services", label: nav.services },
    { href: "/packages", label: nav.packages },
    { href: "/about", label: nav.about },
    { href: "/testimonials", label: nav.testimonials },
    { href: "/faq", label: nav.faq },
    { href: "/contact", label: nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-dark" : ""
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity" aria-label="HLPFL — home">
            <span className="font-display text-2xl tracking-widest text-cream">HLPFL</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold mb-0.5" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-sm text-cream/75 hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <Link href="/services" className="hidden md:inline-block btn-primary text-sm py-2 px-4">
              {nav.getStarted}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gold hover:text-gold transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-void/80 backdrop-blur-sm lg:hidden z-[55]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-void border-r border-gold/15 lg:hidden z-[60]"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gold/15">
                  <span className="font-display text-xl tracking-widest text-cream">
                    HLPFL<span className="inline-block w-1.5 h-1.5 rounded-full bg-gold ml-0.5 mb-0.5" />
                  </span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-cream hover:text-gold" aria-label="Close menu">
                    <X size={20} />
                  </button>
                </div>
                <nav className="flex-1 py-6" aria-label="Mobile navigation">
                  {navLinks.map((link, index) => (
                    <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-6 py-3 text-base text-cream/75 hover:text-gold hover:bg-gold/5 transition-all border-l-2 border-transparent hover:border-gold"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <div className="p-6 border-t border-gold/15">
                  <LanguageToggle />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
