import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact — HLPFL",
  description:
    "Get in touch with HLPFL. Response within 24 hours.",
  alternates: { canonical: "https://hlpfl.org/contact/" },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
