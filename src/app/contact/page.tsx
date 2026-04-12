import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with HLPFL. Fill in the form or WhatsApp us directly. We respond within 24 hours.",
  alternates: { canonical: "https://hlpfl.org/contact" },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
