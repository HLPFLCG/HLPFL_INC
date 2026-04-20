// src/lib/data.ts
// HLPFL INC — Service Catalog v2.0
// Drop this into your existing data.ts, replacing the hospitality service definitions.
// All prices in USD. Stripe Payment Link URLs are placeholders — replace with your live links.

export type ServiceCategory =
  | "foundation"
  | "presence"
  | "commerce"
  | "growth"
  | "content"
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_WEBSITE",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_EXTRA_PAGE",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_RUSH",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_HOSTING",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_LOGO",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_BRAND_KIT",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_EMAIL_SIG",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_BIZ_CARD",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_QR",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_NFC",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_GMB",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_WHATSAPP",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_GSUITE",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_APPLE",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_DIRECTORY",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_SHOPIFY_BASIC",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_SHOPIFY_FULL",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_PAYMENTS",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_MERCH",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_SEO_AUDIT",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_SEO_SETUP",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_CHATBOT_BASIC",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_CHATBOT_CUSTOM",
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
    price: 149,
    priceNote: "per connection ($99 for simple / $199 for complex)",
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_API",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_SECURITY_BASIC",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_SECURITY_ADV",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_WEB_L1",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_WEB_L2",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_WEB_L3",
    deliveryDays: 7,
  },

  // ─── CONTENT (AI toggle applies) ──────────────────────────────────────────

  {
    id: "social-4posts",
    category: "content",
    slug: "social-4-posts",
    icon: "Instagram",
    nameEn: "Social Media — 4 Posts",
    nameEs: "Redes Sociales — 4 Publicaciones",
    descEn:
      "4 custom posts (caption + image concept) for Instagram, Facebook, or both. Designed for your brand and voice.",
    descEs:
      "4 publicaciones personalizadas (pie de foto + concepto de imagen) para Instagram, Facebook o ambos. Diseñadas para tu marca y voz.",
    price: { human: 49, ai: 25 },
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_SOCIAL4_HUMAN",
    stripeLinkAI: "https://buy.stripe.com/PLACEHOLDER_SOCIAL4_AI",
    deliveryDays: 3,
  },
  {
    id: "social-8posts-mo",
    category: "content",
    slug: "social-8-posts-monthly",
    icon: "Calendar",
    nameEn: "Social Media — 8 Posts/Mo",
    nameEs: "Redes Sociales — 8 Publicaciones/Mes",
    descEn:
      "Monthly content package: 8 posts, 2 per week. Includes caption writing, image direction, and scheduling recommendations.",
    descEs:
      "Paquete de contenido mensual: 8 publicaciones, 2 por semana. Incluye redacción de pies de foto, dirección de imagen y recomendaciones de programación.",
    price: { human: 85, ai: 45 },
    isRecurring: true,
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_SOCIAL8_HUMAN",
    stripeLinkAI: "https://buy.stripe.com/PLACEHOLDER_SOCIAL8_AI",
    deliveryDays: 5,
  },
  {
    id: "social-16posts-mo",
    category: "content",
    slug: "social-16-posts-monthly",
    icon: "Layers",
    nameEn: "Social Media — 16 Posts/Mo",
    nameEs: "Redes Sociales — 16 Publicaciones/Mes",
    descEn:
      "Daily presence: 16 posts per month (4/week). Best for businesses that want to stay consistently visible on social.",
    descEs:
      "Presencia diaria: 16 publicaciones por mes (4/semana). Ideal para negocios que quieren mantenerse consistentemente visibles en redes sociales.",
    price: { human: 150, ai: 79 },
    isRecurring: true,
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_SOCIAL16_HUMAN",
    stripeLinkAI: "https://buy.stripe.com/PLACEHOLDER_SOCIAL16_AI",
    deliveryDays: 7,
    featured: true,
  },
  {
    id: "blog-post",
    category: "content",
    slug: "blog-post",
    icon: "FileText",
    nameEn: "Blog Post (500–700 words)",
    nameEs: "Entrada de Blog (500–700 palabras)",
    descEn:
      "SEO-optimized blog post written in your voice. Topic research included. Delivered in your preferred format (HTML, MD, or Google Doc).",
    descEs:
      "Entrada de blog optimizada para SEO escrita en tu voz. Incluye investigación de tema. Entregado en tu formato preferido (HTML, MD o Google Doc).",
    price: { human: 65, ai: 35 },
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_BLOG_HUMAN",
    stripeLinkAI: "https://buy.stripe.com/PLACEHOLDER_BLOG_AI",
    deliveryDays: 3,
  },
  {
    id: "email-newsletter",
    category: "content",
    slug: "email-newsletter",
    icon: "Send",
    nameEn: "Email Newsletter",
    nameEs: "Newsletter por Email",
    descEn:
      "Custom email newsletter written and designed for your brand. Delivered in HTML format compatible with Mailchimp, Klaviyo, or any platform.",
    descEs:
      "Newsletter personalizado escrito y diseñado para tu marca. Entregado en formato HTML compatible con Mailchimp, Klaviyo o cualquier plataforma.",
    price: { human: 55, ai: 29 },
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_EMAIL_HUMAN",
    stripeLinkAI: "https://buy.stripe.com/PLACEHOLDER_EMAIL_AI",
    deliveryDays: 3,
  },
  {
    id: "product-descriptions",
    category: "content",
    slug: "product-descriptions",
    icon: "Tag",
    nameEn: "Product Descriptions (5 items)",
    nameEs: "Descripciones de Producto (5 artículos)",
    descEn:
      "Conversion-focused product descriptions for your store. Written to sell, not just describe.",
    descEs:
      "Descripciones de productos enfocadas en conversión para tu tienda. Escritas para vender, no solo describir.",
    price: { human: 45, ai: 25 },
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_PROD_DESC_HUMAN",
    stripeLinkAI: "https://buy.stripe.com/PLACEHOLDER_PROD_DESC_AI",
    deliveryDays: 2,
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
    price: 75,
    priceNote: "per hour",
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_CONSULTING",
  },
  {
    id: "custom-quote",
    category: "intelligence",
    slug: "custom-quote",
    icon: "FileQuestion",
    nameEn: "Custom Quote",
    nameEs: "Cotización Personalizada",
    descEn:
      "Have a project that doesn't fit a preset service? Describe what you need and you'll get a quote within 24 hours.",
    descEs:
      "¿Tienes un proyecto que no encaja en un servicio predefinido? Describe lo que necesitas y recibirás una cotización en 24 horas.",
    price: "quote",
    stripeLink: "/contact",
  },
  {
    id: "photography",
    category: "intelligence",
    slug: "photography",
    icon: "Camera",
    nameEn: "Photography",
    nameEs: "Fotografía",
    descEn:
      "Product, brand, or event photography. Pricing based on session type, location, and deliverables. Contact for a quote.",
    descEs:
      "Fotografía de productos, marca o eventos. Precio según tipo de sesión, ubicación y entregables. Contacta para cotizar.",
    price: "quote",
    stripeLink: "/contact",
  },
  {
    id: "video",
    category: "intelligence",
    slug: "video",
    icon: "Video",
    nameEn: "Video Production / Editing",
    nameEs: "Producción / Edición de Video",
    descEn:
      "Reels, promos, or testimonial videos. Editing-only starts at $99 (you provide footage). Full production quoted per project.",
    descEs:
      "Reels, promos o videos de testimonios. Solo edición desde $99 (tú proporcionas el material). Producción completa cotizada por proyecto.",
    price: "quote",
    priceNote: "editing from $99",
    stripeLink: "/contact",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_RETAINER_25",
  },
  {
    id: "retainer-growth",
    nameEn: "Growth Retainer",
    nameEs: "Retención de Crecimiento",
    price: 75,
    descEn: "Updates plus consistent social media presence.",
    descEs: "Actualizaciones más presencia constante en redes sociales.",
    includes: [
      "Up to 4 hours of updates/month",
      "8 social media posts/month",
      "AI-assisted content (Human upgrade available)",
      "Priority response",
    ],
    includesEs: [
      "Hasta 4 horas de actualizaciones/mes",
      "8 publicaciones en redes sociales/mes",
      "Contenido asistido por IA (actualización a Humano disponible)",
      "Respuesta prioritaria",
    ],
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_RETAINER_75",
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
      "16 social media posts/month",
      "Monthly performance report",
      "1 hour consulting session/month",
      "Priority everything",
    ],
    includesEs: [
      "Hasta 8 horas de actualizaciones/mes",
      "16 publicaciones en redes sociales/mes",
      "Informe de rendimiento mensual",
      "1 hora de sesión de consultoría/mes",
      "Prioridad en todo",
    ],
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_RETAINER_149",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_PKG_ONLINE",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_PKG_LOCAL_PRO",
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
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_PKG_STOREFRONT",
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
      "3 months of Social Media content (8 posts/mo)",
      "First month of Partner Retainer ($149)",
    ],
    includesEs: [
      "Todo en Tienda Digital",
      "Kit de Marca Completo (logo + colores + fuentes)",
      "Auditoría de Privacidad y Seguridad (Básico)",
      "Sesión de Análisis de Negocio (1hr)",
      "3 meses de contenido de Redes Sociales (8 publicaciones/mes)",
      "Primer mes de Retención de Socio ($149)",
    ],
    stripeLink: "https://buy.stripe.com/PLACEHOLDER_PKG_FULL_BRAND",
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
  content: { en: "Content", es: "Contenido", icon: "PenTool" },
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
