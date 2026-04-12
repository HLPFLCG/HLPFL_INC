import type { Metadata } from "next";
import ListWithUsPageClient from "./ListWithUsPageClient";

export const metadata: Metadata = {
  title: "List Your Business | Caribe Sur CR — Caribbean Coast of Costa Rica",
  description:
    "List your hotel, tour, restaurant, or business on Caribe Sur CR for free. Reach thousands of travelers exploring the southern Caribbean coast of Costa Rica from Cahuita to Manzanillo.",
  alternates: {
    canonical: "https://hlpfl.org/list-with-us",
  },
};

export default function ListWithUsPage() {
  return <ListWithUsPageClient />;
}
