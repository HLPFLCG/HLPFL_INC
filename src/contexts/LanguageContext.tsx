"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { translations, type Lang } from "@/lib/translations";

type TranslationKey = keyof typeof translations;

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: <S extends TranslationKey>(
    section: S
  ) => (typeof translations)[S]["en"];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("hlpfl-lang");
    if (stored === "en" || stored === "es") {
      setLangState(stored);
      document.documentElement.lang = stored;
    } else {
      const preferSpanish =
        typeof navigator !== "undefined" &&
        (navigator.language?.startsWith("es") ||
          Intl.DateTimeFormat().resolvedOptions().timeZone === "America/Costa_Rica");
      const detectedLang: Lang = preferSpanish ? "es" : "en";
      setLangState(detectedLang);
      document.documentElement.lang = detectedLang;
    }
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("hlpfl-lang", newLang);
    document.documentElement.lang = newLang;
  }, []);

  const t = useCallback(
    <S extends TranslationKey>(section: S) => {
      return translations[section][lang] as (typeof translations)[S]["en"];
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
