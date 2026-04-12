export type Lang = "en" | "es";

export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      contact: "Contact",
      getStarted: "Get Started",
    },

    // Common
    common: {
      getStarted: "Get Started",
      seeWhatWeDo: "See What We Do",
      learnMore: "Learn More",
      contactUs: "Contact Us",
      viewServices: "View Services",
      bookConsultation: "Book a Consultation",
      whatsappUs: "WhatsApp Us",
    },

    // Home page
    home: {
      // Hero
      heroHeadline: "Your Caribbean Coast Business.",
      heroChaos: "Chaos → Clarity.",
      heroSubhead:
        "HLPFL helps hotels, lodges, restaurants, and tour operators between Cahuita and Manzanillo build the systems, brand, and digital presence that turn a beautiful operation into a fully booked one.",
      heroCta1: "Get Started",
      heroCta2: "See What We Do",

      // Trust Bar
      trustStat1: "9",
      trustLabel1: "Core Services",
      trustSub1: "End-to-end",
      trustStat2: "100%",
      trustLabel2: "Hospitality Focus",
      trustSub2: "CR Caribbean coast",
      trustStat3: "EN/ES",
      trustLabel3: "Bilingual",
      trustSub3: "Spanish & English",
      trustStat4: "1",
      trustLabel4: "Corridor",
      trustSub4: "Cahuita → Manzanillo",

      // How It Works
      howTitle: "Three Steps to a",
      howTitleAccent: "Fully Booked Season",
      howStep1Num: "01",
      howStep1Title: "Diagnose",
      howStep1Price: "Discovery",
      howStep1Desc:
        "We audit your current operation — bookings, online presence, pricing, systems, and brand. In two weeks you have a clear picture of what's working, what's bleeding revenue, and exactly what to fix first.",
      howStep2Num: "02",
      howStep2Title: "Build",
      howStep2Price: "Execution",
      howStep2Desc:
        "Website, booking system, brand identity, marketing campaigns, legal setup, operational processes — whatever your operation needs, we build it. Fast, mobile-optimized, bilingual.",
      howStep3Num: "03",
      howStep3Title: "Grow",
      howStep3Price: "Scale",
      howStep3Desc:
        "Ongoing strategy, market positioning, team structure, and digital marketing to make sure the slow season looks nothing like last year. More bookings. Less chaos.",

      // Value Stack
      valueTitle: "What Your Operation",
      valueTitleAccent: "Actually Needs",
      valueSubtitle:
        "Most Caribbean coast businesses are leaving serious money on the table — not because the product is bad, but because the systems, brand, and online presence aren't doing the work. Here's what HLPFL builds:",
      valueItems: [
        { service: "Mobile-Optimized Bilingual Website", market: "Built for rural CR connectivity" },
        { service: "Online Booking System", market: "No more midnight WhatsApps" },
        { service: "OTA Integration (Booking.com, Airbnb, Expedia)", market: "One dashboard, all channels" },
        { service: "Brand Identity & Photography Direction", market: "Look as good as you are" },
        { service: "Instagram / Facebook / Google Campaigns", market: "Travelers who actually book" },
        { service: "ICT Registration & Legal Compliance", market: "Operate with confidence" },
        { service: "Operational Systems & SOPs", market: "Runs without you on-site" },
        { service: "Business Strategy & Pricing Audit", market: "More revenue per guest" },
      ],

      // Services
      servicesTitle: "What We",
      servicesTitleAccent: "Build",
      servicesSubtitle:
        "Nine core services, every one reengineered for hospitality and tourism operators on Costa Rica's Caribbean coast.",

      // About
      aboutOverline: "Why Us",
      aboutTitle: "Built for the",
      aboutTitleAccent: "Caribbean Coast.",
      aboutDesc:
        "HLPFL isn't a generic digital agency. We work exclusively with hospitality and tourism operators in the Cahuita → Puerto Viejo → Manzanillo corridor. That specificity is a feature, not a limitation — we know the seasonal dynamics, the OTA landscape, the ICT registration process, and what a German eco-tourist is searching for at 11pm before they book.",
      aboutReasons: [
        {
          title: "Corridor-Specific Expertise",
          desc: "We know the Cahuita National Park visitor patterns, the Gandoca-Manzanillo Wildlife Refuge crowd, the turtle season surges, and the Semana Santa booking window. Generic advice doesn't survive contact with a Caribbean coast reality.",
        },
        {
          title: "Hospitality-Only Focus",
          desc: "We don't serve tech startups, real estate agencies, or insurance brokers. If you run a hotel, restaurant, tour operation, surf school, or wellness retreat in this corridor — you're exactly who we built this for.",
        },
        {
          title: "Bilingual by Default",
          desc: "Every website, booking system, and marketing campaign we build is Spanish and English from day one. Your guests are arriving from San José and from Stockholm. Your business needs to speak to both.",
        },
        {
          title: "Transparent & Direct",
          desc: "No retainer traps. No scope creep. No jargon. We tell you exactly what we're building, what it costs, and what result to expect. If it's not working, we say so.",
        },
      ],

      // Testimonials
      testimonialsOverline: "Client Stories",
      testimonialsTitle: "What Operators",
      testimonialsTitleAccent: "Are Saying",
      testimonials: [
        {
          quote:
            "We were fully booked every weekend but had almost no online presence. HLPFL built our website, set up online booking, and we started seeing reservations from Germany and the US within the first month.",
          author: "Eco-lodge owner",
          location: "Puerto Viejo de Talamanca",
        },
        {
          quote:
            "I had a great tour operation but no system. Guests would lose my WhatsApp message and never follow up. Now everything is automated and my calendar fills itself.",
          author: "Wildlife guide",
          location: "Manzanillo",
        },
        {
          quote:
            "They made us look like a real brand. Same operation, same jungle, same beach — but now guests arrive already excited because they saw us online.",
          author: "Restaurant owner",
          location: "Cahuita",
        },
      ],

      // CTA
      ctaOverline: "Get Started",
      ctaTitle: "Tell Us About Your",
      ctaTitleAccent: "Operation",
      ctaSubtitle:
        "Fill in the form below and we'll reach out within 24 hours. Or just WhatsApp us directly — this region runs on WhatsApp.",
      ctaFormLabels: {
        businessName: "Business Name",
        businessType: "Business Type",
        location: "Location in the Corridor",
        challenge: "Biggest Challenge Right Now",
        revenue: "Monthly Revenue Range (optional)",
        contactMethod: "Preferred Contact Method",
        submit: "Send Inquiry",
        whatsapp: "WhatsApp Us Instead",
      },
      ctaBusinessTypes: [
        "Hotel / Eco-Lodge",
        "B&B / Vacation Rental",
        "Restaurant / Soda",
        "Tour Operator",
        "Surf / Yoga / Wellness",
        "Other",
      ],
      ctaLocations: [
        "Cahuita",
        "Puerto Viejo de Talamanca",
        "Playa Cocles / Playa Negra",
        "Punta Uva",
        "Manzanillo",
        "Other",
      ],
      ctaRevenues: [
        "Under $3,000 / month",
        "$3,000 – $10,000 / month",
        "$10,000 – $30,000 / month",
        "Over $30,000 / month",
        "Prefer not to say",
      ],
      ctaContactMethods: ["WhatsApp", "Email", "Video Call"],
      ctaSuccessTitle: "Message Received",
      ctaSuccessDesc:
        "We'll be in touch within 24 hours. If you'd rather talk now, hit the WhatsApp button.",
    },

    // Services page
    services: {
      pageTitle: "Services",
      pageSubtitle:
        "Nine core services built for hospitality and tourism operators in the Cahuita–Manzanillo corridor.",
      ctaTitle: "Ready to Start?",
      ctaDesc: "Tell us about your operation and we'll map out the right services for your stage.",
      ctaButton: "Get Started",
    },

    // About page
    about: {
      pageTitle: "About HLPFL",
      pageSubtitle: "We exist to help Caribbean coast hospitality operators grow their businesses — with the same level of professional infrastructure the big resorts have, without the big resort budget.",
      missionTitle: "Our Mission",
      missionDesc:
        "The Caribbean coast of Costa Rica is one of the most biodiverse, culturally rich, and naturally beautiful destinations in the Americas. The small lodges, family restaurants, independent tour guides, and surf schools that make this corridor special are competing against international booking platforms and large resort chains with a fraction of the resources. HLPFL closes that gap.",
      valuesTitle: "How We Work",
      values: [
        { title: "Corridor-First", desc: "We work exclusively with operators in the Cahuita–Manzanillo corridor. Not because we can't work elsewhere — because deep expertise in one place is more valuable than shallow expertise everywhere." },
        { title: "Results Over Optics", desc: "We don't optimize for impressive decks or strategy documents. We optimize for bookings, occupancy rate, and revenue per guest. If you're not seeing results, we haven't done our job." },
        { title: "Build to Last", desc: "Everything we build — your website, your booking system, your brand — is yours. We don't use proprietary platforms that lock you in. You can take it all with you." },
        { title: "Bilingual by Default", desc: "Every deliverable is Spanish and English. Because your guests speak both, and your business should too." },
      ],
    },

    // Contact page
    contact: {
      pageTitle: "Contact HLPFL",
      pageSubtitle: "Fill in the form or send us a WhatsApp. We respond within 24 hours.",
      formTitle: "Tell Us About Your Operation",
      whatsappTitle: "Prefer WhatsApp?",
      whatsappDesc: "Most of our corridor clients reach us this way. Send a message anytime.",
      whatsappButton: "Open WhatsApp Chat",
    },

    // Privacy policy
    privacy: {
      pageTitle: "Privacy Policy",
      lastUpdated: "Last updated: April 2026",
    },

    // Terms
    terms: {
      pageTitle: "Terms of Service",
      lastUpdated: "Last updated: April 2026",
    },
  },

  // ============================================================
  // SPANISH TRANSLATIONS — [TRANSLATE] all sections below
  // These are structural placeholders. Professional human
  // review required before publishing.
  // ============================================================
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      about: "Nosotros",
      contact: "Contacto",
      getStarted: "Comenzar",
    },
    common: {
      getStarted: "Comenzar",
      seeWhatWeDo: "Ver Servicios",
      learnMore: "Más Información",
      contactUs: "Contáctanos",
      viewServices: "Ver Servicios",
      bookConsultation: "Reservar Consulta",
      whatsappUs: "Escribirnos por WhatsApp",
    },
    home: {
      heroHeadline: "Tu Negocio en la Costa Caribe.",
      heroChaos: "Caos → Claridad.",
      heroSubhead:
        "HLPFL ayuda a hoteles, lodges, restaurantes y operadores de tours entre Cahuita y Manzanillo a construir los sistemas, la marca y la presencia digital que convierten una operación hermosa en una completamente reservada.",
      heroCta1: "Comenzar",
      heroCta2: "Ver Servicios",
      trustStat1: "9",
      trustLabel1: "Servicios Clave",
      trustSub1: "Integral",
      trustStat2: "100%",
      trustLabel2: "Enfoque Hospitalidad",
      trustSub2: "Costa Caribe CR",
      trustStat3: "EN/ES",
      trustLabel3: "Bilingüe",
      trustSub3: "Español e Inglés",
      trustStat4: "1",
      trustLabel4: "Corredor",
      trustSub4: "Cahuita → Manzanillo",
      howTitle: "Tres Pasos hacia una",
      howTitleAccent: "Temporada Completa",
      howStep1Num: "01",
      howStep1Title: "Diagnóstico",
      howStep1Price: "Descubrimiento",
      howStep1Desc:
        "Auditamos tu operación actual — reservas, presencia en línea, precios, sistemas y marca. En dos semanas tendrás un panorama claro de lo que funciona, lo que está perdiendo ingresos y qué corregir primero.",
      howStep2Num: "02",
      howStep2Title: "Construir",
      howStep2Price: "Ejecución",
      howStep2Desc:
        "Sitio web, sistema de reservas, identidad de marca, campañas de marketing, configuración legal, procesos operativos — lo que tu operación necesite, lo construimos. Rápido, optimizado para móviles, bilingüe.",
      howStep3Num: "03",
      howStep3Title: "Crecer",
      howStep3Price: "Escala",
      howStep3Desc:
        "Estrategia continua, posicionamiento en el mercado, estructura de equipo y marketing digital para asegurarnos de que la temporada baja no se parezca en nada al año pasado. Más reservas. Menos caos.",
      valueTitle: "Lo que Tu Operación",
      valueTitleAccent: "Realmente Necesita",
      valueSubtitle:
        "La mayoría de los negocios en la costa Caribe están dejando dinero sobre la mesa — no porque el producto sea malo, sino porque los sistemas, la marca y la presencia en línea no están haciendo su trabajo.",
      valueItems: [
        { service: "Sitio Web Bilingüe Optimizado para Móviles", market: "Para la conectividad rural de CR" },
        { service: "Sistema de Reservas en Línea", market: "Sin más WhatsApps a medianoche" },
        { service: "Integración OTA (Booking.com, Airbnb, Expedia)", market: "Un dashboard, todos los canales" },
        { service: "Identidad de Marca y Fotografía", market: "Luce tan bien como eres" },
        { service: "Campañas Instagram / Facebook / Google", market: "Viajeros que realmente reservan" },
        { service: "Registro ICT y Cumplimiento Legal", market: "Opera con confianza" },
        { service: "Sistemas Operativos y POEs", market: "Funciona sin que estés presente" },
        { service: "Estrategia de Negocio y Auditoría de Precios", market: "Más ingresos por huésped" },
      ],
      servicesTitle: "Lo que",
      servicesTitleAccent: "Construimos",
      servicesSubtitle:
        "Nueve servicios principales, todos rediseñados para operadores de hospitalidad y turismo en la costa Caribe de Costa Rica.",
      aboutOverline: "¿Por Qué Nosotros?",
      aboutTitle: "Construidos para la",
      aboutTitleAccent: "Costa Caribe.",
      aboutDesc:
        "HLPFL no es una agencia digital genérica. Trabajamos exclusivamente con operadores de hospitalidad y turismo en el corredor Cahuita → Puerto Viejo → Manzanillo.",
      aboutReasons: [
        {
          title: "Experiencia Específica del Corredor",
          desc: "Conocemos los patrones de visitantes del Parque Nacional Cahuita, la afluencia al Refugio de Vida Silvestre Gandoca-Manzanillo, los picos de la temporada de tortugas y la ventana de reservas de Semana Santa.",
        },
        {
          title: "Enfoque Exclusivo en Hospitalidad",
          desc: "No atendemos startups tecnológicas ni agencias inmobiliarias. Si tienes un hotel, restaurante, operación de tours, escuela de surf o retiro de bienestar en este corredor — eres exactamente para quien construimos esto.",
        },
        {
          title: "Bilingüe por Defecto",
          desc: "Cada sitio web, sistema de reservas y campaña de marketing que construimos es en español e inglés desde el primer día.",
        },
        {
          title: "Transparente y Directo",
          desc: "Sin trampas de retención. Sin alcance descontrolado. Sin jerga. Te decimos exactamente qué construimos, cuánto cuesta y qué resultado esperar.",
        },
      ],
      testimonialsOverline: "Historias de Clientes",
      testimonialsTitle: "Lo que Dicen los",
      testimonialsTitleAccent: "Operadores",
      testimonials: [
        {
          quote:
            "Estábamos completamente reservados cada fin de semana pero casi no teníamos presencia en línea. HLPFL construyó nuestro sitio web, configuró las reservas en línea y comenzamos a ver reservas de Alemania y Estados Unidos en el primer mes.",
          author: "Propietaria de eco-lodge",
          location: "Puerto Viejo de Talamanca",
        },
        {
          quote:
            "Tenía una gran operación de tours pero ningún sistema. Los huéspedes perdían mi mensaje de WhatsApp y nunca hacían seguimiento. Ahora todo está automatizado y mi calendario se llena solo.",
          author: "Guía de vida silvestre",
          location: "Manzanillo",
        },
        {
          quote:
            "Nos hicieron ver como una marca real. Misma operación, misma selva, misma playa — pero ahora los huéspedes llegan ya emocionados porque nos vieron en línea.",
          author: "Propietario de restaurante",
          location: "Cahuita",
        },
      ],
      ctaOverline: "Comenzar",
      ctaTitle: "Cuéntanos sobre tu",
      ctaTitleAccent: "Operación",
      ctaSubtitle:
        "Completa el formulario y te contactaremos en 24 horas. O simplemente escríbenos por WhatsApp — esta región funciona en WhatsApp.",
      ctaFormLabels: {
        businessName: "Nombre del Negocio",
        businessType: "Tipo de Negocio",
        location: "Ubicación en el Corredor",
        challenge: "Mayor Desafío Actual",
        revenue: "Rango de Ingresos Mensuales (opcional)",
        contactMethod: "Método de Contacto Preferido",
        submit: "Enviar Consulta",
        whatsapp: "Escribirnos por WhatsApp",
      },
      ctaBusinessTypes: [
        "Hotel / Eco-Lodge",
        "B&B / Alquiler Vacacional",
        "Restaurante / Soda",
        "Operador de Tours",
        "Surf / Yoga / Bienestar",
        "Otro",
      ],
      ctaLocations: [
        "Cahuita",
        "Puerto Viejo de Talamanca",
        "Playa Cocles / Playa Negra",
        "Punta Uva",
        "Manzanillo",
        "Otro",
      ],
      ctaRevenues: [
        "Menos de $3,000 / mes",
        "$3,000 – $10,000 / mes",
        "$10,000 – $30,000 / mes",
        "Más de $30,000 / mes",
        "Prefiero no decir",
      ],
      ctaContactMethods: ["WhatsApp", "Correo Electrónico", "Videollamada"],
      ctaSuccessTitle: "Mensaje Recibido",
      ctaSuccessDesc:
        "Nos comunicaremos en 24 horas. Si prefiere hablar ahora, presione el botón de WhatsApp.",
    },
    services: {
      pageTitle: "Servicios",
      pageSubtitle:
        "Nueve servicios principales para operadores de hospitalidad y turismo en el corredor Cahuita-Manzanillo.",
      ctaTitle: "¿Listo para Comenzar?",
      ctaDesc: "Cuéntanos sobre tu operación y mapearemos los servicios correctos para tu etapa.",
      ctaButton: "Comenzar",
    },
    about: {
      pageTitle: "Acerca de HLPFL",
      pageSubtitle: "Existimos para ayudar a los operadores de hospitalidad de la costa Caribe a hacer crecer sus negocios.",
      missionTitle: "Nuestra Misión",
      missionDesc:
        "La costa Caribe de Costa Rica es uno de los destinos más biodiversos, culturalmente ricos y naturalmente hermosos de las Américas. Los pequeños lodges, restaurantes familiares, guías independientes y escuelas de surf que hacen especial este corredor compiten contra plataformas internacionales de reservas y grandes cadenas hoteleras con una fracción de los recursos. HLPFL cierra esa brecha.",
      valuesTitle: "Cómo Trabajamos",
      values: [
        { title: "Corredor Primero", desc: "Trabajamos exclusivamente con operadores en el corredor Cahuita-Manzanillo." },
        { title: "Resultados sobre Apariencias", desc: "No optimizamos para presentaciones impresionantes. Optimizamos para reservas, tasa de ocupación e ingresos por huésped." },
        { title: "Construir para Durar", desc: "Todo lo que construimos — tu sitio web, tu sistema de reservas, tu marca — es tuyo." },
        { title: "Bilingüe por Defecto", desc: "Cada entregable es en español e inglés. Porque tus huéspedes hablan ambos idiomas, y tu negocio también debería." },
      ],
    },
    contact: {
      pageTitle: "Contacto HLPFL",
      pageSubtitle: "Completa el formulario o envíanos un WhatsApp. Respondemos en 24 horas.",
      formTitle: "Cuéntanos sobre tu Operación",
      whatsappTitle: "¿Prefieres WhatsApp?",
      whatsappDesc: "La mayoría de nuestros clientes del corredor nos contactan así. Envía un mensaje en cualquier momento.",
      whatsappButton: "Abrir Chat de WhatsApp",
    },
    privacy: {
      pageTitle: "Política de Privacidad",
      lastUpdated: "Última actualización: Abril 2026",
    },
    terms: {
      pageTitle: "Términos de Servicio",
      lastUpdated: "Última actualización: Abril 2026",
    },
  },
} as const;
