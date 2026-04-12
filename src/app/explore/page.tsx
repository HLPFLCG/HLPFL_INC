import type { Metadata } from "next";
import ExplorePageClient from "./ExplorePageClient";

export const metadata: Metadata = {
  title: "Explore | Things to Do on the Caribbean Coast of Costa Rica",
  description:
    "Discover the best activities on the southern Caribbean coast of Costa Rica — snorkeling at Cahuita reef, kayaking Gandoca-Manzanillo canals, surfing Playa Cocles, Bribri cultural tours, wildlife watching, and hiking.",
  alternates: {
    canonical: "https://hlpfl.org/explore",
  },
};

export default function ExplorePage() {
  return <ExplorePageClient />;
}
