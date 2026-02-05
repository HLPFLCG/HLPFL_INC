import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientEffects from "@/components/ClientEffects";

// Font configurations
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hlpfl.org"),
  title: {
    default: "HLPFL INC | Empowering Creative Entrepreneurs",
    template: "%s | HLPFL INC",
  },
  description:
    "Wyoming 501(c)(3) nonprofit supporting creative entrepreneurs with professional business services. Zero upfront costs, commission-only model. Serving inventors, musicians, artists, designers, and writers.",
  keywords: [
    "creative entrepreneur",
    "nonprofit business support",
    "commission-only",
    "no upfront fees",
    "artist services",
    "inventor support",
    "creative business",
    "independent artist",
    "brand development",
    "business formation",
    "sales representation",
    "501c3 nonprofit",
    "HLPFL",
    "creative entrepreneur support",
    "artist management nonprofit",
    "creator economy",
    "independent creator services",
    "nonprofit for artists",
    "musician business support",
    "designer business services",
    "writer support nonprofit",
    "inventor commercialization",
    "fair creator contracts",
    "transparent business model",
    "no exploitation nonprofit",
  ],
  authors: [{ name: "HLPFL INC" }],
  creator: "HLPFL INC",
  publisher: "HLPFL INC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://hlpfl.org",
  },
  openGraph: {
    title: "HLPFL INC | Empowering Creative Entrepreneurs",
    description:
      "Nonprofit supporting creative entrepreneurs with zero upfront costs. We earn when you earn. No VCs, No Exploitation, No Bullshit.",
    type: "website",
    siteName: "HLPFL INC",
    locale: "en_US",
    url: "https://hlpfl.org",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "HLPFL INC - Empowering Creative Entrepreneurs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HLPFL INC | Empowering Creative Entrepreneurs",
    description:
      "Nonprofit business support for creative entrepreneurs. Zero upfront costs. We earn when you earn.",
    creator: "@hlpfl",
    site: "@hlpfl",
    images: ["/og-image.svg"],
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
  verification: {
    google: "google-site-verification-code",
  },
  category: "nonprofit",
};

// Structured data for nonprofit organization
const structuredDataOrg = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": "https://hlpfl.org/#organization",
  name: "HLPFL INC",
  alternateName: "HLPFL",
  url: "https://hlpfl.org",
  logo: "https://hlpfl.org/logo.svg",
  image: "https://hlpfl.org/og-image.svg",
  description:
    "Wyoming 501(c)(3) nonprofit organization empowering creative entrepreneurs with professional business support services. Zero upfront costs, commission-only model.",
  nonprofitStatus: "Nonprofit501c3",
  areaServed: { "@type": "Place", name: "Worldwide" },
  founder: {
    "@type": "Person",
    name: "James Rockel III",
    jobTitle: "Founder & CEO",
  },
  foundingDate: "2025",
  slogan: "Empowering Creative Entrepreneurs",
  knowsAbout: [
    "Brand Development",
    "Business Formation",
    "Sales Representation",
    "Marketing Strategy",
    "Content Creation",
    "Creator Education",
    "Creative Entrepreneurship",
    "Artist Management",
  ],
  sameAs: [
    "https://twitter.com/hlpfl",
    "https://instagram.com/hlpfl",
    "https://linkedin.com/company/hlpfl",
    "https://youtube.com/@hlpfl",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@hlpfl.org",
    contactType: "customer service",
    availableLanguage: "English",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "WY",
    addressCountry: "US",
  },
};

const structuredDataWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://hlpfl.org/#website",
  url: "https://hlpfl.org",
  name: "HLPFL INC",
  description: "Nonprofit empowering creative entrepreneurs",
  publisher: { "@id": "https://hlpfl.org/#organization" },
};

const structuredDataServices = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "HLPFL Services",
  itemListElement: [
    { "@type": "Service", position: 1, name: "Brand Development", description: "Logo design, visual identity, and market positioning" },
    { "@type": "Service", position: 2, name: "Business Formation", description: "LLC filing, entity structure, and compliance" },
    { "@type": "Service", position: 3, name: "Sales Representation", description: "Direct sales and deal negotiation" },
    { "@type": "Service", position: 4, name: "Marketing Strategy", description: "Campaign planning and execution" },
    { "@type": "Service", position: 5, name: "Content Creation", description: "Video, photography, and social media" },
    { "@type": "Service", position: 6, name: "Creator Education", description: "Rights education and business fundamentals" },
  ],
};

const structuredData = [structuredDataOrg, structuredDataWebsite, structuredDataServices];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-void text-white font-body antialiased">
        <ClientEffects />
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
