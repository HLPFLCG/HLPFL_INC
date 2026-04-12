"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "50688888888";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola HLPFL, quiero más información sobre sus servicios para mi negocio turístico."
)}`;

export default function WhatsAppSticky() {
  return (
    <>
      {/* Sticky floating button — mobile and desktop */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-sticky"
        aria-label="Chat with HLPFL on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>

      {/* Mobile-only sticky footer banner */}
      <div className="mobile-wa-banner">
        ¿Prefieres WhatsApp?{" "}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          Escríbenos aquí →
        </a>
      </div>
    </>
  );
}
