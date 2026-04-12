import Link from "next/link";
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const footerLinks = {
  explore: [
    { label: "Explore", labelEs: "Explorar", href: "/explore" },
    { label: "Stay", labelEs: "Alojamiento", href: "/stay" },
    { label: "Eat & Drink", labelEs: "Comer & Beber", href: "/eat-drink" },
    { label: "Plan Your Trip", labelEs: "Planifica tu Viaje", href: "/plan" },
  ],
  business: [
    { label: "List With Us", labelEs: "Regístrate", href: "/list-with-us" },
    { label: "About", labelEs: "Acerca de", href: "/about" },
    { label: "Privacy Policy", labelEs: "Privacidad", href: "/privacy" },
  ],
};

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/caribesur_cr" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/caribesur_cr" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com/caribesur_cr" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@caribesur_cr" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-jungle text-white">
      <div className="container-custom py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-display text-3xl font-bold text-sandy hover:text-turquoise-light transition-colors"
              aria-label="Caribe Sur CR — home"
            >
              Caribe Sur <span className="text-turquoise">CR</span>
            </Link>
            <p className="mt-4 text-white/70 max-w-sm leading-relaxed text-sm">
              Your guide to the wild southern Caribbean coast of Costa Rica —
              from Cahuita to Manzanillo. Explore, stay, taste, and discover
              the pura vida of Limón Province.
            </p>
            <p className="mt-2 text-white/50 text-sm italic">
              Tu guía de la costa Caribe sur de Costa Rica — de Cahuita a
              Manzanillo.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-6" aria-label="Social media links">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-turquoise hover:text-turquoise transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-sandy mb-4">
              Explore / Explorar
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-turquoise-light transition-colors text-sm"
                  >
                    {link.label}
                    <span className="text-white/30 mx-1">/</span>
                    <span className="text-white/50 text-xs">{link.labelEs}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-sandy mb-4">
              Business / Negocios
            </h4>
            <ul className="space-y-3">
              {footerLinks.business.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-turquoise-light transition-colors text-sm"
                  >
                    {link.label}
                    <span className="text-white/30 mx-1">/</span>
                    <span className="text-white/50 text-xs">{link.labelEs}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <p className="text-white/50 text-xs">
                Geographic scope: Manzanillo → Punta Uva → Puerto Viejo →
                Playa Cocles → Playa Negra → Cahuita, Limón Province, Costa Rica
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {currentYear} Caribe Sur CR. All rights reserved.
            </p>
            <p className="text-white/40 text-xs">
              Supporting sustainable, community-rooted tourism on Costa Rica&apos;s Caribbean coast.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
