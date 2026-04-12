import type { Metadata } from "next";
import {
  HeroSection,
  TrustBar,
  HowItWorks,
  ValueStack,
  ServicesSection,
  AboutSection,
  TestimonialsSection,
  CTASection,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "HLPFL | Chaos → Clarity for Caribbean Coast Hospitality",
  description:
    "HLPFL helps hotels, eco-lodges, restaurants, and tour operators between Cahuita and Manzanillo build the systems, brand, and digital presence that turn a beautiful operation into a fully booked one.",
  alternates: { canonical: "https://hlpfl.org" },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <HowItWorks />
      <ValueStack />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
