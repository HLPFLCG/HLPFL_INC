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
    default: "Caribe Sur CR | Costa Rica Caribbean Coast Travel Guide",
    template: "%s | Caribe Sur CR",
  },
  description:
    "Your guide to the southern Caribbean coast of Costa Rica — things to do in Cahuita, hotels in Puerto Viejo, Manzanillo wildlife refuge tours, restaurants, and sustainable travel in Limón Province.",
  keywords: [
    "things to do in Cahuita Costa Rica",
    "Puerto Viejo hotels",
    "Manzanillo wildlife refuge tour",
    "Caribbean coast Costa Rica travel",
    "Caribe Sur",
    "Costa Rica Caribbean tourism",
    "Cahuita National Park",
    "Gandoca Manzanillo wildlife refuge",
    "Puerto Viejo de Talamanca",
    "Limon Province Costa Rica",
    "eco lodge Caribbean Costa Rica",
    "Afro-Caribbean culture Costa Rica",
    "Bribri indigenous tours",
    "snorkeling Cahuita",
    "surfing Playa Cocles",
    "Caribbean coast restaurants",
    "Punta Uva beach",
    "sustainable tourism Costa Rica",
  ],
  authors: [{ name: "Caribe Sur CR" }],
  creator: "Caribe Sur CR",
  publisher: "Caribe Sur CR",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://hlpfl.org",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Caribe Sur CR | Costa Rica Caribbean Coast Travel Guide",
    description:
      "Explore the wild Caribbean coast of Costa Rica — from Cahuita to Manzanillo. Find hotels, tours, restaurants, and travel tips for Limón Province.",
    type: "website",
    siteName: "Caribe Sur CR",
    locale: "en_US",
    url: "https://hlpfl.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caribe Sur CR | Costa Rica Caribbean Coast Travel Guide",
    description:
      "Explore the wild Caribbean coast of Costa Rica — hotels, tours, restaurants and travel tips from Cahuita to Manzanillo.",
    creator: "@caribesur_cr",
    site: "@caribesur_cr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "travel",
};

const structuredDataDestination = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "@id": "https://hlpfl.org/#destination",
  name: "Southern Caribbean Coast of Costa Rica",
  description:
    "The corridor from Cahuita to Manzanillo in Limón Province, Costa Rica — featuring Cahuita National Park coral reefs, Gandoca-Manzanillo Wildlife Refuge, Afro-Caribbean culture, and Bribri indigenous heritage.",
  url: "https://hlpfl.org",
  touristType: ["Eco-tourists", "Adventure travelers", "Cultural tourists", "Beach travelers"],
  includesAttraction: [
    { "@type": "TouristAttraction", name: "Cahuita National Park" },
    { "@type": "TouristAttraction", name: "Gandoca-Manzanillo Wildlife Refuge" },
    { "@type": "TouristAttraction", name: "Playa Cocles" },
    { "@type": "TouristAttraction", name: "Punta Uva" },
    { "@type": "TouristAttraction", name: "Manzanillo Village" },
  ],
  geo: {
    "@type": "GeoCoordinates",
    latitude: "9.6565",
    longitude: "-82.7536",
  },
};

const structuredDataWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://hlpfl.org/#website",
  url: "https://hlpfl.org",
  name: "Caribe Sur CR",
  description:
    "Travel guide for the southern Caribbean coast of Costa Rica — Cahuita to Manzanillo corridor.",
  inLanguage: ["en", "es"],
};

const structuredData = [structuredDataDestination, structuredDataWebsite];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-sandy-light text-dark font-body antialiased">
        <LanguageProvider>
          <ClientEffects />
          <Header />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
