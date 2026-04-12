import {
  Megaphone,
  ShoppingCart,
  Workflow,
  Palette,
  Globe,
  Scale,
  TrendingUp,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  tags: string[];
  tagsEs: string[];
}

export const services: Service[] = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    titleEs: "Marketing Digital",
    description:
      "We build and run Instagram, Facebook, and Google campaigns that put your lodge or restaurant in front of travelers who are actively planning their Caribbean coast trip — not just scrolling. Expect real booking inquiries, not just likes.",
    descriptionEs:
      "Creamos y gestionamos campañas en Instagram, Facebook y Google que ponen tu lodge o restaurante frente a viajeros que están planificando activamente su viaje a la costa Caribe — no solo desplazándose. Espera consultas de reserva reales, no solo likes.",
    tags: ["Instagram", "Facebook", "Google Ads"],
    tagsEs: ["Instagram", "Facebook", "Google Ads"],
  },
  {
    icon: ShoppingCart,
    title: "Custom E-Commerce / Online Booking",
    titleEs: "E-Commerce / Reservas en Línea",
    description:
      "No more WhatsApp reservations at midnight. We set up clean, mobile-friendly booking systems so guests can reserve a room, book a tour, or buy a package directly on your site — in any currency, any time zone.",
    descriptionEs:
      "No más reservas por WhatsApp a medianoche. Configuramos sistemas de reserva limpios y optimizados para móviles para que los huéspedes puedan reservar una habitación, contratar un tour o comprar un paquete directamente en tu sitio — en cualquier moneda, cualquier zona horaria.",
    tags: ["Booking System", "Mobile-First", "Multi-Currency"],
    tagsEs: ["Sistema de Reservas", "Mobile-First", "Multi-Moneda"],
  },
  {
    icon: Workflow,
    title: "Software Integration",
    titleEs: "Integración de Software",
    description:
      "We connect your booking system, your payment processor, your OTA listings (Booking.com, Airbnb, Expedia), and your guest communication into one dashboard. You'll always know your occupancy rate without opening six apps.",
    descriptionEs:
      "Conectamos tu sistema de reservas, tu procesador de pagos, tus listados en OTAs (Booking.com, Airbnb, Expedia) y tu comunicación con huéspedes en un solo dashboard. Siempre sabrás tu tasa de ocupación sin abrir seis aplicaciones.",
    tags: ["OTA Sync", "Dashboard", "Automation"],
    tagsEs: ["Sincronización OTA", "Dashboard", "Automatización"],
  },
  {
    icon: Palette,
    title: "Visual Identity & Branding",
    titleEs: "Identidad Visual y Marca",
    description:
      "Your eco-lodge is stunning. Your photos and logo should say so before a traveler ever arrives. We build the visual identity, professional photography direction, and brand kit that makes your property the one they screenshot and share.",
    descriptionEs:
      "Tu eco-lodge es impresionante. Tus fotos y logotipo deben decirlo antes de que un viajero llegue. Construimos la identidad visual, la dirección fotográfica profesional y el kit de marca que hace que tu propiedad sea la que capturan y comparten.",
    tags: ["Logo", "Brand Kit", "Photography"],
    tagsEs: ["Logotipo", "Kit de Marca", "Fotografía"],
  },
  {
    icon: Globe,
    title: "Professional Website",
    titleEs: "Sitio Web Profesional",
    description:
      "A fast, bilingual (Spanish / English), mobile-optimized website built for Caribbean coast connectivity realities — loads quickly even on spotty rural internet, ranks on Google for terms like 'Cahuita eco-lodge' or 'Puerto Viejo surf lessons', and converts visitors into confirmed bookings.",
    descriptionEs:
      "Un sitio web rápido, bilingüe (español / inglés), optimizado para móviles y construido para las realidades de conectividad de la costa Caribe — carga rápidamente incluso con internet rural irregular, aparece en Google para términos como 'eco-lodge Cahuita' o 'clases de surf Puerto Viejo', y convierte visitantes en reservas confirmadas.",
    tags: ["Bilingual", "Mobile-First", "SEO"],
    tagsEs: ["Bilingüe", "Mobile-First", "SEO"],
  },
  {
    icon: Scale,
    title: "Legal & Entity Setup",
    titleEs: "Configuración Legal y de Entidad",
    description:
      "Operating a tourism business in Costa Rica means navigating ICT registration, liability waivers for tours and activities, rental agreements, and employment contracts. We help you build a legally solid operation so one bad review or one slip-and-fall doesn't take everything down.",
    descriptionEs:
      "Operar un negocio de turismo en Costa Rica significa navegar el registro ante el ICT, exoneraciones de responsabilidad para tours y actividades, contratos de arrendamiento y contratos laborales. Te ayudamos a construir una operación legalmente sólida para que una mala reseña o un accidente no lo derrumbe todo.",
    tags: ["ICT Registration", "Contracts", "Compliance"],
    tagsEs: ["Registro ICT", "Contratos", "Cumplimiento"],
  },
  {
    icon: TrendingUp,
    title: "Business Strategy & Market Positioning",
    titleEs: "Estrategia de Negocio y Posicionamiento",
    description:
      "We analyze your occupancy data, your pricing against comparable properties in the corridor, your seasonal gaps, and your upsell opportunities — then give you a clear growth roadmap. More revenue per guest. Less dependence on peak-season chaos.",
    descriptionEs:
      "Analizamos tus datos de ocupación, tus precios versus propiedades comparables en el corredor, tus brechas estacionales y tus oportunidades de venta adicional — luego te damos una hoja de ruta de crecimiento clara. Más ingresos por huésped. Menos dependencia del caos de temporada alta.",
    tags: ["Pricing Strategy", "Occupancy", "Growth"],
    tagsEs: ["Estrategia de Precios", "Ocupación", "Crecimiento"],
  },
  {
    icon: Settings,
    title: "Systems, Processes & Logistics",
    titleEs: "Sistemas, Procesos y Logística",
    description:
      "We document your check-in process, your housekeeping schedule, your tour booking flow, and your supplier relationships so your operation runs the same whether you're on property or back in the city. Consistency is what earns five-star reviews.",
    descriptionEs:
      "Documentamos tu proceso de check-in, tu horario de limpieza, tu flujo de reserva de tours y tus relaciones con proveedores para que tu operación funcione igual ya sea que estés en la propiedad o de vuelta en la ciudad. La consistencia es lo que genera reseñas de cinco estrellas.",
    tags: ["SOPs", "Consistency", "Operations"],
    tagsEs: ["POEs", "Consistencia", "Operaciones"],
  },
  {
    icon: Users,
    title: "Team Building & Staffing Structure",
    titleEs: "Construcción de Equipo y Estructura de Personal",
    description:
      "From hiring your first front desk staff to structuring a bilingual guest services team, we help you build the right crew for a Caribbean coast hospitality operation — people who represent your brand the moment a guest arrives at the gate.",
    descriptionEs:
      "Desde contratar a tu primer personal de recepción hasta estructurar un equipo bilingüe de servicios para huéspedes, te ayudamos a construir el equipo adecuado para una operación de hospitalidad en la costa Caribe — personas que representan tu marca en el momento en que un huésped llega a la puerta.",
    tags: ["Hiring", "Bilingual Team", "Guest Services"],
    tagsEs: ["Contratación", "Equipo Bilingüe", "Servicios al Huésped"],
  },
];
