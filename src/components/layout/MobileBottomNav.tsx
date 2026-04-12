"use client";

import Link from "next/link";
import { Home, Briefcase, Mail, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "50688888888";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola HLPFL, quiero más información sobre sus servicios para mi negocio turístico."
)}`;

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function MobileBottomNav() {
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
        href={WHATSAPP_URL}
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
