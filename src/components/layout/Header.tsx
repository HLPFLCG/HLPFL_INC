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
    { href: "/", label: nav.home },
    { href: "/explore", label: nav.explore },
    { href: "/stay", label: nav.stay },
    { href: "/eat-drink", label: nav.eatDrink },
    { href: "/plan", label: nav.plan },
    { href: "/list-with-us", label: nav.listWithUs },
    { href: "/about", label: nav.about },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-dark text-white" : "glass text-dark"
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16" aria-label="Main navigation">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="Caribe Sur CR — home"
          >
            <span
              className={`font-display text-2xl font-bold ${
                isScrolled ? "text-sandy" : "text-jungle"
              }`}
            >
              Caribe Sur{" "}
              <span className="text-turquoise">CR</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-white/90 hover:text-turquoise-light"
                    : "text-dark hover:text-turquoise"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Toggle + Mobile Button */}
          <div className="flex items-center gap-3">
            <div className={isScrolled ? "[&_button]:text-white [&_button:not([aria-pressed=true])]:text-white/70 [&_span]:text-white/30" : ""}>
              <LanguageToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors ${
                isScrolled ? "text-white hover:text-turquoise-light" : "text-jungle hover:text-turquoise"
              }`}
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-jungle/80 backdrop-blur-sm lg:hidden z-[55]"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-out Menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-sandy-light border-r border-jungle/20 lg:hidden z-[60]"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-jungle/20">
                  <span className="font-display text-xl font-bold text-jungle">
                    Caribe Sur <span className="text-turquoise">CR</span>
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-jungle hover:text-turquoise transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Nav Links */}
                <nav className="flex-1 py-6" aria-label="Mobile navigation">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-6 py-3 text-base text-dark hover:text-turquoise hover:bg-turquoise/5 transition-all border-l-2 border-transparent hover:border-turquoise"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-jungle/20">
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
