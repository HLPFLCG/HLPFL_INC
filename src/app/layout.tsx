import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
  title: "HLPFL INC | Empowering Creative Entrepreneurs",
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
  ],
  authors: [{ name: "HLPFL INC" }],
  creator: "HLPFL INC",
  publisher: "HLPFL INC",
  openGraph: {
    title: "HLPFL INC | Empowering Creative Entrepreneurs",
    description:
      "Nonprofit supporting creative entrepreneurs with zero upfront costs. We earn when you earn.",
    type: "website",
    siteName: "HLPFL INC",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HLPFL INC | Empowering Creative Entrepreneurs",
    description:
      "Nonprofit business support for creative entrepreneurs. Zero upfront costs.",
    creator: "@hlpfl",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Structured data for nonprofit organization
const structuredData = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "HLPFL INC",
  alternateName: "HLPFL",
  url: "https://hlpfl.org",
  description:
    "Nonprofit organization empowering creative entrepreneurs with professional business support services. Zero upfront costs, commission-only model.",
  nonprofitStatus: "Nonprofit501c3",
  areaServed: "Worldwide",
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
  ],
  sameAs: [
    "https://twitter.com/hlpfl",
    "https://instagram.com/hlpfl",
    "https://linkedin.com/company/hlpfl",
    "https://youtube.com/@hlpfl",
  ],
};

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
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
