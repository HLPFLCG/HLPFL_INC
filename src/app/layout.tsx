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
    "Tools, resources, and community for creative entrepreneurs. No contracts, no exploitation—just support for your creative journey.",
  keywords: [
    "creative entrepreneur",
    "artist resources",
    "creative tools",
    "music distribution",
    "independent artists",
    "creative business",
  ],
  openGraph: {
    title: "HLPFL INC | Empowering Creative Entrepreneurs",
    description:
      "Tools, resources, and community for creative entrepreneurs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-void text-white font-body antialiased">
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
