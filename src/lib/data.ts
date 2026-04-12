import {
  Waves,
  Bird,
  Sailboat,
  Sunset,
  Users,
  TreePine,
  type LucideIcon,
} from "lucide-react";

// ─── Activities ───────────────────────────────────────────────────────────────

export interface Activity {
  id: string;
  icon: LucideIcon;
  titleEn: string;
  titleEs: string;
  descEn: string;
  descEs: string;
  locationEn: string;
  locationEs: string;
  tag: string;
}

export const activities: Activity[] = [
  {
    id: "snorkeling-cahuita",
    icon: Waves,
    titleEn: "Snorkeling & Diving",
    titleEs: "Snorkel y Buceo",
    descEn:
      "Explore the protected coral reef of Cahuita National Park — one of the largest in Costa Rica, sheltering parrotfish, sea turtles, moray eels, and vibrant coral gardens.",
    descEs:
      "Explora el arrecife de coral protegido del Parque Nacional Cahuita — uno de los más grandes de Costa Rica, que alberga peces loro, tortugas marinas, morenas y jardines de coral.",
    locationEn: "Cahuita National Park",
    locationEs: "Parque Nacional Cahuita",
    tag: "Water",
  },
  {
    id: "wildlife-watching",
    icon: Bird,
    titleEn: "Wildlife Watching",
    titleEs: "Observación de Fauna",
    descEn:
      "Spot three-toed sloths hanging in cecropia trees, toucans flashing their brilliant bills, howler monkeys calling at dawn, and green sea turtles nesting on moonlit beaches.",
    descEs:
      "Avista perezosos de tres dedos colgando en árboles de guarumo, tucanes con sus brillantes picos, monos congo aullando al amanecer y tortugas verdes anidando en playas a la luz de la luna.",
    locationEn: "Cahuita – Manzanillo corridor",
    locationEs: "Corredor Cahuita – Manzanillo",
    tag: "Wildlife",
  },
  {
    id: "kayaking-gandoca",
    icon: Sailboat,
    titleEn: "Kayaking the Wildlife Canals",
    titleEs: "Kayak por los Canales Silvestres",
    descEn:
      "Glide through the mangrove-lined canals of the Gandoca-Manzanillo Wildlife Refuge, home to manatees, caimans, river otters, and a symphony of tropical birds.",
    descEs:
      "Deslízate por los canales bordeados de manglares del Refugio de Vida Silvestre Gandoca-Manzanillo, hogar de manatíes, caimanes, nutrias de río y una sinfonía de aves tropicales.",
    locationEn: "Gandoca-Manzanillo Wildlife Refuge",
    locationEs: "Refugio Gandoca-Manzanillo",
    tag: "Water",
  },
  {
    id: "surfing-cocles",
    icon: Waves,
    titleEn: "Surfing",
    titleEs: "Surf",
    descEn:
      "Playa Cocles offers consistent beach-break waves ideal for all skill levels. Playa Negra near Cahuita is beloved for its powerful right-hand point break. Surf schools and board rentals are available.",
    descEs:
      "Playa Cocles ofrece olas de rompeolas consistentes ideales para todos los niveles. Playa Negra cerca de Cahuita es muy apreciada por su potente ola de punto a la derecha. Hay escuelas de surf y alquiler de tablas disponibles.",
    locationEn: "Playa Cocles & Playa Negra",
    locationEs: "Playa Cocles y Playa Negra",
    tag: "Water",
  },
  {
    id: "cultural-tours",
    icon: Users,
    titleEn: "Cultural Tours",
    titleEs: "Tours Culturales",
    descEn:
      "Visit Bribri indigenous communities in the Talamanca mountains for cacao ceremony experiences and traditional medicine walks. Join Afro-Caribbean history tours exploring the legacy of Jamaican railroad workers who shaped this coast.",
    descEs:
      "Visita comunidades indígenas Bribri en las montañas de Talamanca para ceremonias del cacao y caminatas de medicina tradicional. Únete a tours de historia afrocaribeña explorando el legado de los trabajadores ferroviarios jamaicanos que moldearon esta costa.",
    locationEn: "Puerto Viejo & Talamanca highlands",
    locationEs: "Puerto Viejo y tierras altas de Talamanca",
    tag: "Culture",
  },
  {
    id: "hiking-cahuita-manzanillo",
    icon: TreePine,
    titleEn: "Hiking",
    titleEs: "Senderismo",
    descEn:
      "Walk the 8-km coastal trail through Cahuita National Park, fringed by white-sand beach and primary rainforest. Hike into the Manzanillo reserve for a remote jungle-meets-sea experience rarely crowded even in high season.",
    descEs:
      "Camina el sendero costero de 8 km por el Parque Nacional Cahuita, bordeado de playa de arena blanca y bosque lluvioso primario. Senderismo en la reserva de Manzanillo para una experiencia remota de selva-mar raramente congestionada incluso en temporada alta.",
    locationEn: "Cahuita NP & Manzanillo Reserve",
    locationEs: "PN Cahuita y Reserva de Manzanillo",
    tag: "Hiking",
  },
  {
    id: "sunset-tours",
    icon: Sunset,
    titleEn: "Sunset Boat Tours",
    titleEs: "Paseos en Bote al Atardecer",
    descEn:
      "Set sail from Puerto Viejo for a golden-hour boat tour along the coast, watching frigate birds soar and dolphins play in the bow wake as the sun dips behind the Talamanca mountains.",
    descEs:
      "Zarpa desde Puerto Viejo para un paseo en bote a la hora dorada a lo largo de la costa, observando fragatas volar y delfines jugar en la proa mientras el sol se pone detrás de las montañas de Talamanca.",
    locationEn: "Puerto Viejo de Talamanca",
    locationEs: "Puerto Viejo de Talamanca",
    tag: "Water",
  },
];

