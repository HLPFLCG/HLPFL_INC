import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About HLPFL",
  description:
    "HLPFL is a B2B consulting agency focused exclusively on hospitality and tourism operators in the Cahuita–Manzanillo corridor of Costa Rica's Caribbean coast.",
  alternates: { canonical: "https://hlpfl.org/about" },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
