import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/caribesur_cr" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/caribesur_cr" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com/caribesur_cr" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@caribesur_cr" },
];

export default function SocialLinks() {
  return (
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
  );
}