// ─── Lodgings ─────────────────────────────────────────────────────────────────

export type LodgingType = "Hotel" | "Eco-Lodge" | "B&B" | "Hostel" | "Vacation Rental";
export type PriceRange = "$" | "$$" | "$$$";
export type Location = "Cahuita" | "Puerto Viejo" | "Cocles" | "Punta Uva" | "Manzanillo";

export interface Lodging {
  id: string;
  name: string;
  location: Location;
  type: LodgingType;
  price: PriceRange;
  rating: number;
  descEn: string;
  descEs: string;
  tagEn: string;
  tagEs: string;
}

export const lodgings: Lodging[] = [
  {
    id: "cahuita-national-park-lodge",
    name: "Playa Negra Guesthouse",
    location: "Cahuita",
    type: "B&B",
    price: "$$",
    rating: 4.8,
    descEn:
      "Charming Caribbean-style guesthouse steps from Playa Negra's famous surf break. Lush gardens, hammocks, and locally sourced breakfasts included.",
    descEs:
      "Encantadora casa de huéspedes de estilo caribeño a pasos del famoso rompeolas de Playa Negra. Jardines exuberantes, hamacas y desayunos con ingredientes locales incluidos.",
    tagEn: "Surf & Beach",
    tagEs: "Surf y Playa",
  },
  {
    id: "jungle-canopy-ecolodge",
    name: "Selva Bananito Lodge",
    location: "Cahuita",
    type: "Eco-Lodge",
    price: "$$$",
    rating: 4.9,
    descEn:
      "Remote eco-lodge set within a private rainforest reserve bordering Cahuita NP. Solar powered, farm-to-table meals, guided wildlife hikes included.",
    descEs:
      "Ecolodge remoto ubicado en una reserva de bosque lluvioso privada que limita con el PN Cahuita. Con energía solar, comidas de huerta a mesa y caminatas guiadas incluidas.",
    tagEn: "Eco & Wildlife",
    tagEs: "Eco y Fauna",
  },
  {
    id: "puerto-viejo-beach-hotel",
    name: "Hotel Punta Cocles",
    location: "Cocles",
    type: "Hotel",
    price: "$$",
    rating: 4.6,
    descEn:
      "Beachfront hotel on stunning Playa Cocles with direct access to surf and swimming. Pool, on-site restaurant serving Caribbean-fusion dishes, and tour desk.",
    descEs:
      "Hotel frente a la playa en la impresionante Playa Cocles con acceso directo al surf y natación. Piscina, restaurante con cocina caribeño-fusión y escritorio de tours.",
    tagEn: "Beach & Pool",
    tagEs: "Playa y Piscina",
  },
  {
    id: "punta-uva-treehouse",
    name: "Almonds & Corals Tent Camp",
    location: "Punta Uva",
    type: "Eco-Lodge",
    price: "$$$",
    rating: 4.7,
    descEn:
      "Elevated tent-cabins perched in the jungle canopy above Punta Uva's crystal-clear beach. Private decks, outdoor showers, and resident sloths in the trees.",
    descEs:
      "Cabañas-tienda elevadas en el dosel selvático sobre la playa cristalina de Punta Uva. Terrazas privadas, duchas exteriores y perezosos residentes en los árboles.",
    tagEn: "Jungle & Luxury",
    tagEs: "Selva y Lujo",
  },
  {
    id: "manzanillo-village-hostel",
    name: "Maxi's Hostel Manzanillo",
    location: "Manzanillo",
    type: "Hostel",
    price: "$",
    rating: 4.4,
    descEn:
      "Friendly backpacker hostel in the heart of tiny Manzanillo village. Ideal base for hiking the wildlife refuge and snorkeling the remote reef. Hammock porch and communal kitchen.",
    descEs:
      "Amigable hostal para mochileros en el corazón de la pequeña aldea de Manzanillo. Base ideal para senderismo en el refugio y snorkel en el arrecife remoto. Porche con hamacas y cocina comunal.",
    tagEn: "Budget & Backpacker",
    tagEs: "Económico y Mochilero",
  },
  {
    id: "puerto-viejo-vacation-villa",
    name: "Casa Caribe Vacation Villa",
    location: "Puerto Viejo",
    type: "Vacation Rental",
    price: "$$$",
    rating: 4.8,
    descEn:
      "Private 3-bedroom villa with ocean views, a full kitchen, and a private pool nestled between Puerto Viejo village and Playa Cocles. Perfect for families or groups.",
    descEs:
      "Villa privada de 3 habitaciones con vistas al mar, cocina completa y piscina privada entre el pueblo de Puerto Viejo y Playa Cocles. Perfecta para familias o grupos.",
    tagEn: "Private & Family",
    tagEs: "Privada y Familiar",
  },
  {
    id: "cahuita-town-hostel",
    name: "Bribri Backpackers Cahuita",
    location: "Cahuita",
    type: "Hostel",
    price: "$",
    rating: 4.3,
    descEn:
      "Colorful, community-run hostel in Cahuita town, walking distance to the national park entrance. Dorms and private rooms, bike rentals, and cultural tour bookings.",
    descEs:
      "Hostal colorido y comunitario en el pueblo de Cahuita, a poca distancia de la entrada al parque nacional. Dormitorios y habitaciones privadas, alquiler de bicicletas y reservas de tours culturales.",
    tagEn: "Community & Budget",
    tagEs: "Comunitario y Económico",
  },
  {
    id: "cocles-surf-bnb",
    name: "Surf & Breakfast Cocles",
    location: "Cocles",
    type: "B&B",
    price: "$$",
    rating: 4.5,
    descEn:
      "Surfer-owned B&B across the road from Playa Cocles. Board storage, surf lessons arranged, freshly squeezed juice breakfasts, and colorful Caribbean décor.",
    descEs:
      "B&B de propietario surfista frente a Playa Cocles. Almacenamiento de tablas, clases de surf, desayunos de jugos recién exprimidos y decoración caribeña colorida.",
    tagEn: "Surf & Breakfast",
    tagEs: "Surf y Desayuno",
  },
];

