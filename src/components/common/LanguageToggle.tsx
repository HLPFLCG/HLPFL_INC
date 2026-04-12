"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`text-xs tracking-wider px-2 py-1 transition-colors ${
          lang === "en" ? "text-gold font-semibold" : "text-white/50 hover:text-white/80"
        }`}
      >
        EN
      </button>
      <span className="text-white/20 text-xs">/</span>
      <button
        onClick={() => setLang("es")}
        aria-pressed={lang === "es"}
        className={`text-xs tracking-wider px-2 py-1 transition-colors ${
          lang === "es" ? "text-gold font-semibold" : "text-white/50 hover:text-white/80"
        }`}
      >
        ES
      </button>
    </div>
  );
}
