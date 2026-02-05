import type { Metadata } from "next";
import { ScrollReveal, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "HLPFL INC terms of service. Our commitment to fair, transparent business practices for creative entrepreneurs.",
};

export default function TermsOfServicePage() {
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
                Terms of <span className="text-gradient">Service</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                Clear, fair terms that reflect our commitment to transparency
                and creator protection.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="section pt-8">
        <div className="container-custom max-w-4xl">
          <ScrollReveal>
            <p className="text-gray-500 text-sm mb-12 text-center">
              Last updated: January 2026
            </p>
          </ScrollReveal>

          {/* Acceptance of Terms */}
          <ScrollReveal>
            <Card variant="bordered" className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-gold mb-4">
                Acceptance of Terms
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  By accessing or using the HLPFL INC website and services, you
                  agree to be bound by these Terms of Service. If you do not
                  agree to these terms, please do not use our services.
                </p>
                <p>
                  HLPFL INC is a Wyoming 501(c)(3) nonprofit corporation. These
                  terms govern your use of our website, portal, and all services
                  we provide. We may update these terms from time to time, and
                  continued use of our services constitutes acceptance of any
                  changes.
                </p>
              </div>
            </Card>
          </ScrollReveal>

          {/* Services Description */}
          <ScrollReveal>
            <Card variant="bordered" className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-gold mb-4">
                Services Description
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  HLPFL INC provides business support services for creative
                  entrepreneurs, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Brand development and visual identity</li>
                  <li>Business formation and compliance guidance</li>
                  <li>Sales representation and deal negotiation</li>
                  <li>Marketing strategy and campaign execution</li>
                  <li>Content creation and production support</li>
                  <li>Creator education and rights advocacy</li>
                </ul>
                <p>
                  Specific services are agreed upon during the consultation
                  process and documented in individual service agreements. We
                  reserve the right to decline service if we believe we cannot
                  effectively help a prospective client.
                </p>
              </div>
            </Card>
          </ScrollReveal>

          {/* Commission Model */}
          <ScrollReveal>
            <Card variant="bordered" className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-gold mb-4">
                Commission Model
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  HLPFL INC operates on a commission-only model. This means:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    There are no upfront fees, retainers, or deposits required to
                    begin services
                  </li>
                  <li>
                    Commission rates typically range from 15% to 30% and are
                    negotiated per project before work begins
                  </li>
                  <li>
                    Commissions are only earned when our work generates revenue
                    for you
                  </li>
                  <li>
                    All commission structures are documented in writing before
                    services commence
                  </li>
                </ul>
                <p>
                  If our efforts do not generate revenue, you owe nothing. Our
                  success is directly tied to yours.
                </p>
              </div>
            </Card>
          </ScrollReveal>

          {/* User Responsibilities */}
          <ScrollReveal>
            <Card variant="bordered" className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-gold mb-4">
                User Responsibilities
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>When using our services, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    Provide accurate and truthful information in applications and
                    communications
                  </li>
                  <li>
                    Maintain the confidentiality of any portal account
                    credentials
                  </li>
                  <li>
                    Respond to communications in a timely manner to facilitate
                    service delivery
                  </li>
                  <li>
                    Not use our services for any unlawful purpose or in violation
                    of these terms
                  </li>
                  <li>
                    Honor agreed-upon commission structures and payment timelines
                  </li>
                </ul>
              </div>
            </Card>
          </ScrollReveal>

          {/* Intellectual Property */}
          <ScrollReveal>
            <Card variant="bordered" className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-gold mb-4">
                Intellectual Property
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  <span className="text-white font-medium">
                    You retain 100% ownership of your intellectual property.
                  </span>{" "}
                  This is a core principle of HLPFL INC. Any creative work,
                  inventions, designs, music, writing, or other intellectual
                  property you bring to us remains entirely yours.
                </p>
                <p>
                  Materials created by HLPFL INC on your behalf (such as
                  marketing materials, brand assets, and content) are
                  transferred to you upon completion unless otherwise specified
                  in your service agreement.
                </p>
                <p>
                  The HLPFL INC name, logo, and website content are the
                  property of HLPFL INC and may not be used without written
                  permission.
                </p>
              </div>
            </Card>
          </ScrollReveal>

          {/* Limitation of Liability */}
          <ScrollReveal>
            <Card variant="bordered" className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-gold mb-4">
                Limitation of Liability
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  HLPFL INC provides services on a best-effort basis. While we
                  are committed to delivering quality work, we cannot guarantee
                  specific financial outcomes or results.
                </p>
                <p>
                  To the maximum extent permitted by law, HLPFL INC shall not be
                  liable for any indirect, incidental, special, or consequential
                  damages arising out of or in connection with our services.
                </p>
                <p>
                  Our total liability for any claim related to our services
                  shall not exceed the total commissions paid to HLPFL INC by
                  you in the twelve months preceding the claim.
                </p>
              </div>
            </Card>
          </ScrollReveal>

          {/* Governing Law */}
          <ScrollReveal>
            <Card variant="bordered" className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-gold mb-4">
                Governing Law
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  These Terms of Service are governed by and construed in
                  accordance with the laws of the State of Wyoming, without
                  regard to its conflict of law provisions.
                </p>
                <p>
                  Any disputes arising from these terms or our services shall be
                  resolved through good-faith negotiation first. If a resolution
                  cannot be reached, disputes shall be submitted to binding
                  arbitration in the State of Wyoming in accordance with
                  applicable arbitration rules.
                </p>
              </div>
            </Card>
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal>
            <Card variant="bordered" className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-gold mb-4">
                Contact
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  If you have any questions about these Terms of Service, please
                  contact us:
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
