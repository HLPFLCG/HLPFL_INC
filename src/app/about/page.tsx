import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About — HLPFL",
  description:
    "Built by someone who's been there. 7 years as an entrepreneur.",
  alternates: { canonical: "https://hlpfl.org/about/" },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
