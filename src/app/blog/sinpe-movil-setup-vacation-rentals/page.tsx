import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SINPE Móvil Setup for Vacation Rentals",
  description: "Coming soon — SINPE Móvil Setup for Vacation Rentals. A guide for Caribbean coast hospitality operators by HLPFL.",
  alternates: { canonical: "https://hlpfl.org/blog/sinpe-movil-setup-vacation-rentals/" },
};

export default function BlogPost() {
  return (
    <div className="pt-24 min-h-screen">
      <section className="section">
        <div className="max-w-[800px] mx-auto px-4">
          <Link href="/blog" className="text-gold text-sm tracking-wider hover:text-gold-light transition-colors mb-8 block">
            ← Back to Blog
          </Link>
          <h1 className="font-display text-4xl md:text-6xl tracking-wide leading-none mb-6">
            SINPE Móvil Setup for Vacation Rentals
          </h1>
          <div className="bg-void-light border border-void-lighter p-8 text-center">
            <p className="text-gray-400 text-base leading-relaxed mb-6">
              This article is coming soon. We&apos;re writing comprehensive guides for Caribbean coast hospitality operators.
            </p>
            <Link href="/contact" className="btn-primary">Get Notified When It&apos;s Live</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
