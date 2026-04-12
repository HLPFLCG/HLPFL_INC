"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function WhatsAppSticky() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <>
      {/* Sticky floating button — mobile and desktop */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-sticky"
        aria-label="Chat with HLPFL on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>

      {/* Mobile-only sticky footer banner — [TRANSLATE] */}
      <div className="mobile-wa-banner">
        ¿Prefieres WhatsApp?{" "}
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          Escríbenos aquí →
        </a>
      </div>
    </>
  );
}
