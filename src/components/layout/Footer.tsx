import Link from "next/link";
import {
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
} from "lucide-react";

const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Community", href: "/community" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ],
  creatives: [
    { label: "Get Started", href: "/portal" },
    { label: "Store", href: "/store" },
    { label: "Resources", href: "/resources" },
    { label: "Support", href: "/support" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/hlpfl", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/hlpfl", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@hlpfl", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com/company/hlpfl", label: "LinkedIn" },
  { icon: Mail, href: "mailto:contact@hlpfl.org", label: "Email" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-void-light border-t border-gold/10">
      <div className="container-custom py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-display text-3xl tracking-wider hover:text-gold transition-colors"
            >
              HLPFL<span className="text-gold">.</span>
            </Link>
            <p className="mt-4 text-gray-400 max-w-sm leading-relaxed">
              Empowering creative entrepreneurs with tools, resources, and
              community. No contracts, no exploitation—just genuine support for
              your creative journey.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-gold/30 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-lg tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Creatives Links */}
          <div>
            <h4 className="font-display text-lg tracking-wider mb-4">
              Creatives
            </h4>
            <ul className="space-y-3">
              {footerLinks.creatives.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-display text-lg tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gold/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} HLPFL INC. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              No VCs<span className="text-gold mx-2">•</span>
              No Exploitation<span className="text-gold mx-2">•</span>
              No Bullshit
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
