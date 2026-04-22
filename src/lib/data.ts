// src/lib/data.ts
// HLPFL INC — Service Catalog v2.0
// Drop this into your existing data.ts, replacing the hospitality service definitions.
// All prices in USD. Stripe Payment Link URLs are placeholders — replace with your live links.

export type ServiceCategory =
  | "foundation"
  | "presence"
  | "commerce"
  | "growth"
  | "intelligence";

export type ContentPricing = {
  human: number;
  ai: number;
};

export type Service = {
  id: string;
  category: ServiceCategory;
  slug: string;
  icon: string; // Lucide icon name
  nameEn: string;
  nameEs: string;
  descEn: string;
  descEs: string;
  price: number | ContentPricing | "quote";
  priceNote?: string; // e.g. "+ domain" or "per connection"
  isRecurring?: boolean;
  stripeLink: string; // Replace with your Stripe Payment Links
  stripeLinkAI?: string; // Only for content services with AI variant
  stripeLinkVariants?: { labelEn: string; labelEs: string; price: number; link: string }[]; // Two-tier pricing (e.g. simple/complex)
  featured?: boolean;
  deliveryDays?: number;
};

export const services: Service[] = [
  // ─── FOUNDATION ───────────────────────────────────────────────────────────

  {
    id: "website-5page",
    category: "foundation",
    slug: "website",
    icon: "Globe",
    nameEn: "5-Page Website",
    nameEs: "Sitio Web de 5 Páginas",
    descEn:
      "A fast, clean, mobile-first website built by hand. No templates, no page builders, no AI. Includes Home, About, Services, Contact, and one custom page.",
    descEs:
      "Un sitio web rápido, limpio y mobile-first construido a mano. Sin plantillas, sin constructores de páginas, sin IA. Incluye Inicio, Acerca de, Servicios, Contacto y una página personalizada.",
    price: 49,
    priceNote: "+ domain (client pays ~$12–15/yr)",
    stripeLink: "https://buy.stripe.com/fZubJ0dFCeCAaCiboqbQY0b",
    featured: true,
    deliveryDays: 7,
  },
  {
    id: "extra-pages",
    category: "foundation",
    slug: "extra-pages",
    icon: "FilePlus",
    nameEn: "Extra Pages",
    nameEs: "Páginas Adicionales",
    descEn: "Need more than 5 pages? Each additional page is built to match your existing site.",
    descEs: "¿Necesitas más de 5 páginas? Cada página adicional se construye para coincidir con tu sitio existente.",
    price: 15,
    priceNote: "per page",
    stripeLink: "https://buy.stripe.com/6oU00ibxuamk7q6gIKbQY0c",
    deliveryDays: 2,
  },
  {
    id: "rush-delivery",
    category: "foundation",
    slug: "rush-delivery",
    icon: "Zap",
    nameEn: "Rush Delivery (48hr)",
    nameEs: "Entrega Express (48hr)",
    descEn: "Need it now? Add rush delivery to any service for guaranteed 48-hour turnaround.",
    descEs: "¿Lo necesitas ahora? Agrega entrega express a cualquier servicio para una garantía de entrega en 48 horas.",
    price: 29,
    priceNote: "add-on to any service",
    stripeLink: "https://buy.stripe.com/14AeVc9pmeCA25M1NQbQY0d",
  },
  {
    id: "hosting-setup",
    category: "foundation",
    slug: "hosting-setup",
    icon: "Server",
    nameEn: "Cloudflare Hosting Setup",
    nameEs: "Configuración de Hosting en Cloudflare",
    descEn:
      "Professional setup of your Cloudflare Pages hosting — DNS configuration, build pipeline, performance optimization, and security headers.",
    descEs:
      "Configuración profesional de tu hosting en Cloudflare Pages — configuración DNS, pipeline de construcción, optimización de rendimiento y cabeceras de seguridad.",
    price: 29,
    stripeLink: "https://buy.stripe.com/4gM4gyatqeCAbGmdwybQY0e",
    deliveryDays: 1,
  },
  {
    id: "logo-design",
    category: "foundation",
    slug: "logo-design",
    icon: "Pen",
    nameEn: "Logo Design",
    nameEs: "Diseño de Logotipo",
    descEn:
      "Professional logo design in Adobe Illustrator. Delivered in SVG, PNG, and PDF formats. 2 concepts, 2 revision rounds included.",
    descEs:
      "Diseño profesional de logotipo en Adobe Illustrator. Entregado en formatos SVG, PNG y PDF. 2 conceptos, 2 rondas de revisión incluidas.",
    price: 75,
    stripeLink: "https://buy.stripe.com/28E28qatqgKI5hYfEGbQY0f",
    deliveryDays: 5,
  },
  {
    id: "brand-kit",
    category: "foundation",
    slug: "brand-kit",
    icon: "Palette",
    nameEn: "Full Brand Kit",
    nameEs: "Kit de Marca Completo",
    descEn:
      "Logo + color palette + typography guide + usage rules. Everything you need to stay visually consistent across every platform.",
    descEs:
      "Logotipo + paleta de colores + guía tipográfica + reglas de uso. Todo lo que necesitas para mantenerte visualmente consistente en cada plataforma.",
    price: 149,
    stripeLink: "https://buy.stripe.com/8x24gycBy664fWC2RUbQY0g",
    featured: true,
    deliveryDays: 7,
  },
  {
    id: "email-signature",
    category: "foundation",
    slug: "email-signature",
    icon: "Mail",
    nameEn: "HTML Email Signature",
    nameEs: "Firma de Correo HTML",
    descEn:
      "Custom-designed HTML email signature with your logo, contact info, and social links. Works in Gmail, Outlook, Apple Mail.",
    descEs:
      "Firma de correo HTML diseñada a medida con tu logotipo, información de contacto y enlaces sociales. Funciona en Gmail, Outlook, Apple Mail.",
    price: 25,
    stripeLink: "https://buy.stripe.com/dRm7sK0SQeCAfWC2RUbQY0h",
    deliveryDays: 2,
  },
  {
    id: "business-card",
    category: "foundation",
    slug: "business-card-design",
    icon: "CreditCard",
    nameEn: "Business Card Design",
    nameEs: "Diseño de Tarjeta de Presentación",
    descEn:
      "Print-ready business card design in Illustrator. Delivered in PDF, PNG, and AI format. Ready to send to any printer.",
    descEs:
      "Diseño de tarjeta de presentación listo para imprimir en Illustrator. Entregado en formato PDF, PNG y AI. Listo para enviar a cualquier imprenta.",
    price: 35,
    stripeLink: "https://buy.stripe.com/bJeaEW8lidywdOu2RUbQY0i",
    deliveryDays: 3,
  },
  {
    id: "qr-code",
    category: "foundation",
    slug: "qr-code",
    icon: "QrCode",
    nameEn: "Branded QR Code",
    nameEs: "Código QR con Marca",
    descEn:
      "Custom branded QR code in SVG format. Can link to your website, menu, WhatsApp, Google Reviews, or any URL.",
    descEs:
      "Código QR personalizado con marca en formato SVG. Puede enlazar a tu sitio web, menú, WhatsApp, Google Reviews o cualquier URL.",
    price: 20,
    priceNote: "each / $49 for 3",
    stripeLink: "https://buy.stripe.com/6oUdR86dacush0GcsubQY0j",
    deliveryDays: 1,
  },
  {
    id: "nfc-setup",
    category: "foundation",
    slug: "nfc-tags",
    icon: "Wifi",
    nameEn: "NFC Tag Setup",
    nameEs: "Configuración de Etiquetas NFC",
    descEn:
      "Setup and programming of NFC tags for tap-to-link functionality. Physical tags sold separately (~$3–5/each). Great for menus, business cards, and storefronts.",
    descEs:
      "Configuración y programación de etiquetas NFC para funcionalidad de toque y enlace. Las etiquetas físicas se venden por separado (~$3–5/cada una).",
    price: 35,
    priceNote: "+ cost of physical tags",
    stripeLink: "https://buy.stripe.com/28E28qdFC3XW11I2RUbQY0k",
    deliveryDays: 2,
  },

  // ─── PRESENCE ─────────────────────────────────────────────────────────────

  {
    id: "gmb-setup",
    category: "presence",
    slug: "google-my-business",
    icon: "MapPin",
    nameEn: "Google My Business Setup",
    nameEs: "Configuración de Google My Business",
    descEn:
      "Full GMB profile setup and optimization — categories, photos, hours, services, Q&A, and initial review strategy.",
    descEs:
      "Configuración y optimización completa del perfil GMB — categorías, fotos, horarios, servicios, preguntas y respuestas, y estrategia inicial de reseñas.",
    price: 59,
    stripeLink: "https://buy.stripe.com/28E7sK9pm664bGmcsubQY0l",
    featured: true,
    deliveryDays: 2,
  },
  {
    id: "whatsapp-business",
    category: "presence",
    slug: "whatsapp-business",
    icon: "MessageCircle",
    nameEn: "WhatsApp Business Setup",
    nameEs: "Configuración de WhatsApp Business",
    descEn:
      "WhatsApp Business profile setup with catalog, quick replies, away messages, and business hours configured.",
    descEs:
      "Configuración del perfil de WhatsApp Business con catálogo, respuestas rápidas, mensajes de ausencia y horarios de negocio configurados.",
    price: 35,
    stripeLink: "https://buy.stripe.com/5kQfZg8licus9yegIKbQY0m",
    deliveryDays: 1,
  },
  {
    id: "gsuite-setup",
    category: "presence",
    slug: "google-workspace",
    icon: "Briefcase",
    nameEn: "Google Workspace (G-Suite) Setup",
    nameEs: "Configuración de Google Workspace (G-Suite)",
    descEn:
      "Set up your professional Google Workspace account — custom email domain, Google Drive, Calendar, Meet. Includes DNS configuration.",
    descEs:
      "Configura tu cuenta profesional de Google Workspace — dominio de correo personalizado, Google Drive, Calendar, Meet. Incluye configuración DNS.",
    price: 49,
    stripeLink: "https://buy.stripe.com/cNi00idFCfGEdOugIKbQY0n",
    deliveryDays: 2,
  },
  {
    id: "apple-maps",
    category: "presence",
    slug: "apple-maps",
    icon: "Compass",
    nameEn: "Apple Business Connect",
    nameEs: "Apple Business Connect",
    descEn: "Claim and optimize your Apple Maps listing so iPhone users can find you too.",
    descEs: "Reclama y optimiza tu listing en Apple Maps para que los usuarios de iPhone también puedan encontrarte.",
    price: 25,
    stripeLink: "https://buy.stripe.com/8x29AS6da0LKeSyboqbQY0o",
    deliveryDays: 2,
  },
  {
    id: "directory",
    category: "presence",
    slug: "directory-optimization",
    icon: "List",
    nameEn: "Directory Optimization",
    nameEs: "Optimización de Directorios",
    descEn:
      "Claim and optimize your listing on Yelp, TripAdvisor, or any other directory. Consistent info = better local SEO.",
    descEs:
      "Reclama y optimiza tu listing en Yelp, TripAdvisor o cualquier otro directorio. Información consistente = mejor SEO local.",
    price: 25,
    priceNote: "per platform",
    stripeLink: "https://buy.stripe.com/eVq9AScBy9ig7q6gIKbQY0p",
    deliveryDays: 2,
  },

  // ─── COMMERCE ─────────────────────────────────────────────────────────────

  {
    id: "shopify-basic",
    category: "commerce",
    slug: "shopify-basic",
    icon: "ShoppingBag",
    nameEn: "Shopify Store — Basic",
    nameEs: "Tienda Shopify — Básico",
    descEn:
      "Up to 20 products, theme setup, payment configuration, shipping settings, and domain connection.",
    descEs:
      "Hasta 20 productos, configuración de tema, configuración de pagos, ajustes de envío y conexión de dominio.",
    price: 149,
    stripeLink: "https://buy.stripe.com/4gMfZg6dacusaCi9gibQY0q",
    deliveryDays: 7,
  },
  {
    id: "shopify-full",
    category: "commerce",
    slug: "shopify-custom",
    icon: "Store",
    nameEn: "Shopify Store — Custom",
    nameEs: "Tienda Shopify — Personalizado",
    descEn:
      "Custom theme design, full product catalog, apps integration, and branded experience. Everything a serious store needs.",
    descEs:
      "Diseño de tema personalizado, catálogo de productos completo, integración de apps y experiencia con marca. Todo lo que una tienda seria necesita.",
    price: 249,
    stripeLink: "https://buy.stripe.com/00wcN48ligKI6m28cebQY0r",
    featured: true,
    deliveryDays: 14,
  },
  {
    id: "payment-integration",
    category: "commerce",
    slug: "payment-systems",
    icon: "CreditCard",
    nameEn: "Payment System Integration",
    nameEs: "Integración de Sistema de Pagos",
    descEn:
      "Stripe and/or PayPal integration on your existing site. Includes test mode setup, webhook configuration, and live checkout.",
    descEs:
      "Integración de Stripe y/o PayPal en tu sitio existente. Incluye configuración en modo de prueba, webhooks y checkout en vivo.",
    price: 59,
    stripeLink: "https://buy.stripe.com/28EdR86dacus4dUeACbQY05",
    deliveryDays: 3,
  },
  {
    id: "merch-store",
    category: "commerce",
    slug: "merch-store",
    icon: "Shirt",
    nameEn: "Merch Store Setup",
    nameEs: "Configuración de Tienda de Merch",
    descEn:
      "Print-on-demand store setup via Printful or Printify. Connected to your site or Shopify. No inventory required.",
    descEs:
      "Configuración de tienda de impresión bajo demanda a través de Printful o Printify. Conectada a tu sitio o Shopify. Sin inventario requerido.",
    price: 79,
    stripeLink: "https://buy.stripe.com/7sY6oG7he664eSyfEGbQY0s",
    deliveryDays: 5,
  },

  // ─── GROWTH ───────────────────────────────────────────────────────────────

  {
    id: "seo-audit",
    category: "growth",
    slug: "seo-audit",
    icon: "Search",
    nameEn: "SEO Audit Report",
    nameEs: "Informe de Auditoría SEO",
    descEn:
      "A full site audit covering technical SEO, on-page factors, local SEO, and a prioritized list of fixes. Delivered as a PDF report.",
    descEs:
      "Una auditoría completa del sitio que cubre SEO técnico, factores on-page, SEO local y una lista priorizada de correcciones. Entregado como informe PDF.",
    price: 79,
    stripeLink: "https://buy.stripe.com/8x23cueJGcusfWCgIKbQY01",
    deliveryDays: 5,
  },
  {
    id: "seo-setup",
    category: "growth",
    slug: "seo-setup",
    icon: "TrendingUp",
    nameEn: "On-Page SEO Setup",
    nameEs: "Configuración SEO On-Page",
    descEn:
      "Meta tags, schema markup, sitemap.xml, robots.txt, image alt text, heading structure, internal linking — all done properly.",
    descEs:
      "Meta tags, schema markup, sitemap.xml, robots.txt, texto alternativo de imágenes, estructura de encabezados, enlazado interno — todo hecho correctamente.",
    price: 99,
    stripeLink: "https://buy.stripe.com/6oU9ASatq2TS6m2akmbQY02",
    featured: true,
    deliveryDays: 4,
  },
  {
    id: "chatbot-basic",
    category: "growth",
    slug: "chatbot-basic",
    icon: "Bot",
    nameEn: "Chatbot — Basic FAQ",
    nameEs: "Chatbot — FAQ Básico",
    descEn:
      "A simple, lightweight chatbot that handles your most common questions. No subscription fees, no third-party platform lock-in.",
    descEs:
      "Un chatbot simple y ligero que maneja tus preguntas más comunes. Sin tarifas de suscripción, sin bloqueo de plataforma de terceros.",
    price: 99,
    stripeLink: "https://buy.stripe.com/aFaaEW1WU9igbGm0JMbQY03",
    deliveryDays: 5,
  },
  {
    id: "chatbot-custom",
    category: "growth",
    slug: "chatbot-custom",
    icon: "MessageSquare",
    nameEn: "Chatbot — Custom Flows",
    nameEs: "Chatbot — Flujos Personalizados",
    descEn:
      "Multi-step conversation flows, lead capture, appointment booking, and custom logic tailored to your business.",
    descEs:
      "Flujos de conversación de múltiples pasos, captura de prospectos, reserva de citas y lógica personalizada adaptada a tu negocio.",
    price: 149,
    stripeLink: "https://buy.stripe.com/6oU9AS0SQ1PO9ye3VYbQY04",
    deliveryDays: 7,
  },
  {
    id: "api-integration",
    category: "growth",
    slug: "api-integration",
    icon: "Plug",
    nameEn: "API Integration",
    nameEs: "Integración de API",
    descEn:
      "Connect your site to third-party services — booking systems, CRMs, inventory, loyalty platforms, and more.",
    descEs:
      "Conecta tu sitio a servicios de terceros — sistemas de reservas, CRMs, inventario, plataformas de lealtad y más.",
    price: Starting at 99,
    priceNote: "per connection ($99 for simple / $199 for complex)",
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_API",
    stripeLinkVariants: [
      {
        labelEn: "Simple — $99",
        labelEs: "Simple — $99",
        price: 99,
        link: "https://buy.stripe.com/PLACEHOLDER_API_SIMPLE",
      },
      {
        labelEn: "Complex — $199",
        labelEs: "Complejo — $199",
        price: 199,
        link: "https://buy.stripe.com/PLACEHOLDER_API_COMPLEX",
      },
    ],
    deliveryDays: 7,
  },
  {
    id: "security-basic",
    category: "growth",
    slug: "security-audit-basic",
    icon: "Shield",
    nameEn: "Privacy & Security Audit — Basic",
    nameEs: "Auditoría de Privacidad y Seguridad — Básico",
    descEn:
      "Review of SSL, headers, form handling, third-party scripts, and data exposure. Delivered as a report with action items.",
    descEs:
      "Revisión de SSL, cabeceras, manejo de formularios, scripts de terceros y exposición de datos. Entregado como informe con elementos de acción.",
    price: 49,
    stripeLink: "https://buy.stripe.com/00wdR8dFC66439Q0JMbQY06",
    deliveryDays: 3,
  },
  {
    id: "security-advanced",
    category: "growth",
    slug: "security-audit-advanced",
    icon: "ShieldCheck",
    nameEn: "Privacy & Security Audit — Advanced",
    nameEs: "Auditoría de Privacidad y Seguridad — Avanzado",
    descEn:
      "Everything in Basic + dependency audit, CSP configuration, firewall rules, and implementation of all fixes.",
    descEs:
      "Todo en Básico + auditoría de dependencias, configuración CSP, reglas de firewall e implementación de todas las correcciones.",
    price: 99,
    stripeLink: "https://buy.stripe.com/5kQcN4cBydyweSyfEGbQY07",
    deliveryDays: 5,
  },
  {
    id: "web-enhancement-l1",
    category: "growth",
    slug: "web-enhancement-l1",
    icon: "Gauge",
    nameEn: "Web Enhancement — Level 1",
    nameEs: "Mejora Web — Nivel 1",
    descEn:
      "Speed & Security: image optimization, caching headers, security hardening, Core Web Vitals improvements.",
    descEs:
      "Velocidad y Seguridad: optimización de imágenes, cabeceras de caché, fortalecimiento de seguridad, mejoras de Core Web Vitals.",
    price: 29,
    stripeLink: "https://buy.stripe.com/00w8wO1WUamkeSyakmbQY08",
    deliveryDays: 2,
  },
  {
    id: "web-enhancement-l2",
    category: "growth",
    slug: "web-enhancement-l2",
    icon: "BarChart2",
    nameEn: "Web Enhancement — Level 2",
    nameEs: "Mejora Web — Nivel 2",
    descEn:
      "SEO & Visibility: schema markup, sitemap, robots.txt, privacy-respecting analytics, structured data for rich results.",
    descEs:
      "SEO y Visibilidad: schema markup, sitemap, robots.txt, analíticas que respetan la privacidad, datos estructurados para resultados enriquecidos.",
    price: 59,
    stripeLink: "https://buy.stripe.com/00wdR830Y9igcKq78abQY09",
    deliveryDays: 3,
  },
  {
    id: "web-enhancement-l3",
    category: "growth",
    slug: "web-enhancement-l3",
    icon: "Sparkles",
    nameEn: "Web Enhancement — Level 3",
    nameEs: "Mejora Web — Nivel 3",
    descEn:
      "Features & Flair: animations, custom JS interactions, third-party integrations, advanced UX. Quoted per project.",
    descEs:
      "Funciones y Estilo: animaciones, interacciones JS personalizadas, integraciones de terceros, UX avanzada. Cotizado por proyecto.",
    price: 99,
    priceNote: "starting at",
    stripeLink: "https://buy.stripe.com/6oUdR87he1POh0G8cebQY0a",
    deliveryDays: 7,
  },

  // ─── BUSINESS INTELLIGENCE ────────────────────────────────────────────────

  {
    id: "business-analysis",
    category: "intelligence",
    slug: "business-analysis",
    icon: "BarChart",
    nameEn: "Business Analysis Session",
    nameEs: "Sesión de Análisis de Negocio",
    descEn:
      "1-hour session to diagnose gaps in your digital presence, identify quick wins, and build a prioritized action plan.",
    descEs:
      "Sesión de 1 hora para diagnosticar brechas en tu presencia digital, identificar victorias rápidas y construir un plan de acción priorizado.",
    price: 75,
    priceNote: "1 hour",
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_ANALYSIS",
    deliveryDays: 1,
  },
  {
    id: "consulting-hourly",
    category: "intelligence",
    slug: "consulting",
    icon: "Users",
    nameEn: "Consulting — Hourly",
    nameEs: "Consultoría — Por Hora",
    descEn:
      "7 years of entrepreneurship, zero fluff. Pick a problem, bring it to a session, leave with a real solution.",
    descEs:
      "7 años de emprendimiento, cero relleno. Elige un problema, tráelo a una sesión, sal con una solución real.",
    price: 99,
    priceNote: "per hour",
    stripeLink: "https://buy.stripe.com/7sY5kCcByamk4dUcsubQY0u",
  },
];