// ─── Restaurants ──────────────────────────────────────────────────────────────

export type CuisineType = "Afro-Caribbean" | "Seafood" | "Vegetarian" | "International" | "Local Soda";

export interface Restaurant {
  id: string;
  name: string;
  location: Location;
  cuisine: CuisineType;
  price: PriceRange;
  rating: number;
  descEn: string;
  descEs: string;
  specialtyEn: string;
  specialtyEs: string;
}

export const restaurants: Restaurant[] = [
  {
    id: "miss-edna-cahuita",
    name: "Miss Edna's Restaurant",
    location: "Cahuita",
    cuisine: "Afro-Caribbean",
    price: "$$",
    rating: 4.9,
    descEn:
      "A Cahuita institution — Miss Edna's family recipe rondon has been warming travellers for over 30 years. Come early; the pot sells out.",
    descEs:
      "Una institución de Cahuita — el rondon familiar de Miss Edna ha calentado a viajeros por más de 30 años. Llega temprano; la olla se agota.",
    specialtyEn: "Rondon stew",
    specialtyEs: "Estofado de rondon",
  },
  {
    id: "las-olas-puerto-viejo",
    name: "Las Olas Beach Bar",
    location: "Puerto Viejo",
    cuisine: "Seafood",
    price: "$$",
    rating: 4.6,
    descEn:
      "Feet-in-the-sand beach bar serving fresh ceviche, whole fried fish, and cold Imperial beer. Best sunset spot in Puerto Viejo.",
    descEs:
      "Bar de playa con los pies en la arena que sirve ceviche fresco, pescado frito entero y cerveza Imperial fría. El mejor lugar para el atardecer en Puerto Viejo.",
    specialtyEn: "Fresh ceviche & grilled fish",
    specialtyEs: "Ceviche fresco y pescado a la parrilla",
  },
  {
    id: "el-parquecito-soda",
    name: "Soda El Parquecito",
    location: "Puerto Viejo",
    cuisine: "Local Soda",
    price: "$",
    rating: 4.4,
    descEn:
      "The best rice and beans in coconut milk on the coast — a Jamaican-style breakfast staple paired with fried plantains, eggs, and strong café chorreado.",
    descEs:
      "El mejor arroz con frijoles en leche de coco de la costa — un desayuno de estilo jamaicano con plátanos fritos, huevos y fuerte café chorreado.",
    specialtyEn: "Rice & beans in coconut milk",
    specialtyEs: "Arroz con frijoles en leche de coco",
  },
  {
    id: "manzanillo-maxis",
    name: "Maxi's Restaurant",
    location: "Manzanillo",
    cuisine: "Seafood",
    price: "$$",
    rating: 4.8,
    descEn:
      "Legendary open-air restaurant at the end of the road in Manzanillo. Whole lobster, pargo rojo, and patacones con pico de gallo. Worth the drive.",
    descEs:
      "Legendario restaurante al aire libre al final de la carretera en Manzanillo. Langosta entera, pargo rojo y patacones con pico de gallo. Vale la pena el viaje.",
    specialtyEn: "Whole lobster & pargo rojo",
    specialtyEs: "Langosta entera y pargo rojo",
  },
  {
    id: "coco-loco-cocles",
    name: "Coco Loco Garden Café",
    location: "Cocles",
    cuisine: "Vegetarian",
    price: "$",
    rating: 4.5,
    descEn:
      "Garden café serving plant-based Caribbean bowls, fresh smoothies with tropical fruit, and excellent cold brew. A haven for health-conscious travelers.",
    descEs:
      "Café jardín con cuencos caribeños a base de plantas, batidos de frutas tropicales y excelente cold brew. Un paraíso para viajeros conscientes de su salud.",
    specialtyEn: "Tropical smoothie bowls",
    specialtyEs: "Cuencos de batido tropical",
  },
  {
    id: "punta-uva-seafood",
    name: "La Pecora Nera",
    location: "Punta Uva",
    cuisine: "International",
    price: "$$$",
    rating: 4.7,
    descEn:
      "Fine dining in a forest clearing near Punta Uva. Slow-food philosophy using local Caribbean ingredients elevated with Italian-inspired technique. Reservations essential.",
    descEs:
      "Gastronomía refinada en un claro del bosque cerca de Punta Uva. Filosofía slow food con ingredientes caribeños locales elevados con técnica de inspiración italiana. Reservas esenciales.",
    specialtyEn: "Seasonal tasting menu",
    specialtyEs: "Menú de degustación de temporada",
  },
  {
    id: "cahuita-reggae-bar",
    name: "Rasta Bar & Kitchen",
    location: "Cahuita",
    cuisine: "Afro-Caribbean",
    price: "$",
    rating: 4.2,
    descEn:
      "The social heartbeat of Cahuita's main strip — ice-cold Pilsen, Caribbean jerk chicken, and live reggae on weekend nights under the stars.",
    descEs:
      "El latido social del bulevar principal de Cahuita — Pilsen helada, pollo jerk caribeño y reggae en vivo las noches de fin de semana bajo las estrellas.",
    specialtyEn: "Jerk chicken & cold beer",
    specialtyEs: "Pollo jerk y cerveza fría",
  },
];

