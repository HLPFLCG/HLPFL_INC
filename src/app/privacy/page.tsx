import type { Metadata } from "next";
import { ScrollReveal, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "HLPFL INC privacy policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section pt-24 md:pt-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
                Legal
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
                Privacy <span className="text-gradient">Policy</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                Your privacy matters to us. This policy explains how HLPFL INC
                collects, uses, and protects your personal information.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="section pt-8">
        <div className="container-custom max-w-4xl">
          <ScrollReveal>
            <p className="text-gray-500 text-sm mb-12 text-center">
              Last updated: January 2026
            </p>
          </ScrollReveal>

          {/* Information We Collect */}
          <ScrollReveal>
            <Card variant="bordered" className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-gold mb-4">
                Information We Collect
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  We collect information you provide directly when you interact
                  with our services, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    Name, email address, and contact information when you submit
                    an application or contact form
                  </li>
                  <li>
                    Portfolio materials, creative work samples, and business
                    information you share during consultations
                  </li>
                  <li>
                    Account credentials if you create a portal account
                  </li>
                  <li>
                    Communications you send to us, including emails and form
                    submissions
                  </li>
                </ul>
                <p>
                  We also automatically collect certain technical information
                  when you visit our website, such as browser type, device
                  information, and general usage analytics through
                  privacy-respecting tools.
                </p>
              </div>
            </Card>
          </ScrollReveal>

          {/* How We Use Your Information */}
          <ScrollReveal>
            <Card variant="bordered" className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-gold mb-4">
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  As a 501(c)(3) nonprofit, we use your information solely to
                  fulfill our mission of supporting creative entrepreneurs. We
                  use your data to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    Evaluate applications and provide our business support
                    services
                  </li>
                  <li>
                    Communicate with you about your projects, services, and
                    opportunities
                  </li>
                  <li>
                    Process transactions related to our commission-based services
                  </li>
                  <li>
                    Improve our website, services, and user experience
                  </li>
                  <li>
                    Send occasional updates about HLPFL INC programs and
                    initiatives (you can opt out at any time)
                  </li>
                </ul>
                <p>
                  We will never sell your personal information. We do not use
                  your data for advertising purposes.
                </p>
              </div>
            </Card>
          </ScrollReveal>

          {/* Third-Party Services */}
          <ScrollReveal>
            <Card variant="bordered" className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-gold mb-4">
                Third-Party Services
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  We may use trusted third-party services to help operate our
                  website and deliver our services, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    Hosting and infrastructure providers
                  </li>
                  <li>
                    Payment processors for commission-related transactions
                  </li>
                  <li>
                    Analytics tools that help us understand website usage
                    patterns
                  </li>
                  <li>
                    Email service providers for communications
                  </li>
                </ul>
                <p>
                  These third parties are contractually obligated to protect your
                  data and may only use it for the specific purposes we define.
                  We do not share your creative work or portfolio materials with
                  any third party without your explicit consent.
                </p>
              </div>
            </Card>
          </ScrollReveal>

          {/* Data Security */}
          <ScrollReveal>
            <Card variant="bordered" className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-gold mb-4">
                Data Security
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  We implement industry-standard security measures to protect
                  your personal information, including encrypted data
                  transmission (SSL/TLS), secure data storage, and regular
                  security assessments.
                </p>
                <p>
                  While no method of electronic storage or transmission is 100%
                  secure, we are committed to protecting your data to the best of
                  our ability and will notify you promptly in the unlikely event
                  of a data breach.
                </p>
              </div>
            </Card>
          </ScrollReveal>

          {/* Your Rights */}
          <ScrollReveal>
            <Card variant="bordered" className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-gold mb-4">
                Your Rights
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    Access the personal information we hold about you
                  </li>
                  <li>
                    Request correction of inaccurate or incomplete data
                  </li>
                  <li>
                    Request deletion of your personal information
                  </li>
                  <li>
                    Opt out of non-essential communications at any time
                  </li>
                  <li>
                    Request a copy of your data in a portable format
                  </li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us using the
                  information below. We will respond to all requests within 30
                  days.
                </p>
              </div>
            </Card>
          </ScrollReveal>

          {/* Contact Us */}
          <ScrollReveal>
            <Card variant="bordered" className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-gold mb-4">
                Contact Us
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  If you have any questions about this privacy policy or how we
                  handle your data, please reach out:
                </p>
                <p>
                  <span className="text-white font-medium">Email:</span>{" "}
                  <a
                    href="mailto:contact@hlpfl.org"
                    className="text-gold hover:text-gold-light transition-colors"
                  >
                    contact@hlpfl.org
                  </a>
                </p>
                <p>
                  <span className="text-white font-medium">Organization:</span>{" "}
                  HLPFL INC, a Wyoming 501(c)(3) nonprofit corporation
                </p>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
