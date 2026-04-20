import type { Metadata } from "next";
import {
  HeroSection,
  TrustBar,
  PainSection,
  ServicesPreview,
  PackagesPreview,
  WhyHLPFL,
  TestimonialsSection,
  HomeCTA,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "HLPFL | Modern Services. Local Prices.",
  description:
    "Websites, Google presence, branding, and more — built by hand, delivered fast, priced for real business. Starting at $49.",
  alternates: { canonical: "https://hlpfl.org/" },
  openGraph: {
    title: "HLPFL | Modern Services. Local Prices.",
    description:
      "Your website, Google presence, and brand — built by hand, delivered fast, priced for real business. Starting at $49.",
    images: [{ url: "/images/og-caribbean-coast.webp" }],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <PainSection />
      <ServicesPreview />
      <PackagesPreview />
      <WhyHLPFL />
      <TestimonialsSection />
      <HomeCTA />
    </>
  );
}
