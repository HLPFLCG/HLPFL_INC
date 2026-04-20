import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import WhatsAppSticky from "@/components/common/WhatsAppSticky";
import ClientEffects from "@/components/common/ClientEffects";
import CookieBanner from "@/components/common/CookieBanner";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://hlpfl.org"),
  title: {
    default: "HLPFL | Caribbean Coast Hospitality Marketing & Systems",
    template: "%s | HLPFL",
  },
  description:
    "HLPFL helps hotels, lodges & tour operators from Cahuita to Manzanillo turn chaos into clarity. Booking systems, branding, digital marketing. Bilingual. Costa Rica Caribbean coast.",
  keywords: [
    "Cahuita marketing agency for hotels",
    "Puerto Viejo tour operator website",
    "eco-lodge booking system Costa Rica",
    "Caribbean coast hospitality consultant",
    "how to get more bookings in Puerto Viejo",
    "ICT registration help Costa Rica tourism",
    "Manzanillo wildlife guide marketing",
    "Limón Province hotel digital marketing",
    "HLPFL Costa Rica",
    "hospitality consulting Costa Rica",
    "Caribbean coast business consulting",
    "hotel marketing Cahuita",
    "eco-lodge branding Puerto Viejo",
    "tour operator systems Costa Rica",
    "online booking setup Caribbean Costa Rica",
  ],
  authors: [{ name: "HLPFL" }],
  creator: "HLPFL",
  publisher: "HLPFL",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "https://hlpfl.org/" },
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/favicon.ico" },
  openGraph: {
    title: "HLPFL | Chaos → Clarity for Caribbean Coast Hospitality",
    description:
      "Systems, branding, and digital marketing built exclusively for hospitality operators in Limón Province, Costa Rica.",
    type: "website",
    siteName: "HLPFL",
    locale: "en_US",
    url: "https://hlpfl.org",
    images: [{ url: "/images/og-caribbean-coast.webp" }],
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
  "@type": "LocalBusiness",
  name: "HLPFL",
  description:
    "Hospitality and tourism business consulting for the Caribbean coast of Costa Rica — Cahuita to Manzanillo corridor.",
  url: "https://hlpfl.org",
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: "9.7489",
      longitude: "-82.8149",
    },
    geoRadius: "40000",
  },
  serviceType: [
    "Digital Marketing",
    "Website Design",
    "Business Consulting",
    "Booking System Setup",
    "Brand Identity",
  ],
  inLanguage: ["en", "es"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-void text-white font-body antialiased">
        <LanguageProvider>
          <a href="#main-content" className="skip-link">Saltar al contenido / Skip to content</a>
          <ClientEffects />
          <Header />
          <main id="main-content" className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppSticky />
          <MobileBottomNav />
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
