import type { Metadata } from "next";
import PlanPageClient from "./PlanPageClient";

export const metadata: Metadata = {
  title: "Plan Your Trip | Costa Rica Caribbean Coast Travel Guide",
  description:
    "Plan your trip to the Caribbean coast of Costa Rica — getting here by bus or car, best time to visit, sample itineraries (3-day, 5-day, 7-day), packing lists, currency tips, and wildlife dos and don'ts.",
  alternates: {
    canonical: "https://hlpfl.org/plan",
  },
};

export default function PlanPage() {
  return <PlanPageClient />;
}
