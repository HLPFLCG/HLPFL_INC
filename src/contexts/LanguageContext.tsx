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

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (initialLang) return initialLang;
    if (typeof window === "undefined") return "en";
    const stored = localStorage.getItem("hlpfl-lang");
    if (stored === "en" || stored === "es") return stored;
    const preferSpanish =
      typeof navigator !== "undefined" &&
      (navigator.language?.startsWith("es") ||
        Intl.DateTimeFormat().resolvedOptions().timeZone === "America/Costa_Rica");
    return preferSpanish ? "es" : "en";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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