// ─── RETAINERS ────────────────────────────────────────────────────────────────

export type Retainer = {
  id: string;
  nameEn: string;
  nameEs: string;
  price: number;
  descEn: string;
  descEs: string;
  includes: string[];
  includesEs: string[];
  stripeLink: string;
  featured?: boolean;
};

export const retainers: Retainer[] = [
  {
    id: "retainer-starter",
    nameEn: "Starter Retainer",
    nameEs: "Retención Inicial",
    price: 25,
    descEn: "Keep your site current without lifting a finger.",
    descEs: "Mantén tu sitio actualizado sin mover un dedo.",
    includes: [
      "Up to 2 hours of updates/month",
      "Text and image changes",
      "Minor bug fixes",
      "Priority email response",
    ],
    includesEs: [
      "Hasta 2 horas de actualizaciones/mes",
      "Cambios de texto e imágenes",
      "Correcciones menores de errores",
      "Respuesta prioritaria por email",
    ],
    stripeLink: "https://buy.stripe.com/8x2cN4452gKI5hY0JMbQY0z",
  },
  {
    id: "retainer-growth",
    nameEn: "Growth Retainer",
    nameEs: "Retención de Crecimiento",
    price: 75,
    descEn: "Updates plus consistent digital presence.",
    descEs: "Actualizaciones más presencia digital constante.",
    includes: [
      "Up to 4 hours of updates/month",
      "Content strategy & direction",
      "Priority response",
    ],
    includesEs: [
      "Hasta 4 horas de actualizaciones/mes",
      "Estrategia y dirección de contenido",
      "Respuesta prioritaria",
    ],
    stripeLink: "https://buy.stripe.com/eVqbJ07he8ecdOu3VYbQY0A",
    featured: true,
  },
  {
    id: "retainer-partner",
    nameEn: "Partner Retainer",
    nameEs: "Retención de Socio",
    price: 149,
    descEn: "Full digital management for serious businesses.",
    descEs: "Gestión digital completa para negocios serios.",
    includes: [
      "Up to 8 hours of updates/month",
      "Monthly performance report",
      "1 hour consulting session/month",
      "Priority everything",
    ],
    includesEs: [
      "Hasta 8 horas de actualizaciones/mes",
      "Informe de rendimiento mensual",
      "1 hora de sesión de consultoría/mes",
      "Prioridad en todo",
    ],
    stripeLink: "https://buy.stripe.com/3cI4gy452664bGm8cebQY0B",
  },
];

