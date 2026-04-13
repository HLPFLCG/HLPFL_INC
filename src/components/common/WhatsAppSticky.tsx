"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhatsAppSticky() {
  const whatsappUrl = getWhatsAppUrl();
  const { lang } = useLanguage();

  return (
    <>
      {/* Sticky floating button — mobile and desktop */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-sticky"
        aria-label={lang === "es" ? "Chatea con HLPFL en WhatsApp" : "Chat with HLPFL on WhatsApp"}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline whatsapp-sticky-label">
          {lang === "es" ? "Escríbenos" : "WhatsApp Us"}
        </span>
      </a>

      {/* Mobile-only sticky footer banner */}
      <div className="mobile-wa-banner">
        {lang === "es" ? "¿Prefieres WhatsApp?" : "Prefer WhatsApp?"}{" "}
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          {lang === "es" ? "Escríbenos aquí →" : "Message us here →"}
        </a>
      </div>
    </>
  );
}
