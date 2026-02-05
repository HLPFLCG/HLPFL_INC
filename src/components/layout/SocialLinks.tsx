"use client";

import { MagneticHover } from "@/components/animations";
import { Twitter, Instagram, Youtube, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/hlpfl", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/hlpfl", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@hlpfl", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com/company/hlpfl", label: "LinkedIn" },
  { icon: Mail, href: "mailto:contact@hlpfl.org", label: "Email" },
];

export default function SocialLinks() {
  return (
    <div className="flex gap-4 mt-6">
      {socialLinks.map((social) => (
        <MagneticHover key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-gold/30 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all"
            aria-label={social.label}
          >
            <social.icon size={18} />
          </a>
        </MagneticHover>
      ))}
    </div>
  );
}
