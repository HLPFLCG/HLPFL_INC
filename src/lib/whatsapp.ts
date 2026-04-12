export const WHATSAPP_NUMBER = "50688888888"; // placeholder — replace with real number

export const WHATSAPP_MESSAGE_ES =
  "Hola HLPFL, quiero más información sobre sus servicios para mi negocio turístico.";

export function getWhatsAppUrl(message?: string): string {
  const text = message ?? WHATSAPP_MESSAGE_ES;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