// ─── Featured Businesses (for home page carousel) ─────────────────────────────

export interface FeaturedBusiness {
  id: string;
  name: string;
  location: string;
  categoryEn: string;
  categoryEs: string;
  descEn: string;
  descEs: string;
  bgColor: string;
}

export const featuredBusinesses: FeaturedBusiness[] = [
  {
    id: "playa-negra-guesthouse",
    name: "Playa Negra Guesthouse",
    location: "Cahuita",
    categoryEn: "Hotel",
    categoryEs: "Hotel",
    descEn: "Charming Caribbean B&B steps from Playa Negra surf break.",
    descEs: "Encantador B&B caribeño a pasos del surf de Playa Negra.",
    bgColor: "from-jungle/80 to-turquoise/60",
  },
  {
    id: "almonds-corals",
    name: "Almonds & Corals",
    location: "Punta Uva",
    categoryEn: "Eco-Lodge",
    categoryEs: "Ecolodge",
    descEn: "Elevated jungle tent-cabins above Punta Uva's pristine beach.",
    descEs: "Cabañas elevadas en la selva sobre la prístina playa de Punta Uva.",
    bgColor: "from-jungle/80 to-coral/50",
  },
  {
    id: "caribe-wild-tours",
    name: "Caribe Wild Tours",
    location: "Puerto Viejo",
    categoryEn: "Tour Operator",
    categoryEs: "Operadora de Tours",
    descEn: "Expert-guided snorkeling, kayaking, and wildlife tours since 2005.",
    descEs: "Tours de snorkel, kayak y fauna silvestre con guías expertos desde 2005.",
    bgColor: "from-turquoise/70 to-jungle/60",
  },
  {
    id: "bribri-cultural-expeditions",
    name: "Bribri Cultural Expeditions",
    location: "Talamanca",
    categoryEn: "Tour Operator",
    categoryEs: "Operadora de Tours",
    descEn: "Authentic cacao ceremony and cultural immersion with the Bribri community.",
    descEs: "Ceremonia auténtica del cacao e inmersión cultural con la comunidad Bribri.",
    bgColor: "from-coral/60 to-jungle/70",
  },
  {
    id: "miss-edna-featured",
    name: "Miss Edna's Restaurant",
    location: "Cahuita",
    categoryEn: "Restaurant",
    categoryEs: "Restaurante",
    descEn: "30+ years of legendary Afro-Caribbean rondon and home cooking.",
    descEs: "Más de 30 años de legendario rondon afrocaribeño y cocina casera.",
    bgColor: "from-coral/70 to-turquoise/50",
  },
  {
    id: "maxis-featured",
    name: "Maxi's Restaurant",
    location: "Manzanillo",
    categoryEn: "Restaurant",
    categoryEs: "Restaurante",
    descEn: "At the end of the road — the best whole lobster on the Caribbean coast.",
    descEs: "Al final del camino — la mejor langosta entera de la costa Caribe.",
    bgColor: "from-turquoise/60 to-coral/60",
  },
];

