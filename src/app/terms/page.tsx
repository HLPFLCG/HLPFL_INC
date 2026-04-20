import type { Metadata } from "next";
import TermsPageClient from "./TermsPageClient";

export const metadata: Metadata = {
  title: "Terms of Service — HLPFL",
  description: "HLPFL Terms of Service — à la carte web services, Stripe payments, month-to-month retainers.",
  alternates: { canonical: "https://hlpfl.org/terms/" },
};

export default function TermsPage() {
  return <TermsPageClient />;
}
