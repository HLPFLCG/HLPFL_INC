import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About | Caribe Sur CR — Caribbean Coast of Costa Rica",
  description:
    "Caribe Sur CR supports sustainable, community-rooted tourism on the southern Caribbean coast of Costa Rica. Learn about our mission and commitment to Afro-Caribbean and Bribri cultural respect.",
  alternates: {
    canonical: "https://hlpfl.org/about",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
