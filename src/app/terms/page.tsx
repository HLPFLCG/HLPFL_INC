import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Caribe Sur CR",
  description:
    "Terms of service for Caribe Sur CR — the Caribbean coast of Costa Rica travel guide. Learn about listing guidelines, user responsibilities, and our commitment to the community.",
  alternates: {
    canonical: "https://hlpfl.org/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="py-20 px-4 text-center text-white"
        style={{ background: "linear-gradient(135deg, #1B4332 0%, #0E9AA7 100%)" }}
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
          Terms of Service
        </h1>
        <p className="text-white/70 text-sm">Last updated: April 2025</p>
      </div>

      {/* Content */}
      <section className="section bg-sandy-light">
        <div className="container-custom max-w-3xl">
          <div className="space-y-8">
            {[
              {
                title: "Acceptance of Terms",
                content: (
                  <p className="text-gray-600">
                    By accessing or using the Caribe Sur CR website, you agree to be bound by these Terms of
                    Service. If you do not agree to these terms, please do not use the site. We may update these
                    terms from time to time; continued use constitutes acceptance of any changes.
                  </p>
                ),
              },
              {
                title: "Site Purpose",
                content: (
                  <p className="text-gray-600">
                    Caribe Sur CR is a travel guide and business directory for the southern Caribbean coast of
                    Costa Rica — specifically the corridor from Cahuita to Manzanillo in Limón Province. The site
                    provides informational content and connects travelers with local tourism and hospitality
                    businesses.
                  </p>
                ),
              },
              {
                title: "Business Listings",
                content: (
                  <div className="space-y-3 text-gray-600">
                    <p>Businesses listed on Caribe Sur CR agree to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      <li>Provide accurate and truthful information in their listing submission</li>
                      <li>Operate within the geographic scope of the Cahuita–Manzanillo corridor</li>
                      <li>Maintain current and up-to-date contact information</li>
                      <li>Comply with all applicable Costa Rican laws and regulations</li>
                    </ul>
                    <p>Caribe Sur CR reserves the right to decline, remove, or modify any listing at its discretion.</p>
                  </div>
                ),
              },
              {
                title: "User Responsibilities",
                content: (
                  <div className="space-y-3 text-gray-600">
                    <p>When using Caribe Sur CR, you agree to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      <li>Use the site for lawful purposes only</li>
                      <li>Not copy, scrape, or reproduce content without permission</li>
                      <li>Not submit false or misleading information</li>
                      <li>Respect the privacy and intellectual property of listed businesses</li>
                    </ul>
                  </div>
                ),
              },
              {
                title: "Disclaimers",
                content: (
                  <div className="space-y-3 text-gray-600">
                    <p>
                      The information on Caribe Sur CR is provided for general informational purposes only.
                      While we strive to keep content accurate and up to date, we make no warranties about the
                      completeness, reliability, or accuracy of information about third-party businesses,
                      opening hours, prices, or availability.
                    </p>
                    <p>
                      Always verify details directly with service providers before booking or traveling.
                      Caribe Sur CR is not responsible for any loss, inconvenience, or harm arising from
                      reliance on information on this site.
                    </p>
                  </div>
                ),
              },
              {
                title: "Governing Law",
                content: (
                  <p className="text-gray-600">
                    These terms are governed by the laws of the Republic of Costa Rica. Any disputes arising
                    from these terms shall be subject to the jurisdiction of Costa Rican courts.
                  </p>
                ),
              },
              {
                title: "Contact",
                content: (
                  <p className="text-gray-600">
                    Questions about these terms? Contact us at{" "}
                    <a href="mailto:hello@caribesur.cr" className="text-turquoise hover:underline">
                      hello@caribesur.cr
                    </a>
                  </p>
                ),
              },
            ].map(({ title, content }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-display text-2xl font-bold text-jungle mb-4">{title}</h2>
                {content}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
