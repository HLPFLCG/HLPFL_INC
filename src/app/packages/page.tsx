import type { Metadata } from "next";
import PackagesPageClient from "./PackagesPageClient";

export const metadata: Metadata = {
  title: "Packages — HLPFL",
  description:
    "Bundled web service packages — Get Online $79, Local Pro $199, Digital Storefront $299, Full Brand $499.",
  alternates: { canonical: "https://hlpfl.org/packages/" },
};

export default function PackagesPage() {
  return <PackagesPageClient />;
}
