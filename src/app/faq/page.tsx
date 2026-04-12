import type { Metadata } from "next";
import FAQPageClient from "./FAQPageClient";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about HLPFL services for hospitality operators in the Cahuita–Manzanillo corridor, Costa Rica Caribbean coast.",
  alternates: { canonical: "https://hlpfl.org/faq/" },
};

export default function FAQPage() {
  return <FAQPageClient />;
}
