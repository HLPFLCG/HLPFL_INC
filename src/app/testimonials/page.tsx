import type { Metadata } from "next";
import TestimonialsPageClient from "./TestimonialsPageClient";

export const metadata: Metadata = {
  title: "Testimonials — HLPFL",
  description: "What clients say about HLPFL web services.",
  alternates: { canonical: "https://hlpfl.org/testimonials/" },
};

export default function TestimonialsPage() {
  return <TestimonialsPageClient />;
}
