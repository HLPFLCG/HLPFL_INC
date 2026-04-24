"use client";

import { ScrollReveal } from "@/components/ui";

const EFFECTIVE_DATE = "April 24, 2026";
const LAST_UPDATED = "April 24, 2026";
const ENTITY = "HLPFL INC";
const PRIVACY_EMAIL = "hello@hlpfl.org";

export default function PrivacyPageClient() {
  return (
    <div className="pt-24 min-h-screen bg-void">
      <section className="section">
        <div className="max-w-[800px] mx-auto px-4">
          <ScrollReveal>
            <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">
              Legal
            </span>
            <h1 className="font-display text-5xl md:text-7xl tracking-wide leading-none mb-4 text-white">
              Privacy Policy
            </h1>
            <p className="text-gray-400 text-sm mb-1">
              <strong className="text-gray-300">Effective Date:</strong>{" "}
              {EFFECTIVE_DATE}
            </p>
            <p className="text-gray-400 text-sm mb-12">
              <strong className="text-gray-300">Last Updated:</strong>{" "}
              {LAST_UPDATED}
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-12">
              This Privacy Policy explains how{" "}
              <strong className="text-gray-300">{ENTITY}</strong> (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;), operator of{" "}
              <strong className="text-gray-300">HLPFL.org</strong> (the
              &ldquo;Site&rdquo;), handles information in connection with your
              use of the Site and any coaching or consulting services we offer
              (the &ldquo;Services&rdquo;). By using the Site, you agree to this
              Privacy Policy. If you do not agree, do not use the Site.
            </p>
          </ScrollReveal>

          <div className="space-y-10">
            <PolicySection
              heading="1. Summary"
              delay={0.05}
              body="We operate the Site with privacy as a default. We do not sell personal information, we do not run behavioral advertising, and we do not build profiles on visitors. The only information we handle is what is necessary to operate the Site, respond to inquiries you send us, and deliver Services to paying clients."
            />

            <PolicySection heading="2. Information We Do Not Collect" delay={0.1}>
              <p className="text-gray-500 text-base leading-relaxed mb-3">
                Unless you affirmatively submit it, we do not collect:
              </p>
              <BulletList
                items={[
                  "Your name, address, phone number, or email",
                  "Payment card data (payments, if any, are processed by a third-party processor — see Section 5)",
                  "Biometric, geolocation (beyond approximate IP-based region), health, or other sensitive data",
                  "Information from or about children under 13 (see Section 9)",
                ]}
              />
            </PolicySection>

            <PolicySection
              heading="3. Information Automatically Collected"
              delay={0.15}
            >
              <p className="text-gray-500 text-base leading-relaxed mb-3">
                Like virtually every website, our hosting provider may
                automatically log basic technical information when you visit the
                Site, including:
              </p>
              <BulletList
                items={[
                  "IP address (used for security, abuse prevention, and approximate regional statistics)",
                  "Browser type and version",
                  "Operating system",
                  "Referring URL",
                  "Date, time, and pages viewed",
                ]}
              />
              <p className="text-gray-500 text-base leading-relaxed mt-3">
                This information is used solely for security, troubleshooting,
                and understanding general traffic patterns. It is not linked to
                your identity and is retained only as long as reasonably
                necessary for those purposes.
              </p>
            </PolicySection>

            <PolicySection
              heading="4. Information You Voluntarily Provide"
              delay={0.2}
            >
              <p className="text-gray-500 text-base leading-relaxed mb-3">
                If you contact us through an email link, contact form, or booking
                tool, or if you become a client, we will receive the information
                you choose to send (typically name, email address, and the
                contents of your message). We use that information only to:
              </p>
              <BulletList
                items={[
                  "Respond to your inquiry",
                  "Provide the Services you have requested",
                  "Send service-related communications (such as scheduling confirmations or invoices)",
                  "Comply with our legal obligations",
                ]}
              />
              <p className="text-gray-500 text-base leading-relaxed mt-3">
                We do not use this information for marketing unless you have
                separately and expressly opted in.
              </p>
            </PolicySection>

            <PolicySection heading="5. Third-Party Services" delay={0.25}>
              <p className="text-gray-500 text-base leading-relaxed mb-3">
                We may rely on reputable third-party vendors to operate the Site
                and Services, which may independently process limited information
                on our behalf. These may include:
              </p>
              <BulletList
                items={[
                  "Web hosting and DNS provider — for Site delivery",
                  "Payment processor (e.g., Stripe, Square, or PayPal) — if you purchase Services, your payment details are submitted directly to the processor; we do not receive or store full card numbers",
                  "Email provider — for correspondence",
                  "Scheduling or video-call tools — if used to book or conduct sessions",
                ]}
              />
              <p className="text-gray-500 text-base leading-relaxed mt-3">
                Each of these vendors maintains its own privacy policy, which
                governs how it handles information you provide to it.
              </p>
            </PolicySection>

            <PolicySection
              heading="6. Cookies and Similar Technologies"
              delay={0.3}
              body="The Site uses only the minimum cookies and storage technologies necessary for basic functionality. We do not use third-party advertising cookies. If we use any analytics in the future, we will update this Policy and our Cookie Policy accordingly. You can block or delete cookies through your browser settings at any time."
            />

            <PolicySection heading="7. How We Use Information" delay={0.35}>
              <p className="text-gray-500 text-base leading-relaxed mb-3">
                We use the limited information described above only to:
              </p>
              <BulletList
                items={[
                  "Operate, maintain, and secure the Site",
                  "Communicate with you when you contact us",
                  "Provide and administer paid Services",
                  "Comply with law, respond to legal process, and enforce our Terms of Service",
                  "Detect and prevent fraud, abuse, or unauthorized access",
                ]}
              />
              <p className="text-gray-500 text-base leading-relaxed mt-3">
                We do not sell, rent, or trade personal information, and we do
                not use it for automated decision-making with legal or similarly
                significant effects.
              </p>
            </PolicySection>

            <PolicySection heading="8. How We Share Information" delay={0.4}>
              <p className="text-gray-500 text-base leading-relaxed mb-3">
                We do not share personal information with third parties except:
              </p>
              <BulletList
                items={[
                  "With service providers acting on our behalf (Section 5), under obligations of confidentiality",
                  "When required by subpoena, court order, or other legal obligation",
                  "To protect our rights, property, or safety, or that of our users or the public",
                  "In connection with a merger, acquisition, or sale of assets, with continued privacy protections",
                ]}
              />
            </PolicySection>

            <PolicySection
              heading="9. Children's Privacy"
              delay={0.45}
              body="The Site and Services are intended for adults aged 18 and over. We do not knowingly collect information from children under 13. If you believe a child has submitted information to us, please contact us and we will delete it."
            />

            <PolicySection heading="10. Your Rights" delay={0.5}>
              <p className="text-gray-500 text-base leading-relaxed mb-3">
                Depending on where you live, you may have rights under applicable
                privacy law, including:
              </p>
              <BulletList
                items={[
                  "EU / UK (GDPR / UK GDPR): rights to access, rectify, erase, restrict or object to processing, data portability, and to lodge a complaint with your supervisory authority.",
                  "California (CCPA/CPRA): rights to know, delete, correct, and limit use of sensitive personal information, and to opt out of \"sale\" or \"sharing\" (we do neither).",
                  "Other US states (including Colorado, Connecticut, Virginia, Utah, Texas, Oregon, Montana, and others with comparable laws): rights substantially similar to those above.",
                  "Canada (PIPEDA), Brazil (LGPD), and other jurisdictions: rights under local law.",
                ]}
              />
              <p className="text-gray-500 text-base leading-relaxed mt-3">
                To exercise any right, email us at{" "}
                <a
                  href={`mailto:${PRIVACY_EMAIL}`}
                  className="text-gold hover:underline"
                >
                  {PRIVACY_EMAIL}
                </a>
                . We will respond within the time required by applicable law. We
                will not discriminate against you for exercising a privacy right.
              </p>
            </PolicySection>

            <PolicySection
              heading="11. International Users and Data Transfers"
              delay={0.55}
              body="The Site is operated from the United States. If you access it from outside the United States, you understand that any information you submit will be processed in the United States, which may have data-protection laws different from your own. By using the Site, you consent to that transfer."
            />

            <PolicySection heading="12. Data Retention" delay={0.6} body="We retain information only as long as necessary for the purposes described in this Policy, to comply with legal obligations, resolve disputes, and enforce our agreements. Server logs are typically retained for a short operational window." />

            <PolicySection
              heading="13. Security"
              delay={0.65}
              body="We use reasonable administrative and technical safeguards appropriate to the limited information we handle. However, no internet transmission or storage is ever completely secure, and we cannot guarantee absolute security."
            />

            <PolicySection
              heading="14. Changes to This Policy"
              delay={0.7}
              body='We may update this Policy from time to time. The "Last Updated" date above reflects the most recent version. Material changes will be posted on this page. Continued use of the Site after an update constitutes acceptance of the revised Policy.'
            />

            <PolicySection heading="15. Contact" delay={0.75}>
              <p className="text-gray-500 text-base leading-relaxed">
                Questions, concerns, or privacy requests should be directed to:
              </p>
              <div className="mt-3 space-y-1">
                <p className="text-gray-400 font-semibold">{ENTITY}</p>
                <p className="text-gray-500">
                  Email:{" "}
                  <a
                    href={`mailto:${PRIVACY_EMAIL}`}
                    className="text-gold hover:underline"
                  >
                    {PRIVACY_EMAIL}
                  </a>
                </p>
              </div>
            </PolicySection>
          </div>
        </div>
      </section>
    </div>
  );
}

function PolicySection({
  heading,
  body,
  delay = 0,
  children,
}: {
  heading: string;
  body?: string;
  delay?: number;
  children?: React.ReactNode;
}) {
  return (
    <ScrollReveal delay={delay}>
      <div>
        <h2 className="font-display text-2xl text-white tracking-wide mb-3">
          {heading}
        </h2>
        {body && (
          <p className="text-gray-500 text-base leading-relaxed">{body}</p>
        )}
        {children}
      </div>
    </ScrollReveal>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside space-y-1.5 text-gray-500 text-base leading-relaxed pl-2">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
