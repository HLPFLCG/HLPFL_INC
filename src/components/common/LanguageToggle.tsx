"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  const toggle = (newLang: Lang) => {
    setLang(newLang);
  };

  return (
    <div className="flex items-center gap-1 text-sm font-medium" role="group" aria-label="Language selection">
      <button
        onClick={() => toggle("en")}
        aria-pressed={lang === "en"}
        className={`px-2 py-1 rounded transition-colors ${
          lang === "en"
            ? "bg-turquoise text-white"
            : "text-jungle hover:text-turquoise"
        }`}
      >
        EN
      </button>
      <span className="text-gray-400 select-none">|</span>
      <button
        onClick={() => toggle("es")}
        aria-pressed={lang === "es"}
        className={`px-2 py-1 rounded transition-colors ${
          lang === "es"
            ? "bg-turquoise text-white"
            : "text-jungle hover:text-turquoise"
        }`}
      >
        ES
      </button>
    </div>
  );
}
