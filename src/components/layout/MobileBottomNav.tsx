"use client";

import Link from "next/link";
import { Home, Briefcase, Mail, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function MobileBottomNav() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <nav
      className="mobile-bottom-nav"
      aria-label="Mobile navigation"
    >
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="mobile-bottom-nav-item"
        >
          <Icon className="w-5 h-5" />
          <span className="text-[10px] tracking-wider">{label}</span>
        </Link>
      ))}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-bottom-nav-item text-[#25D366]"
        aria-label="Chat with HLPFL on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-[10px] tracking-wider">WhatsApp</span>
      </a>
    </nav>
  );
}
