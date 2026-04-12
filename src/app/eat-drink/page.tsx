import type { Metadata } from "next";
import EatDrinkPageClient from "./EatDrinkPageClient";

export const metadata: Metadata = {
  title: "Eat & Drink | Best Restaurants on the Caribbean Coast of Costa Rica",
  description:
    "Taste the Afro-Caribbean flavors of the Costa Rica Caribbean coast — rondon stew, rice and beans in coconut milk, fresh ceviche, patacones, and agua de pipa. Find the best restaurants in Cahuita, Puerto Viejo, and Manzanillo.",
  alternates: {
    canonical: "https://hlpfl.org/eat-drink",
  },
};

export default function EatDrinkPage() {
  return <EatDrinkPageClient />;
}
