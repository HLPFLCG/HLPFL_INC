import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Get Direct Bookings in Puerto Viejo",
  description: "Coming soon — How to Get Direct Bookings in Puerto Viejo. A guide for Caribbean coast hospitality operators by HLPFL.",
  alternates: { canonical: "https://hlpfl.org/blog/how-to-get-direct-bookings-puerto-viejo/" },
};

export default function BlogPost() {
  return (
    <div className="pt-24 min-h-screen bg-cream">
      <section className="section">
        <div className="max-w-[800px] mx-auto px-4">
          <Link href="/blog" className="text-sea text-sm tracking-wider hover:text-canopy transition-colors mb-8 block">
            ← Back to Blog
          </Link>
          <h1 className="font-display text-4xl md:text-6xl tracking-wide leading-none mb-6">
            How to Get Direct Bookings in Puerto Viejo
          </h1>
          <div className="bg-mist border border-sea/15 p-8 text-center">
            <p className="text-fog text-base leading-relaxed mb-6">
              This article is coming soon. We&apos;re writing comprehensive guides for Caribbean coast hospitality operators.
            </p>
            <Link href="/contact" className="btn-primary">Get Notified When It&apos;s Live</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
