import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Nine services for hospitality and tourism operators in Costa Rica's Caribbean coast corridor — digital marketing, online booking, branding, website, legal setup, strategy, systems, and team building.",
  alternates: { canonical: "https://hlpfl.org/services" },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
