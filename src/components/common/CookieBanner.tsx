"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CookieBanner() {
  const { t } = useLanguage();
  const cookieStrings = t("cookie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-jungle text-white p-4 shadow-2xl"
    >
      <div className="container-custom flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="flex-1 text-sm leading-relaxed">
          {cookieStrings.message}{" "}
          <Link
            href="/privacy"
            className="underline hover:text-sandy transition-colors"
          >
            {cookieStrings.learnMore}
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium border border-white/40 rounded-md hover:bg-white/10 transition-colors"
          >
            {cookieStrings.decline}
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-medium bg-turquoise rounded-md hover:bg-turquoise-dark transition-colors"
          >
            {cookieStrings.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