// ─── Itineraries ──────────────────────────────────────────────────────────────

export interface ItineraryDay {
  dayEn: string;
  dayEs: string;
  activitiesEn: string[];
  activitiesEs: string[];
}

export interface Itinerary {
  id: string;
  titleEn: string;
  titleEs: string;
  durationEn: string;
  durationEs: string;
  taglineEn: string;
  taglineEs: string;
  days: ItineraryDay[];
}

export const itineraries: Itinerary[] = [
  {
    id: "3-day",
    titleEn: "3-Day Caribbean Highlight",
    titleEs: "3 Días en el Caribe",
    durationEn: "3 Days",
    durationEs: "3 Días",
    taglineEn: "The essential taste of Cahuita & Puerto Viejo",
    taglineEs: "Lo esencial de Cahuita y Puerto Viejo",
    days: [
      {
        dayEn: "Day 1 — Cahuita",
        dayEs: "Día 1 — Cahuita",
        activitiesEn: [
          "Morning: Snorkel tour on Cahuita National Park reef",
          "Afternoon: Walk the coastal trail through the park",
          "Evening: Dinner at Miss Edna's — try the rondon",
        ],
        activitiesEs: [
          "Mañana: Tour de snorkel en el arrecife del PN Cahuita",
          "Tarde: Caminata por el sendero costero del parque",
          "Noche: Cena en Miss Edna's — prueba el rondon",
        ],
      },
      {
        dayEn: "Day 2 — Puerto Viejo",
        dayEs: "Día 2 — Puerto Viejo",
        activitiesEn: [
          "Morning: Rent a bike and ride to Playa Cocles for surfing",
          "Afternoon: Lunch at Coco Loco Garden Café",
          "Evening: Sunset drinks at Las Olas Beach Bar",
        ],
        activitiesEs: [
          "Mañana: Alquila una bicicleta y pedalea hasta Playa Cocles para surfear",
          "Tarde: Almuerzo en Coco Loco Garden Café",
          "Noche: Tragos al atardecer en Las Olas Beach Bar",
        ],
      },
      {
        dayEn: "Day 3 — Manzanillo",
        dayEs: "Día 3 — Manzanillo",
        activitiesEn: [
          "Morning: Kayak tour through Gandoca-Manzanillo canals",
          "Afternoon: Snorkel at Manzanillo's remote reef",
          "Evening: Whole lobster dinner at Maxi's Restaurant",
        ],
        activitiesEs: [
          "Mañana: Tour en kayak por los canales de Gandoca-Manzanillo",
          "Tarde: Snorkel en el arrecife remoto de Manzanillo",
          "Noche: Cena de langosta entera en el Restaurante Maxi's",
        ],
      },
    ],
  },
  {
    id: "5-day",
    titleEn: "5-Day Culture & Nature",
    titleEs: "5 Días de Cultura y Naturaleza",
    durationEn: "5 Days",
    durationEs: "5 Días",
    taglineEn: "Dive deeper — reef, canopy, and Bribri culture",
    taglineEs: "Sumérgete más — arrecife, dosel y cultura Bribri",
    days: [
      {
        dayEn: "Day 1 — Arrival & Cahuita",
        dayEs: "Día 1 — Llegada y Cahuita",
        activitiesEn: [
          "Arrive, check in, and stroll Cahuita town",
          "Evening walk on Playa Negra at sunset",
        ],
        activitiesEs: [
          "Llega, regístrate y pasea por el pueblo de Cahuita",
          "Paseo vespertino por Playa Negra al atardecer",
        ],
      },
      {
        dayEn: "Day 2 — Cahuita National Park",
        dayEs: "Día 2 — PN Cahuita",
        activitiesEn: [
          "Full-day snorkel and coastal hiking inside the park",
          "Picnic on Playa Blanca — the white-sand beach inside the park",
        ],
        activitiesEs: [
          "Día completo de snorkel y senderismo costero dentro del parque",
          "Picnic en Playa Blanca — la playa de arena blanca dentro del parque",
        ],
      },
      {
        dayEn: "Day 3 — Bribri Cultural Tour",
        dayEs: "Día 3 — Tour Cultural Bribri",
        activitiesEn: [
          "Morning: Bribri cacao ceremony deep in Talamanca highlands",
          "Afternoon: Return via Puerto Viejo, explore Playa Cocles",
        ],
        activitiesEs: [
          "Mañana: Ceremonia del cacao Bribri en las tierras altas de Talamanca",
          "Tarde: Regreso por Puerto Viejo, explora Playa Cocles",
        ],
      },
      {
        dayEn: "Day 4 — Punta Uva & Wildlife",
        dayEs: "Día 4 — Punta Uva y Fauna",
        activitiesEn: [
          "Morning: Wildlife walk with a naturalist guide — spot sloths, toucans, and poison dart frogs",
          "Afternoon: Swim and snorkel at Punta Uva's crystal-clear bay",
        ],
        activitiesEs: [
          "Mañana: Caminata de fauna con guía naturalista — avista perezosos, tucanes y ranas venenosas",
          "Tarde: Nado y snorkel en la cristalina bahía de Punta Uva",
        ],
      },
      {
        dayEn: "Day 5 — Manzanillo & Departure",
        dayEs: "Día 5 — Manzanillo y Salida",
        activitiesEn: [
          "Morning: Kayak through Gandoca-Manzanillo mangroves",
          "Farewell lunch at Maxi's — whole fresh fish",
          "Head back along the coast road",
        ],
        activitiesEs: [
          "Mañana: Kayak por los manglares de Gandoca-Manzanillo",
          "Almuerzo de despedida en Maxi's — pescado fresco entero",
          "Regreso por la carretera costera",
        ],
      },
    ],
  },
  {
    id: "7-day",
    titleEn: "7-Day Deep Caribbean Immersion",
    titleEs: "7 Días de Inmersión Profunda en el Caribe",
    durationEn: "7 Days",
    durationEs: "7 Días",
    taglineEn: "The full corridor — turtles, reefs, culture, and wild nature",
    taglineEs: "El corredor completo — tortugas, arrecifes, cultura y naturaleza salvaje",
    days: [
      {
        dayEn: "Day 1 — Arrival & Cahuita",
        dayEs: "Día 1 — Llegada y Cahuita",
        activitiesEn: ["Settle in, evening walk on Playa Negra"],
        activitiesEs: ["Instálate, paseo vespertino por Playa Negra"],
      },
      {
        dayEn: "Day 2 — Cahuita National Park",
        dayEs: "Día 2 — PN Cahuita",
        activitiesEn: ["Full-day snorkeling & hiking the park trail"],
        activitiesEs: ["Día completo de snorkel y senderismo por el sendero del parque"],
      },
      {
        dayEn: "Day 3 — Bribri Cultural Immersion",
        dayEs: "Día 3 — Inmersión Cultural Bribri",
        activitiesEn: ["Bribri cacao ceremony and village visit in Talamanca"],
        activitiesEs: ["Ceremonia del cacao Bribri y visita a la aldea en Talamanca"],
      },
      {
        dayEn: "Day 4 — Puerto Viejo & Surf",
        dayEs: "Día 4 — Puerto Viejo y Surf",
        activitiesEn: [
          "Surf lesson at Playa Cocles",
          "Afro-Caribbean history walk in Puerto Viejo",
        ],
        activitiesEs: [
          "Clase de surf en Playa Cocles",
          "Caminata de historia afrocaribeña en Puerto Viejo",
        ],
      },
      {
        dayEn: "Day 5 — Punta Uva & Wildlife",
        dayEs: "Día 5 — Punta Uva y Fauna",
        activitiesEn: [
          "Guided wildlife walk with naturalist",
          "Snorkel at Punta Uva bay",
        ],
        activitiesEs: [
          "Caminata de fauna guiada con naturalista",
          "Snorkel en la bahía de Punta Uva",
        ],
      },
      {
        dayEn: "Day 6 — Gandoca-Manzanillo",
        dayEs: "Día 6 — Gandoca-Manzanillo",
        activitiesEn: [
          "Morning: Kayak through wildlife refuge canals",
          "Afternoon: Hike Manzanillo reserve to remote beach",
          "Evening: Sunset dinner at Maxi's",
        ],
        activitiesEs: [
          "Mañana: Kayak por los canales del refugio de vida silvestre",
          "Tarde: Senderismo en la reserva de Manzanillo hasta la playa remota",
          "Noche: Cena al atardecer en Maxi's",
        ],
      },
      {
        dayEn: "Day 7 — Rest & Departure",
        dayEs: "Día 7 — Descanso y Salida",
        activitiesEn: [
          "Morning swim and final Caribbean breakfast",
          "Head back to San José refreshed and recharged",
        ],
        activitiesEs: [
          "Baño matutino y último desayuno caribeño",
          "Regreso a San José renovado y recargado",
        ],
      },
    ],
  },
];
