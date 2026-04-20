"use client";

import Link from "next/link";
import { Instagram, Facebook, Youtube, Twitter, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const navHrefs = ["/services", "/packages", "/about", "/faq", "/contact"];
const legalHrefs = ["/privacy", "/terms"];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/hlpfl" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/hlpfl" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com/hlpfl" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@hlpfl" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const footer = t("footer");
  const whatsappUrl = getWhatsAppUrl();

  return (
    <footer className="bg-night border-t border-wave/20 text-sand">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity" aria-label="HLPFL — home">
              <span className="font-display text-3xl tracking-widest text-sand">HLPFL</span>
              <span className="w-2 h-2 rounded-full bg-gold ml-0.5" />
            </Link>
            <p className="mt-4 text-sand/75 max-w-sm leading-relaxed text-sm">
              {footer.tagline}
            </p>
            <p className="mt-2 text-bark text-sm italic">
              {footer.mission}
            </p>
            <div className="flex gap-4 mt-6" aria-label="Social media links">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 border border-wave/20 flex items-center justify-center hover:border-wave hover:text-wave transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-lg tracking-wider text-gold mb-4">HLPFL</h4>
            <ul className="space-y-3">
              {footer.nav.map((label, i) => (
                <li key={navHrefs[i]}>
                  <Link href={navHrefs[i]} className="text-wave hover:text-gold transition-colors text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & WhatsApp */}
          <div>
            <h4 className="font-display text-lg tracking-wider text-gold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footer.legal.map((label, i) => (
                <li key={legalHrefs[i]}>
                  <Link href={legalHrefs[i]} className="text-wave hover:text-gold transition-colors text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-wa hover:text-wa/80 transition-colors text-sm"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-wave/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-bark text-sm">© {currentYear} {footer.copyright}</p>
            <p className="text-fog text-xs">{footer.builtNote}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
