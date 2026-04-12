import type { Metadata } from "next";
import StayPageClient from "./StayPageClient";

export const metadata: Metadata = {
  title: "Where to Stay | Hotels & Eco-Lodges on the Caribbean Coast of Costa Rica",
  description:
    "Find the best hotels, eco-lodges, B&Bs, hostels, and vacation rentals in Cahuita, Puerto Viejo, Playa Cocles, Punta Uva, and Manzanillo on the Caribbean coast of Costa Rica.",
  alternates: {
    canonical: "https://hlpfl.org/stay",
  },
};

export default function StayPage() {
  return <StayPageClient />;
}
