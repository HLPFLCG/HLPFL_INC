"use client";

import Link from "next/link";
import { Briefcase, Package, Users, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MobileBottomNav() {
  const { t } = useLanguage();
  const nav = t("nav");

  const navItems = [
    { href: "/services", label: nav.services, icon: Briefcase },
    { href: "/packages", label: nav.packages, icon: Package },
    { href: "/about", label: nav.about, icon: Users },
    { href: "/contact", label: nav.contact, icon: Mail },
  ];

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
    </nav>
  );
}
