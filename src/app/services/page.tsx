import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Services — HLPFL",
  description:
    "À la carte web services — websites, branding, SEO, Shopify stores, social media content, and more. Starting at $15.",
  alternates: { canonical: "https://hlpfl.org/services/" },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