// ─── PACKAGES ─────────────────────────────────────────────────────────────────

export type Package = {
  id: string;
  nameEn: string;
  nameEs: string;
  price: number;
  savingsVsALaCarte: number;
  tagEn: string;
  tagEs: string;
  descEn: string;
  descEs: string;
  includes: string[];
  includesEs: string[];
  retainer?: Retainer;
  stripeLink: string;
  featured?: boolean;
  emoji: string;
};

export const packages: Package[] = [
  {
    id: "pkg-get-online",
    nameEn: "Get Online",
    nameEs: "Ponerse en Línea",
    price: 79,
    savingsVsALaCarte: 24,
    tagEn: "I have nothing. I need something.",
    tagEs: "No tengo nada. Necesito algo.",
    descEn: "Everything you need to exist online. Done fast, done right.",
    descEs: "Todo lo que necesitas para existir en línea. Hecho rápido, hecho bien.",
    includes: [
      "5-Page Website",
      "Cloudflare Hosting Setup",
      "1 Branded QR Code",
      "Google My Business Setup",
      "WhatsApp Business Setup",
    ],
    includesEs: [
      "Sitio Web de 5 Páginas",
      "Configuración de Hosting en Cloudflare",
      "1 Código QR con Marca",
      "Configuración de Google My Business",
      "Configuración de WhatsApp Business",
    ],
    stripeLink: "https://buy.stripe.com/14AbJ030YgKI11IeACbQY0v",
    emoji: "🔥",
  },
  {
    id: "pkg-local-pro",
    nameEn: "Local Pro",
    nameEs: "Pro Local",
    price: 199,
    savingsVsALaCarte: 78,
    tagEn: "I have a business. I need a presence.",
    tagEs: "Tengo un negocio. Necesito presencia.",
    descEn: "A complete local presence — online, branded, and optimized.",
    descEs: "Una presencia local completa — en línea, con marca y optimizada.",
    includes: [
      "Everything in Get Online",
      "Logo Design",
      "HTML Email Signature",
      "Google Workspace (G-Suite) Setup",
      "SEO Audit Report",
      "First month of Starter Retainer ($25)",
    ],
    includesEs: [
      "Todo en Ponerse en Línea",
      "Diseño de Logotipo",
      "Firma de Correo HTML",
      "Configuración de Google Workspace",
      "Informe de Auditoría SEO",
      "Primer mes de Retención Inicial ($25)",
    ],
    stripeLink: "https://buy.stripe.com/14A7sK8li2TS8uaakmbQY0w",
    emoji: "🚀",
    featured: true,
  },
  {
    id: "pkg-digital-storefront",
    nameEn: "Digital Storefront",
    nameEs: "Tienda Digital",
    price: 299,
    savingsVsALaCarte: 87,
    tagEn: "I need to sell online.",
    tagEs: "Necesito vender en línea.",
    descEn: "Website + store + payments + search visibility. All of it.",
    descEs: "Sitio web + tienda + pagos + visibilidad en búsquedas. Todo.",
    includes: [
      "5-Page Website",
      "Shopify Store (Basic)",
      "Stripe Payment Integration",
      "On-Page SEO Setup",
      "Chatbot (Basic FAQ)",
      "First month of Growth Retainer ($75)",
    ],
    includesEs: [
      "Sitio Web de 5 Páginas",
      "Tienda Shopify (Básico)",
      "Integración de Stripe",
      "Configuración SEO On-Page",
      "Chatbot (FAQ Básico)",
      "Primer mes de Retención de Crecimiento ($75)",
    ],
    stripeLink: "https://buy.stripe.com/28EaEW5969igcKq0JMbQY0x",
    emoji: "🛒",
  },
  {
    id: "pkg-full-brand",
    nameEn: "Full Brand",
    nameEs: "Marca Completa",
    price: 499,
    savingsVsALaCarte: 150,
    tagEn: "I want everything done right, once.",
    tagEs: "Quiero que todo se haga bien, una vez.",
    descEn: "The complete package for a business that means business.",
    descEs: "El paquete completo para un negocio que va en serio.",
    includes: [
      "Everything in Digital Storefront",
      "Full Brand Kit (logo + colors + fonts)",
      "Privacy & Security Audit (Basic)",
      "Business Analysis Session (1hr)",
      "First month of Partner Retainer ($149)",
    ],
    includesEs: [
      "Todo en Tienda Digital",
      "Kit de Marca Completo (logo + colores + fuentes)",
      "Auditoría de Privacidad y Seguridad (Básico)",
      "Sesión de Análisis de Negocio (1hr)",
      "Primer mes de Retención de Socio ($149)",
    ],
    stripeLink: "https://buy.stripe.com/aFa00i8li3XWdOugIKbQY0y",
    emoji: "💼",
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export const categoryLabels: Record<
  ServiceCategory,
  { en: string; es: string; icon: string }
> = {
  foundation: { en: "Foundation", es: "Fundación", icon: "Layers" },
  presence: { en: "Presence", es: "Presencia", icon: "MapPin" },
  commerce: { en: "Commerce", es: "Comercio", icon: "ShoppingBag" },
  growth: { en: "Growth", es: "Crecimiento", icon: "TrendingUp" },
  intelligence: {
    en: "Business Intelligence",
    es: "Inteligencia de Negocios",
    icon: "BarChart",
  },
};

export const isContentPricing = (
  price: number | ContentPricing | "quote"
): price is ContentPricing =>
  typeof price === "object" && "human" in price && "ai" in price;

export const getServicePrice = (
  service: Service,
  useAI: boolean
): number | "quote" => {
  if (service.price === "quote") return "quote";
  if (isContentPricing(service.price)) {
    return useAI ? service.price.ai : service.price.human;
  }
  return service.price;
};

export const getStripeLink = (service: Service, useAI: boolean): string => {
  if (isContentPricing(service.price) && useAI && service.stripeLinkAI) {
    return service.stripeLinkAI;
  }
  return service.stripeLink;
};
