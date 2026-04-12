import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientEffects from "@/components/common/ClientEffects";
import CookieBanner from "@/components/common/CookieBanner";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://hlpfl.org"),
  title: {
    default: "HLPFL | Chaos → Clarity for Caribbean Coast Hospitality",
    template: "%s | HLPFL",
  },
  description:
    "HLPFL helps hotels, eco-lodges, restaurants, and tour operators between Cahuita and Manzanillo build the systems, brand, and digital presence that turn a beautiful operation into a fully booked one.",
  keywords: [
    "hospitality consulting Costa Rica",
    "Caribbean coast business consulting",
    "hotel marketing Cahuita",
    "eco-lodge branding Puerto Viejo",
    "tour operator systems Costa Rica",
    "online booking setup Caribbean Costa Rica",
    "HLPFL",
    "Chaos to Clarity",
    "restaurant marketing Manzanillo",
    "vacation rental management Costa Rica",
    "ICT tourism registration Costa Rica",
    "Limon Province hospitality",
    "digital marketing Caribbean coast",
    "hospitality business strategy",
    "bilingual website Costa Rica",
  ],
  authors: [{ name: "HLPFL" }],
  creator: "HLPFL",
  publisher: "HLPFL",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "https://hlpfl.org" },
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/favicon.ico" },
  openGraph: {
    title: "HLPFL | Chaos → Clarity for Caribbean Coast Hospitality",
    description:
      "B2B consulting for hotels, eco-lodges, restaurants, and tour operators in the Cahuita–Manzanillo corridor. Systems, brand, and digital presence — fully booked.",
    type: "website",
    siteName: "HLPFL",
    locale: "en_US",
    url: "https://hlpfl.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "HLPFL | Chaos → Clarity for Caribbean Coast Hospitality",
    description:
      "B2B consulting for hospitality operators in Costa Rica's Caribbean coast corridor.",
    creator: "@hlpfl",
    site: "@hlpfl",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "business",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://hlpfl.org/#organization",
  name: "HLPFL",
  description:
    "B2B consulting agency helping hospitality and tourism businesses in the Cahuita–Manzanillo corridor of Costa Rica's Caribbean coast build systems, brand, and digital presence.",
  url: "https://hlpfl.org",
  areaServed: {
    "@type": "GeoShape",
    name: "Cahuita–Manzanillo Corridor, Limón Province, Costa Rica",
  },
  serviceType: [
    "Digital Marketing",
    "Online Booking Systems",
    "Software Integration",
    "Visual Identity & Branding",
    "Professional Website Development",
    "Legal & Entity Setup",
    "Business Strategy",
    "Systems & Processes",
    "Team Building",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-void text-white font-body antialiased">
        <LanguageProvider>
          <ClientEffects />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
