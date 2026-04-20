import type { Metadata } from "next";
import PrivacyPageClient from "./PrivacyPageClient";

export const metadata: Metadata = {
  title: "Privacy Policy — HLPFL",
  description: "HLPFL Privacy Policy — no tracking, no cookies, no data collection.",
  alternates: { canonical: "https://hlpfl.org/privacy/" },
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
