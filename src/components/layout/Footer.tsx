import Link from "next/link";
import { Instagram, Facebook, Youtube, Twitter, MessageCircle } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Digital Marketing", href: "/services#digital-marketing" },
    { label: "Online Booking", href: "/services#booking" },
    { label: "Visual Identity", href: "/services#branding" },
    { label: "Professional Website", href: "/services#website" },
    { label: "Business Strategy", href: "/services#strategy" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/hlpfl" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/hlpfl" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com/hlpfl" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@hlpfl" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-void-light border-t border-void-lighter text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity" aria-label="HLPFL — home">
              <span className="font-display text-3xl tracking-widest text-white">HLPFL</span>
              <span className="w-2 h-2 rounded-full bg-gold ml-0.5" />
            </Link>
            <p className="mt-4 text-white/60 max-w-sm leading-relaxed text-sm">
              B2B consulting for hotels, eco-lodges, restaurants, and tour operators in the Cahuita → Puerto Viejo → Manzanillo corridor. Chaos → Clarity.
            </p>
            <p className="mt-2 text-white/40 text-sm italic">
              Consultoría para hoteles, lodges, restaurantes y operadores de tours en la costa Caribe de Costa Rica.
            </p>
            <div className="flex gap-4 mt-6" aria-label="Social media links">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 border border-void-lighter flex items-center justify-center hover:border-gold/50 hover:text-gold transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg tracking-wider text-gold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-lg tracking-wider text-gold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-gold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <a
                href="https://wa.me/50688888888"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#25D366] hover:text-[#1da851] transition-colors text-sm"
              >
                <MessageCircle size={16} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-void-lighter">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">© {currentYear} HLPFL. All rights reserved.</p>
            <p className="text-white/30 text-xs">Serving the Cahuita → Puerto Viejo → Manzanillo corridor, Limón Province, Costa Rica.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
