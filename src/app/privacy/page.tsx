import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Caribe Sur CR",
  description:
    "Caribe Sur CR privacy policy — how we collect, use, and protect your personal information. Compliant with Costa Rican Law 8968 and GDPR.",
  alternates: {
    canonical: "https://hlpfl.org/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="py-20 px-4 text-center text-white"
        style={{ background: "linear-gradient(135deg, #1B4332 0%, #0E9AA7 100%)" }}
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-white/70 text-sm">
          Last updated: April 2025 — Compliant with Costa Rican Law 8968 &amp; GDPR
        </p>
      </div>

      {/* Content */}
      <section className="section bg-sandy-light">
        <div className="container-custom max-w-3xl">
          <div className="space-y-8">
            {[
              {
                title: "Information We Collect",
                content: (
                  <div className="space-y-3 text-gray-600">
                    <p>We collect information you provide directly when you interact with our services, including:</p>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      <li>Name, email address, and contact information when you submit a business listing form</li>
                      <li>Business details (name, category, location, description) for directory listings</li>
                      <li>Communications you send to us</li>
                    </ul>
                    <p>We also automatically collect technical information when you visit our website, such as browser type and general usage analytics through privacy-respecting tools.</p>
                  </div>
                ),
              },
              {
                title: "How We Use Your Information",
                content: (
                  <div className="space-y-3 text-gray-600">
                    <p>We use your data to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      <li>Review and publish business directory listings</li>
                      <li>Communicate with you about your listing</li>
                      <li>Improve our website and services</li>
                      <li>Comply with legal obligations under Costa Rican Law 8968</li>
                    </ul>
                    <p>We will never sell your personal information. We do not use your data for advertising purposes.</p>
                  </div>
                ),
              },
              {
                title: "Cookies",
                content: (
                  <p className="text-gray-600">
                    We use cookies to enhance your experience. You may decline non-essential cookies using the banner displayed when you first visit the site. Declining cookies will not affect your ability to browse the site. Functional cookies necessary for site operation may still be used.
                  </p>
                ),
              },
              {
                title: "Data Security",
                content: (
                  <p className="text-gray-600">
                    We implement industry-standard security measures including encrypted data transmission (SSL/TLS) and secure data storage. While no electronic storage method is 100% secure, we are committed to protecting your data and will notify you promptly in the unlikely event of a breach.
                  </p>
                ),
              },
              {
                title: "Your Rights (Law 8968 & GDPR)",
                content: (
                  <div className="space-y-3 text-gray-600">
                    <p>You have the right to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      <li>Access the personal information we hold about you</li>
                      <li>Request correction of inaccurate or incomplete data</li>
                      <li>Request deletion of your personal information</li>
                      <li>Opt out of non-essential communications at any time</li>
                      <li>Request a copy of your data in a portable format</li>
                    </ul>
                    <p>To exercise any of these rights, please contact us. We will respond to all requests within 30 days.</p>
                  </div>
                ),
              },
              {
                title: "Contact",
                content: (
                  <div className="text-gray-600">
                    <p>Questions about this privacy policy?</p>
                    <p className="mt-2">
                      <strong>Email:</strong>{" "}
                      <a href="mailto:hello@caribesur.cr" className="text-turquoise hover:underline">
                        hello@caribesur.cr
                      </a>
                    </p>
                    <p className="mt-1">
                      <strong>Site:</strong> Caribe Sur CR — Southern Caribbean Coast Tourism Guide
                    </p>
                  </div>
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
