// src/lib/translations.ts
// HLPFL INC — v2.0 (A La Carte Web Services Pivot)
// Maintains the same t() helper interface your components already use.

export type Lang = "en" | "es";

const translations = {
  // ─── GLOBAL ──────────────────────────────────────────────────────────────

  global: {
    en: {
      siteName: "HLPFL",
      tagline: "Modern Services, Local Prices",
      missionStatement: "We help business owners affordably grow their digital presence.",
      noAI: "No AI. No templates. No markup.",
      builtByHand: "Built by hand.",
      getAQuote: "Get a Quote",
      viewServices: "View Services",
      startHere: "Start Here — $49",
      learnMore: "Learn More",
      contactUs: "Contact Us",
      buyNow: "Buy Now",
      addToProject: "Add to Project",
      humanMade: "Human-Made",
      aiAssisted: "AI-Assisted",
      aiToggleLabel: "Content delivery method:",
      aiToggleNote:
        "Human-made = built from scratch by a person. AI-assisted = AI-generated, reviewed and edited before delivery. Website and setup services are always done by hand — toggle only affects content services.",
      perMonth: "/mo",
      perHour: "/hr",
      plusDomain: "+ domain",
      startingAt: "starting at",
      custom: "Custom Quote",
      save: "Save",
      vsAlaCarte: "vs. à la carte",
      firstMonthIncluded: "First month included",
      delivery: "Delivery",
      days: "business days",
      featured: "Popular",
      new: "New",
    },
    es: {
      siteName: "HLPFL",
      tagline: "Servicios Modernos, Precios Locales",
      missionStatement: "Ayudamos a los dueños de negocios a crecer digitalmente de forma asequible.",
      noAI: "Sin IA. Sin plantillas. Sin sobreprecios.",
      builtByHand: "Construido a mano.",
      getAQuote: "Obtener Cotización",
      viewServices: "Ver Servicios",
      startHere: "Empieza Aquí — $49",
      learnMore: "Saber Más",
      contactUs: "Contáctanos",
      buyNow: "Comprar Ahora",
      addToProject: "Agregar al Proyecto",
      humanMade: "Hecho por Humanos",
      aiAssisted: "Asistido por IA",
      aiToggleLabel: "Método de entrega de contenido:",
      aiToggleNote:
        "Hecho por humanos = construido desde cero por una persona. Asistido por IA = generado por IA, revisado y editado antes de la entrega. Los servicios de sitio web y configuración siempre se hacen a mano — el toggle solo afecta los servicios de contenido.",
      perMonth: "/mes",
      perHour: "/hr",
      plusDomain: "+ dominio",
      startingAt: "desde",
      custom: "Cotización Personalizada",
      save: "Ahorra",
      vsAlaCarte: "vs. à la carte",
      firstMonthIncluded: "Primer mes incluido",
      delivery: "Entrega",
      days: "días hábiles",
      featured: "Popular",
      new: "Nuevo",
    },
  },

  // ─── NAV ─────────────────────────────────────────────────────────────────

  nav: {
    en: {
      services: "Services",
      packages: "Packages",
      about: "About",
      testimonials: "Testimonials",
      faq: "FAQ",
      contact: "Contact",
      getStarted: "Get Started",
    },
    es: {
      services: "Servicios",
      packages: "Paquetes",
      about: "Nosotros",
      testimonials: "Testimonios",
      faq: "Preguntas",
      contact: "Contacto",
      getStarted: "Comenzar",
    },
  },

  // ─── HOME ────────────────────────────────────────────────────────────────

  home: {
    en: {
      heroEyebrow: "No AI. No Agency. No Markup.",
      heroHeadline: "Modern Services.\nLocal Prices.",
      heroSub:
        "Your website, Google presence, and brand — built by hand, delivered fast, priced for real business. Starting at $49.",
      heroCTA: "Get Your Site for $49",
      heroSecondaryCTA: "See Packages",
      heroPriceFrom: "Website from",
      heroPriceNote: "+ domain (you own it)",

      trustBarLabel: "What we do:",
      trustBarItems: [
        "Websites",
        "Google My Business",
        "SEO",
        "Shopify Stores",
        "Social Media Content",
        "WhatsApp Business",
        "Branding & Logos",
        "Hosting & SSL",
        "QR Codes & NFC",
        "Consulting",
      ],

      painHeadline: "You built something real.",
      painSub:
        "Your online presence shouldn't look like it was an afterthought.",
      painPoints: [
        {
          icon: "Clock",
          title: "You don't have time for this",
          desc: "Running a business is a full-time job. Your website shouldn't be your second one.",
        },
        {
          icon: "DollarSign",
          title: "Agencies cost too much",
          desc: "The average agency charges $2,000–$5,000 for a website. That's inventory money. That's payroll.",
        },
        {
          icon: "Bot",
          title: "Everyone's using AI now",
          desc: "Your competitors got a site that looks like everyone else's. Yours won't.",
        },
      ],

      whyHeadline: "Why HLPFL",
      whyPoints: [
        {
          icon: "Hand",
          title: "Human-Made",
          desc: "Every site, every logo, every post is built by a person. Not generated. Not templated. Made.",
        },
        {
          icon: "Zap",
          title: "Fast Turnaround",
          desc: "5–7 business days for a full website. No committee meetings. No revision spirals. Done.",
        },
        {
          icon: "Tag",
          title: "Prices That Make Sense",
          desc: "We work with local businesses, not venture-backed startups. Our prices reflect that.",
        },
      ],

      servicesHeadline: "Everything a small business needs.",
      servicesSub: "Pick what you need. Skip what you don't.",
      servicesViewAll: "See all services →",

      packagesHeadline: "Or grab a package.",
      packagesSub: "The smart way to start — everything bundled at a discount.",
      packagesViewAll: "Compare all packages →",

      testimonialsHeadline: "Real businesses. Real results.",

      ctaHeadline: "Ready to get found?",
      ctaSub: "Start with a $49 website. Build from there.",
      ctaButton: "Get Started Now",
      ctaSecondary: "or ask a question →",
    },
    es: {
      heroEyebrow: "Sin IA. Sin Agencia. Sin Sobreprecios.",
      heroHeadline: "Servicios Modernos.\nPrecios Locales.",
      heroSub:
        "Tu sitio web, presencia en Google y marca — construidos a mano, entregados rápido, con precios para negocios reales. Desde $49.",
      heroCTA: "Obtén Tu Sitio por $49",
      heroSecondaryCTA: "Ver Paquetes",
      heroPriceFrom: "Sitio web desde",
      heroPriceNote: "+ dominio (tuyo)",

      trustBarLabel: "Lo que hacemos:",
      trustBarItems: [
        "Sitios Web",
        "Google My Business",
        "SEO",
        "Tiendas Shopify",
        "Contenido para Redes",
        "WhatsApp Business",
        "Branding y Logos",
        "Hosting y SSL",
        "Códigos QR y NFC",
        "Consultoría",
      ],

      painHeadline: "Construiste algo real.",
      painSub: "Tu presencia en línea no debería verse como algo improvisado.",
      painPoints: [
        {
          icon: "Clock",
          title: "No tienes tiempo para esto",
          desc: "Manejar un negocio es un trabajo de tiempo completo. Tu sitio web no debería ser el segundo.",
        },
        {
          icon: "DollarSign",
          title: "Las agencias cobran demasiado",
          desc: "La agencia promedio cobra $2,000–$5,000 por un sitio web. Eso es dinero de inventario. De nómina.",
        },
        {
          icon: "Bot",
          title: "Todos usan IA ahora",
          desc: "Tus competidores tienen un sitio que se ve igual que todos los demás. El tuyo no.",
        },
      ],

      whyHeadline: "Por Qué HLPFL",
      whyPoints: [
        {
          icon: "Hand",
          title: "Hecho por Humanos",
          desc: "Cada sitio, cada logo, cada publicación es construido por una persona. No generado. No plantillado. Hecho.",
        },
        {
          icon: "Zap",
          title: "Entrega Rápida",
          desc: "5–7 días hábiles para un sitio web completo. Sin reuniones de comité. Sin espirales de revisión. Listo.",
        },
        {
          icon: "Tag",
          title: "Precios que Tienen Sentido",
          desc: "Trabajamos con negocios locales, no startups respaldadas por capital de riesgo. Nuestros precios lo reflejan.",
        },
      ],

      servicesHeadline: "Todo lo que un pequeño negocio necesita.",
      servicesSub: "Elige lo que necesitas. Omite lo que no.",
      servicesViewAll: "Ver todos los servicios →",

      packagesHeadline: "O toma un paquete.",
      packagesSub: "La forma inteligente de comenzar — todo incluido con descuento.",
      packagesViewAll: "Comparar todos los paquetes →",

      testimonialsHeadline: "Negocios reales. Resultados reales.",

      ctaHeadline: "¿Listo para ser encontrado?",
      ctaSub: "Comienza con un sitio web de $49. Construye desde ahí.",
      ctaButton: "Comenzar Ahora",
      ctaSecondary: "o haz una pregunta →",
    },
  },

  // ─── SERVICES PAGE ───────────────────────────────────────────────────────

  services: {
    en: {
      headline: "Services",
      sub: "Everything à la carte. Pick what your business needs, skip what it doesn't.",
      aiToggleHeadline: "Content delivery:",
      filterAll: "All",
      filterLabel: "Category:",
      priceLabel: "Price:",
      deliveryLabel: "Delivery:",
      buyButton: "Buy Now",
      quoteButton: "Get a Quote",
      contactLink: "→ Contact to discuss",
    },
    es: {
      headline: "Servicios",
      sub: "Todo à la carte. Elige lo que tu negocio necesita, omite lo que no.",
      aiToggleHeadline: "Entrega de contenido:",
      filterAll: "Todo",
      filterLabel: "Categoría:",
      priceLabel: "Precio:",
      deliveryLabel: "Entrega:",
      buyButton: "Comprar Ahora",
      quoteButton: "Obtener Cotización",
      contactLink: "→ Contactar para discutir",
    },
  },

  // ─── PACKAGES PAGE ───────────────────────────────────────────────────────

  packages: {
    en: {
      headline: "Packages",
      sub: "Bundled for the way real businesses actually need to start.",
      includesLabel: "Includes:",
      retainerLabel: "Recommended retainer:",
      savingsLabel: "You save:",
      buyPackage: "Get This Package",
      customNote: "Need something different? Every package can be customized.",
      customCTA: "Talk to us →",
    },
    es: {
      headline: "Paquetes",
      sub: "Agrupados para la forma en que los negocios reales realmente necesitan comenzar.",
      includesLabel: "Incluye:",
      retainerLabel: "Retención recomendada:",
      savingsLabel: "Ahorras:",
      buyPackage: "Obtener Este Paquete",
      customNote: "¿Necesitas algo diferente? Cada paquete puede personalizarse.",
      customCTA: "Hablemos →",
    },
  },

  // ─── RETAINERS ───────────────────────────────────────────────────────────

  retainers: {
    en: {
      headline: "Monthly Retainers",
      sub: "The $49 website gets you online. A retainer keeps you there.",
      perMonth: "/month",
      cancelAnytime: "Cancel anytime. No contracts.",
      subscribeButton: "Start Retainer",
    },
    es: {
      headline: "Retenciones Mensuales",
      sub: "El sitio de $49 te pone en línea. Una retención te mantiene ahí.",
      perMonth: "/mes",
      cancelAnytime: "Cancela cuando quieras. Sin contratos.",
      subscribeButton: "Iniciar Retención",
    },
  },

  // ─── ABOUT PAGE ──────────────────────────────────────────────────────────

  about: {
    en: {
      headline: "Built by someone who's been there.",
      sub: "7 years as an entrepreneur. Multiple verticals. Zero funding. Built everything by learning it.",
      storyHeadline: "The story",
      story: [
        "HLPFL started as a consulting operation for hospitality businesses on the Caribbean coast of Costa Rica. The problem was always the same: business owners had something real — a restaurant, a lodge, a tour operation — and their digital presence looked like it was built in 2009 on a free template.",
        "After years of doing this work and watching agencies charge $3,000 for something that took 4 hours, something had to change. If you know what you're doing — and you've spent years building that knowledge — there's no reason a small business owner should pay agency rates.",
        "Every service at HLPFL is done by hand. No AI writing the copy. No AI designing the logo. No template purchased and reskinned. The prices are low because the overhead is zero, not because the quality is.",
      ],
      valuesHeadline: "How we work",
      values: [
        {
          icon: "ShieldOff",
          title: "No AI on deliverables",
          desc: "Websites, logos, and content are made by a person. When AI is available as an option (content services), we tell you clearly.",
        },
        {
          icon: "Lock",
          title: "No tracking on your site",
          desc: "We don't install analytics, pixels, or cookies on the sites we build. Faster load times, less data exposure.",
        },
        {
          icon: "Key",
          title: "You own everything",
          desc: "Domain, code, accounts — all yours. We don't hold anything hostage. Ever.",
        },
        {
          icon: "FileX",
          title: "No contracts",
          desc: "Retainers are month-to-month. Cancel with 30 days notice. Simple.",
        },
        {
          icon: "Clock",
          title: "24hr response",
          desc: "Every message gets a response within 24 hours. No support tickets. No AI chatbots.",
        },
        {
          icon: "Users",
          title: "Human to human",
          desc: "You're talking to the person doing the work. Every time.",
        },
      ],
      toolsHeadline: "The stack",
      tools: [
        "Adobe Illustrator — all graphic design",
        "VS Code — all web development",
        "GitHub — version control & deployment",
        "Cloudflare Pages — hosting & DNS",
        "Google Workspace — client communication",
        "Stripe — payments",
        "Next.js 15 — web framework",
        "Tailwind CSS — styling",
      ],
      missionHeadline: "Mission & Vision",
      mission:
        "To help business owners affordably grow their digital presence.",
      vision: "To serve 1,000,000,000 small business owners worldwide.",
    },
    es: {
      headline: "Construido por alguien que ha estado ahí.",
      sub: "7 años como emprendedor. Múltiples verticales. Cero financiamiento. Construí todo aprendiendo.",
      storyHeadline: "La historia",
      story: [
        "HLPFL comenzó como una operación de consultoría para negocios de hospitalidad en la costa caribeña de Costa Rica. El problema siempre era el mismo: los dueños de negocios tenían algo real — un restaurante, un lodge, una operadora de tours — y su presencia digital parecía construida en 2009 con una plantilla gratuita.",
        "Después de años haciendo este trabajo y viendo agencias cobrar $3,000 por algo que tomó 4 horas, algo tenía que cambiar. Si sabes lo que haces — y has pasado años construyendo ese conocimiento — no hay razón para que un dueño de pequeño negocio pague precios de agencia.",
        "Cada servicio en HLPFL se hace a mano. Sin IA escribiendo el copy. Sin IA diseñando el logo. Sin plantilla comprada y retocada. Los precios son bajos porque los gastos generales son cero, no porque la calidad lo sea.",
      ],
      valuesHeadline: "Cómo trabajamos",
      values: [
        {
          icon: "ShieldOff",
          title: "Sin IA en entregables",
          desc: "Los sitios web, logos y contenido son hechos por una persona. Cuando la IA está disponible como opción (servicios de contenido), te lo decimos claramente.",
        },
        {
          icon: "Lock",
          title: "Sin seguimiento en tu sitio",
          desc: "No instalamos analíticas, píxeles ni cookies en los sitios que construimos. Tiempos de carga más rápidos, menos exposición de datos.",
        },
        {
          icon: "Key",
          title: "Tú eres dueño de todo",
          desc: "Dominio, código, cuentas — todo tuyo. No retenemos nada. Nunca.",
        },
        {
          icon: "FileX",
          title: "Sin contratos",
          desc: "Las retenciones son mes a mes. Cancela con 30 días de aviso. Simple.",
        },
        {
          icon: "Clock",
          title: "Respuesta en 24hr",
          desc: "Cada mensaje recibe una respuesta en 24 horas. Sin tickets de soporte. Sin chatbots de IA.",
        },
        {
          icon: "Users",
          title: "Humano a humano",
          desc: "Estás hablando con la persona que hace el trabajo. Siempre.",
        },
      ],
      toolsHeadline: "El stack",
      tools: [
        "Adobe Illustrator — todo el diseño gráfico",
        "VS Code — todo el desarrollo web",
        "GitHub — control de versiones y despliegue",
        "Cloudflare Pages — hosting y DNS",
        "Google Workspace — comunicación con clientes",
        "Stripe — pagos",
        "Next.js 15 — framework web",
        "Tailwind CSS — estilos",
      ],
      missionHeadline: "Misión y Visión",
      mission:
        "Ayudar a los dueños de negocios a crecer digitalmente de forma asequible.",
      vision:
        "Servir a 1,000,000,000 dueños de pequeños negocios en todo el mundo.",
    },
  },

  // ─── FAQ ────────────────────────────────────────────────────────────────

  faq: {
    en: {
      headline: "Frequently Asked Questions",
      sub: "Straight answers. No runaround.",
      items: [
        {
          q: "Why is the website only $49?",
          a: "Because it doesn't need to cost more. A clean, fast, mobile-first 5-page website built on Next.js and hosted on Cloudflare takes a skilled person 3–5 hours. At $49, I make a fair margin, you get a professional site, and nobody gets ripped off. The agency markup is the con — not the price.",
        },
        {
          q: "What does '+ domain' mean?",
          a: "You register and pay for your own domain name (usually $12–15/year at Cloudflare Registrar or Namecheap). I'll tell you exactly what to buy and help you configure it. You own it — it never goes through me, and I can never take it away.",
        },
        {
          q: "Do you use AI?",
          a: "Not on the deliverables you're paying for — websites, logos, and setup work are all done by hand. For content services (social posts, blog posts, etc.), I offer an AI-assisted option at a lower price alongside a human-written option. I'm transparent about which is which, and AI-assisted content is always reviewed and edited before delivery.",
        },
        {
          q: "How fast is delivery?",
          a: "Website: 5–7 business days. Most setup services: 1–2 business days. Content: 2–5 business days depending on volume. Rush delivery (48hr) is available as an add-on for $29.",
        },
        {
          q: "What if I need changes after delivery?",
          a: "Each project includes one round of revisions. Additional changes are covered under a monthly retainer ($25/mo) or billed at $75/hr for one-off requests. The retainer is the better deal for most clients who need ongoing updates.",
        },
        {
          q: "Do I own my site and code?",
          a: "100%. The code is yours, the domain is yours, the Cloudflare account is yours, the GitHub repo is yours. I set it all up under your accounts, not mine. There is no lock-in.",
        },
        {
          q: "What's the difference between Human-made and AI-assisted content?",
          a: "Human-made means I write or create every word and asset from scratch, with research, voice-matching, and creative intent. AI-assisted means I use AI tools to generate a draft, then review, edit, and refine it before delivery. Human takes longer and costs more. AI is faster and cheaper. Both are honest options.",
        },
        {
          q: "Can I cancel a retainer?",
          a: "Yes. Retainers are month-to-month. Email with 30 days notice and it's done. No fees, no penalties, no awkward conversations.",
        },
        {
          q: "Do you work internationally?",
          a: "Yes. All work is remote. I've worked with clients in Costa Rica, the US, Europe, and more. Payment is in USD via Stripe.",
        },
        {
          q: "How do I pay?",
          a: "All one-time services are paid upfront via Stripe (card, bank transfer). Retainers are monthly subscriptions via Stripe. You'll get a receipt after every payment. Work starts after payment is confirmed.",
        },
        {
          q: "What if I need something not on the list?",
          a: "Use the Custom Quote form on the contact page. Describe what you need, and you'll get a quote within 24 hours. I've done enough verticals to know that a rigid menu doesn't cover every real-world situation.",
        },
      ],
    },
    es: {
      headline: "Preguntas Frecuentes",
      sub: "Respuestas directas. Sin rodeos.",
      items: [
        {
          q: "¿Por qué el sitio web cuesta solo $49?",
          a: "Porque no necesita costar más. Un sitio web limpio, rápido y mobile-first de 5 páginas construido en Next.js y alojado en Cloudflare toma a una persona capacitada 3–5 horas. A $49, obtengo un margen justo, tú obtienes un sitio profesional, y nadie sale estafado. El sobreprecio de la agencia es el engaño — no el precio.",
        },
        {
          q: "¿Qué significa '+ dominio'?",
          a: "Tú registras y pagas tu propio nombre de dominio (usualmente $12–15/año en Cloudflare Registrar o Namecheap). Te diré exactamente qué comprar y te ayudaré a configurarlo. Es tuyo — nunca pasa por mí, y nunca puedo quitártelo.",
        },
        {
          q: "¿Usas IA?",
          a: "No en los entregables por los que pagas — sitios web, logos y configuraciones se hacen a mano. Para servicios de contenido (publicaciones sociales, entradas de blog, etc.), ofrezco una opción asistida por IA a menor precio junto con una opción escrita por humanos. Soy transparente sobre cuál es cuál, y el contenido asistido por IA siempre se revisa y edita antes de la entrega.",
        },
        {
          q: "¿Qué tan rápida es la entrega?",
          a: "Sitio web: 5–7 días hábiles. La mayoría de servicios de configuración: 1–2 días hábiles. Contenido: 2–5 días hábiles según el volumen. La entrega express (48hr) está disponible como complemento por $29.",
        },
        {
          q: "¿Qué pasa si necesito cambios después de la entrega?",
          a: "Cada proyecto incluye una ronda de revisiones. Los cambios adicionales están cubiertos bajo una retención mensual ($25/mes) o se facturan a $75/hr para solicitudes puntuales. La retención es la mejor opción para la mayoría de clientes que necesitan actualizaciones continuas.",
        },
        {
          q: "¿Soy dueño de mi sitio y código?",
          a: "100%. El código es tuyo, el dominio es tuyo, la cuenta de Cloudflare es tuya, el repositorio de GitHub es tuyo. Configuro todo bajo tus cuentas, no las mías. No hay bloqueo.",
        },
        {
          q: "¿Cuál es la diferencia entre contenido Hecho por Humanos y Asistido por IA?",
          a: "Hecho por humanos significa que escribo o creo cada palabra y activo desde cero, con investigación, coincidencia de voz e intención creativa. Asistido por IA significa que uso herramientas de IA para generar un borrador, luego lo reviso, edito y refino antes de la entrega. El humano tarda más y cuesta más. La IA es más rápida y económica. Ambas son opciones honestas.",
        },
        {
          q: "¿Puedo cancelar una retención?",
          a: "Sí. Las retenciones son mes a mes. Envía un correo con 30 días de aviso y listo. Sin tarifas, sin penalizaciones, sin conversaciones incómodas.",
        },
        {
          q: "¿Trabajan internacionalmente?",
          a: "Sí. Todo el trabajo es remoto. He trabajado con clientes en Costa Rica, EE.UU., Europa y más. El pago es en USD vía Stripe.",
        },
        {
          q: "¿Cómo pago?",
          a: "Todos los servicios únicos se pagan por adelantado vía Stripe (tarjeta, transferencia bancaria). Las retenciones son suscripciones mensuales vía Stripe. Recibirás un recibo después de cada pago. El trabajo comienza después de confirmar el pago.",
        },
        {
          q: "¿Qué pasa si necesito algo que no está en la lista?",
          a: "Usa el formulario de Cotización Personalizada en la página de contacto. Describe lo que necesitas y recibirás una cotización en 24 horas. He trabajado en suficientes verticales como para saber que un menú rígido no cubre todas las situaciones del mundo real.",
        },
      ],
    },
  },

  // ─── CONTACT ─────────────────────────────────────────────────────────────

  contact: {
    en: {
      headline: "Get in Touch",
      sub: "Response within 24 hours. Every time.",
      formHeadline: "Send a message",
      nameLabel: "Your name",
      emailLabel: "Your email",
      businessLabel: "Business name (optional)",
      serviceLabel: "What are you looking for?",
      servicePlaceholder: "e.g. Website + GMB setup, or tell me what's going on",
      messageLabel: "Anything else to add?",
      submitButton: "Send Message",
      successMessage:
        "Got it. You'll hear back within 24 hours.",
      errorMessage: "Something went wrong. Try emailing directly instead.",
      whatsappLabel: "Or message on WhatsApp",
      whatsappCTA: "Open WhatsApp →",
      emailDirectLabel: "Prefer email?",
      noSpam: "We don't collect your data for anything other than responding to your message.",
    },
    es: {
      headline: "Ponte en Contacto",
      sub: "Respuesta en 24 horas. Siempre.",
      formHeadline: "Envía un mensaje",
      nameLabel: "Tu nombre",
      emailLabel: "Tu correo",
      businessLabel: "Nombre del negocio (opcional)",
      serviceLabel: "¿Qué estás buscando?",
      servicePlaceholder: "ej. Sitio web + configuración de GMB, o cuéntame qué está pasando",
      messageLabel: "¿Algo más que agregar?",
      submitButton: "Enviar Mensaje",
      successMessage: "Recibido. Recibirás respuesta en 24 horas.",
      errorMessage: "Algo salió mal. Intenta enviar un correo directamente.",
      whatsappLabel: "O escribe por WhatsApp",
      whatsappCTA: "Abrir WhatsApp →",
      emailDirectLabel: "¿Prefieres correo?",
      noSpam: "No recopilamos tus datos para nada más que responder tu mensaje.",
    },
  },

  // ─── TESTIMONIALS ────────────────────────────────────────────────────────

  testimonials: {
    en: {
      headline: "What clients say",
      sub: "Real businesses. Unedited feedback.",
      items: [
        {
          name: "Maria G.",
          business: "Restaurant, Costa Rica",
          quote:
            "I had been putting off building a website for 3 years because every quote I got was over $1,000. HLPFL built mine in a week and it actually looks better than the expensive ones I saw.",
          service: "Website + Google My Business",
        },
        {
          name: "Carlos R.",
          business: "Tour Operator, Caribbean Coast",
          quote:
            "What I appreciate most is that I own everything. No dependency. He set it all up under my name, walked me through it, and now I know how it works.",
          service: "Full Brand Package",
        },
        {
          name: "Priya S.",
          business: "Boutique, Online",
          quote:
            "The Shopify setup was seamless. I was selling within 10 days of reaching out. The price I paid was a fraction of what the agency quoted me.",
          service: "Shopify Store + Payment Integration",
        },
      ],
    },
    es: {
      headline: "Lo que dicen los clientes",
      sub: "Negocios reales. Comentarios sin editar.",
      items: [
        {
          name: "Maria G.",
          business: "Restaurante, Costa Rica",
          quote:
            "Había estado postergando construir un sitio web por 3 años porque cada cotización que recibía era más de $1,000. HLPFL construyó el mío en una semana y realmente se ve mejor que los caros que vi.",
          service: "Sitio Web + Google My Business",
        },
        {
          name: "Carlos R.",
          business: "Operador de Tours, Costa Caribeña",
          quote:
            "Lo que más aprecio es que soy dueño de todo. Sin dependencia. Configuró todo bajo mi nombre, me explicó cómo funciona, y ahora yo sé cómo manejarlo.",
          service: "Paquete de Marca Completa",
        },
        {
          name: "Priya S.",
          business: "Boutique, En línea",
          quote:
            "La configuración de Shopify fue impecable. Estaba vendiendo dentro de 10 días de contactarlos. El precio que pagué fue una fracción de lo que la agencia me cotizó.",
          service: "Tienda Shopify + Integración de Pagos",
        },
      ],
    },
  },

  // ─── FOOTER ──────────────────────────────────────────────────────────────

  footer: {
    en: {
      tagline: "Modern Services. Local Prices.",
      builtNote: "Hand-built. No AI. No tracking. Fast.",
      nav: ["Services", "Packages", "About", "FAQ", "Contact"],
      legal: ["Privacy", "Terms"],
      copyright: "HLPFL INC. All rights reserved.",
      mission: "Mission: help business owners affordably grow.",
    },
    es: {
      tagline: "Servicios Modernos. Precios Locales.",
      builtNote: "Construido a mano. Sin IA. Sin seguimiento. Rápido.",
      nav: ["Servicios", "Paquetes", "Nosotros", "FAQ", "Contacto"],
      legal: ["Privacidad", "Términos"],
      copyright: "HLPFL INC. Todos los derechos reservados.",
      mission: "Misión: ayudar a los dueños de negocios a crecer asequiblemente.",
    },
  },

  // ─── PRIVACY ────────────────────────────────────────────────────────────

  privacy: {
    en: {
      headline: "Privacy Policy",
      lastUpdated: "Last updated: 2025",
      content: [
        {
          heading: "The short version",
          body: "We don't track you. We don't use cookies. We don't sell your data. We don't use analytics platforms that profile you. This is not a loophole-filled policy — it's the actual policy.",
        },
        {
          heading: "What we collect",
          body: "Only what you send us through the contact form: your name, email, and message. We use Web3Forms to deliver your message to our inbox. We don't store form submissions ourselves.",
        },
        {
          heading: "What we don't collect",
          body: "No cookies. No analytics. No IP logging. No third-party tracking scripts. No session recording. No behavioral data. None of it.",
        },
        {
          heading: "Payments",
          body: "Payments are processed by Stripe. We never see or store your card information. Stripe's privacy policy applies to payment processing.",
        },
        {
          heading: "Contact",
          body: "Questions? Email us. We'll respond within 24 hours.",
        },
      ],
    },
    es: {
      headline: "Política de Privacidad",
      lastUpdated: "Última actualización: 2025",
      content: [
        {
          heading: "La versión corta",
          body: "No te rastreamos. No usamos cookies. No vendemos tus datos. No usamos plataformas de analíticas que te perfilen. Esta no es una política llena de lagunas — es la política real.",
        },
        {
          heading: "Qué recopilamos",
          body: "Solo lo que nos envías a través del formulario de contacto: tu nombre, correo y mensaje. Usamos Web3Forms para entregar tu mensaje a nuestra bandeja de entrada. No almacenamos los envíos de formularios nosotros mismos.",
        },
        {
          heading: "Qué no recopilamos",
          body: "Sin cookies. Sin analíticas. Sin registro de IP. Sin scripts de seguimiento de terceros. Sin grabación de sesiones. Sin datos de comportamiento. Nada de eso.",
        },
        {
          heading: "Pagos",
          body: "Los pagos son procesados por Stripe. Nunca vemos ni almacenamos tu información de tarjeta. La política de privacidad de Stripe aplica al procesamiento de pagos.",
        },
        {
          heading: "Contacto",
          body: "¿Preguntas? Escríbenos. Respondemos en 24 horas.",
        },
      ],
    },
  },
} as const;

// ─── t() HELPER — same interface as your existing build ───────────────────────

type TranslationKey = keyof typeof translations;

export function getTranslations<K extends TranslationKey>(
  key: K,
  lang: Lang
): (typeof translations)[K][Lang] {
  return translations[key][lang];
}

export { translations };
export default translations;
