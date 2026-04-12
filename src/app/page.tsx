import type { Metadata } from "next";
import {
  HeroSection,
  TrustBar,
  PainSection,
  HowItWorks,
  ValueStack,
  ServicesSection,
  ResultsSection,
  CompetitorSection,
  AboutSection,
  TestimonialsSection,
  CTASection,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "HLPFL | Caribbean Coast Hospitality Marketing & Systems",
  description:
    "HLPFL helps hotels, lodges & tour operators from Cahuita to Manzanillo turn chaos into clarity. Booking systems, branding, digital marketing. Bilingual. Costa Rica Caribbean coast.",
  alternates: { canonical: "https://hlpfl.org/" },
  openGraph: {
    title: "HLPFL | Chaos → Clarity for Caribbean Coast Hospitality",
    description:
      "Systems, branding, and digital marketing built exclusively for hospitality operators in Limón Province, Costa Rica.",
    images: [{ url: "/images/og-caribbean-coast.webp" }],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <PainSection />
      <HowItWorks />
      <ValueStack />
      <ServicesSection />
      <ResultsSection />
      <CompetitorSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
