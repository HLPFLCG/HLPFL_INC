import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Resources for Caribbean Coast Operators",
  description:
    "Guides, tips, and strategies for hospitality operators in the Cahuita–Manzanillo corridor. Booking systems, marketing, ICT registration, and more.",
  alternates: { canonical: "https://hlpfl.org/blog/" },
};

const posts = [
  {
    slug: "ict-registration-guide-tour-operators-costa-rica",
    title: "ICT Registration Guide for Tour Operators in Costa Rica",
    desc: "Everything you need to know about registering your tour operation with the Instituto Costarricense de Turismo.",
  },
  {
    slug: "low-season-marketing-cahuita-hotels",
    title: "Low Season Marketing Strategies for Cahuita Hotels",
    desc: "How to fill rooms when the peak crowds leave — digital marketing tactics that work for Caribbean coast properties.",
  },
  {
    slug: "how-to-get-direct-bookings-puerto-viejo",
    title: "How to Get Direct Bookings in Puerto Viejo",
    desc: "Stop paying 15%+ to OTAs. Build a direct booking system that works for your lodge or vacation rental.",
  },
  {
    slug: "sinpe-movil-setup-vacation-rentals",
    title: "SINPE Móvil Setup for Vacation Rentals",
    desc: "Accept instant bank transfers from Costa Rican guests and simplify your payment flow.",
  },
  {
    slug: "whatsapp-booking-automation-caribbean-coast",
    title: "WhatsApp Booking Automation for Caribbean Coast Businesses",
    desc: "Automate booking confirmations, follow-ups, and guest communication on WhatsApp Business.",
  },
];

export default function BlogPage() {
  return (
    <div className="pt-24 min-h-screen">
      <section className="section">
        <div className="container-custom">
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">Resources</span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide leading-none mb-6">
            Blog
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mb-16">
            Guides and strategies for hospitality operators on Costa Rica&apos;s Caribbean coast.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-void-light border border-void-lighter p-8 group transition-all duration-300 hover:border-gold/25 hover:-translate-y-1 block"
              >
                <h2 className="font-display text-2xl text-white tracking-wide mb-3 group-hover:text-gold transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{post.desc}</p>
                <span className="text-gold text-sm tracking-wider">Coming Soon →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
