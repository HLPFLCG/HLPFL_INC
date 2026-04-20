import type { Metadata } from "next";
import FAQPageClient from "./FAQPageClient";

export const metadata: Metadata = {
  title: "FAQ — HLPFL",
  description:
    "Frequently asked questions about HLPFL web services, pricing, delivery, and policies.",
  alternates: { canonical: "https://hlpfl.org/faq/" },
};

export default function FAQPage() {
  return <FAQPageClient />;
}
