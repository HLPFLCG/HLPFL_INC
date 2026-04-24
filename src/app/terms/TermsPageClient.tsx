"use client";

import { ScrollReveal } from "@/components/ui";

const EFFECTIVE_DATE = "April 24, 2026";
const LAST_UPDATED = "April 24, 2026";
const ENTITY = "HLPFL INC";
const CONTACT_EMAIL = "hello@hlpfl.org";

export default function TermsPageClient() {
  return (
    <div className="pt-24 min-h-screen bg-void">
      <section className="section">
        <div className="max-w-[800px] mx-auto px-4">
          <ScrollReveal>
            <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">
              Legal
            </span>
            <h1 className="font-display text-5xl md:text-7xl tracking-wide leading-none mb-4 text-white">
              Terms of Service
            </h1>
            <p className="text-gray-400 text-sm mb-1">
              <strong className="text-gray-300">Effective Date:</strong>{" "}
              {EFFECTIVE_DATE}
            </p>
            <p className="text-gray-400 text-sm mb-8">
              <strong className="text-gray-300">Last Updated:</strong>{" "}
              {LAST_UPDATED}
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-6">
              These Terms of Service (&ldquo;Terms&rdquo;) are a binding legal
              agreement between you (&ldquo;you&rdquo; or &ldquo;Client&rdquo;)
              and <strong className="text-gray-300">{ENTITY}</strong>{" "}
              (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;), which operates the website{" "}
              <strong className="text-gray-300">HLPFL.org</strong> (the
              &ldquo;Site&rdquo;) and provides business and career coaching and
              consulting services (the &ldquo;Services&rdquo;).
            </p>
            <p className="text-gray-300 text-sm leading-relaxed font-semibold mb-12 border border-gold/30 rounded p-4 bg-gold/5">
              PLEASE READ THESE TERMS CAREFULLY. THEY CONTAIN A BINDING
              ARBITRATION CLAUSE, A CLASS-ACTION WAIVER, A NO-REFUND POLICY, AND
              A LIMITATION OF LIABILITY. BY ACCESSING THE SITE OR PURCHASING ANY
              SERVICES, YOU AGREE TO THESE TERMS. If you do not agree, do not
              use the Site or purchase Services.
            </p>
          </ScrollReveal>

          <div className="space-y-10">
            <TermsSection heading="1. Eligibility" delay={0.05}>
              <p className="text-gray-500 text-base leading-relaxed">
                You represent that you are at least 18 years old, have the legal
                capacity to enter into a binding contract, and are not barred
                from receiving the Services under the laws of any applicable
                jurisdiction. If you are using the Services on behalf of a
                company or other entity, you represent that you have authority
                to bind that entity, and &ldquo;you&rdquo; includes that entity.
              </p>
            </TermsSection>

            <TermsSection
              heading="2. Nature of the Services — What We Do and Don't Do"
              delay={0.1}
            >
              <p className="text-gray-500 text-base leading-relaxed mb-3">
                The Services consist of business and career coaching, strategy,
                and consulting delivered through calls, messages, written
                materials, and similar means.
              </p>
              <p className="text-gray-400 text-base leading-relaxed mb-3 font-semibold">
                The Services are for educational, informational, and motivational
                purposes only. They are not, and must not be relied upon as:
              </p>
              <BulletList
                items={[
                  "Legal advice",
                  "Financial, investment, tax, or accounting advice",
                  "Medical, mental-health, psychological, or therapeutic services",
                  "Employment placement or recruiting services",
                  "A guarantee, warranty, or prediction of any specific business, career, income, promotion, hiring, or other outcome",
                ]}
              />
              <p className="text-gray-500 text-base leading-relaxed mt-3">
                No coach-client, attorney-client, fiduciary, therapeutic, or
                employer-employee relationship is created by your use of the
                Site or the Services. You are solely responsible for your own
                business, career, financial, and personal decisions and
                outcomes. You are strongly encouraged to consult qualified
                licensed professionals (attorneys, accountants, licensed
                therapists, etc.) for matters within their expertise.
              </p>
            </TermsSection>

            <TermsSection
              heading="3. No Guarantee of Results"
              delay={0.15}
              body='Coaching outcomes depend entirely on your own effort, judgment, circumstances, resources, and actions — most of which are outside our control. We make no representation, warranty, or guarantee that you will earn any particular income, obtain or retain any job or promotion, grow any business, achieve any goal, or derive any specific benefit from the Services. Any testimonials, case studies, or examples on the Site are illustrative of individual results only and are not typical or promised.'
            />

            <TermsSection heading="4. Your Responsibilities" delay={0.2}>
              <p className="text-gray-500 text-base leading-relaxed mb-3">
                You agree that:
              </p>
              <BulletList
                items={[
                  "You will provide accurate, current information when engaging the Services.",
                  "You will exercise your own independent judgment before acting on any information, suggestion, idea, strategy, or recommendation discussed in connection with the Services.",
                  "You are solely responsible for any decision you make and any action you take, and for all consequences of those decisions and actions.",
                  "You will comply with all applicable laws.",
                  "You will not use the Services for any unlawful, fraudulent, harassing, defamatory, or harmful purpose.",
                ]}
              />
            </TermsSection>

            <TermsSection
              heading="5. Fees, Payment, and No Refunds"
              delay={0.25}
            >
              <SubSection heading="5.1 Fees">
                Fees for the Services are as stated at the time of purchase or
                in a written engagement document. All prices are in U.S. dollars
                unless stated otherwise and exclude applicable taxes, which are
                your responsibility.
              </SubSection>
              <SubSection heading="5.2 Payment">
                Payment is due in advance of the Services (or on the schedule
                stated at purchase). Payments are processed by a third-party
                payment processor; you agree to that processor&apos;s terms.
              </SubSection>
              <SubSection heading="5.3 ALL SALES ARE FINAL — NO REFUNDS">
                Except where a non-waivable right of refund or cancellation is
                required by applicable law,{" "}
                <strong className="text-gray-300">
                  all payments for Services are non-refundable in whole and in
                  part, under any circumstance
                </strong>
                , including but not limited to your dissatisfaction with the
                Services, failure to attend scheduled sessions, change of mind,
                change in circumstances, unused sessions, early termination, or
                the results (or lack of results) you experience. No partial
                refunds, credits, or pro-rated refunds will be issued.
              </SubSection>
              <SubSection heading="5.4 Chargebacks">
                Initiating a chargeback, payment reversal, or dispute with your
                bank or card issuer in violation of this Section is a material
                breach of these Terms. You agree to reimburse us for all fees,
                costs, and attorneys&apos; fees we incur responding to any
                wrongful chargeback, and we may pursue collection and report the
                matter to credit agencies to the extent permitted by law.
              </SubSection>
              <SubSection heading="5.5 Rescheduling and Missed Sessions">
                Any rescheduling policy will be stated at the time of booking.
                Sessions missed or cancelled in violation of that policy are
                forfeited with no refund or credit.
              </SubSection>
              <SubSection heading="5.6 Late Payment">
                Any past-due amount bears interest at the lesser of 1.5% per
                month or the maximum rate permitted by Wyoming law, plus
                collection costs.
              </SubSection>
            </TermsSection>

            <TermsSection heading="6. Intellectual Property" delay={0.3}>
              <SubSection heading="6.1 Our IP">
                All content on the Site and in the Services — including text,
                graphics, audio, video, methodologies, frameworks, worksheets,
                course materials, templates, and branding — is owned by us or
                our licensors and is protected by U.S. and international
                intellectual-property laws. You are granted a limited,
                non-exclusive, non-transferable, revocable license to access and
                use the Site and any purchased materials solely for your personal
                (or internal business) use in connection with the Services.
              </SubSection>
              <SubSection heading="6.2 Restrictions">
                You may not, and may not permit any third party to: copy,
                reproduce, publicly display, publish, distribute, sell, license,
                sublicense, modify, reverse-engineer, create derivative works
                from, or use any of our content or methodologies for any
                commercial purpose, for any coaching or consulting business, or
                to train, fine-tune, or evaluate any artificial-intelligence or
                machine-learning model, in each case without our prior written
                permission.
              </SubSection>
              <SubSection heading="6.3 Feedback">
                If you provide suggestions, ideas, or feedback, you grant us a
                perpetual, worldwide, royalty-free, sublicensable, irrevocable
                license to use it for any purpose without obligation.
              </SubSection>
            </TermsSection>

            <TermsSection heading="7. Confidentiality" delay={0.35}>
              <p className="text-gray-500 text-base leading-relaxed">
                We will treat non-public information you share with us during
                the Services as confidential and will not disclose it except (a)
                as needed to perform the Services, (b) as required by law or
                legal process, (c) to enforce these Terms, or (d) to protect
                rights, property, or safety. We may use anonymized, aggregated,
                or de-identified information — including generalized lessons
                learned from engagements — for our own business purposes without
                restriction. You agree not to disclose our confidential
                information, methodologies, or proprietary materials to any
                third party.
              </p>
            </TermsSection>

            <TermsSection
              heading="8. Testimonials and Use of Name/Likeness"
              delay={0.4}
              body="If you voluntarily provide a testimonial or review, you grant us a perpetual, worldwide, royalty-free, sublicensable license to use it, and to use your first name, last initial, general title, and likeness (if provided), for marketing and promotional purposes. You can withdraw future use by emailing us, though copies already distributed need not be recalled."
            />

            <TermsSection
              heading="9. Third-Party Links and Resources"
              delay={0.45}
              body="The Site may link to third-party websites, tools, or content. We do not control and are not responsible for third-party sites or materials, and linking does not imply endorsement."
            />

            <TermsSection
              heading="10. Disclaimer of Warranties"
              delay={0.5}
            >
              <p className="text-gray-300 text-base leading-relaxed font-semibold mb-3">
                THE SITE AND SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND
                &ldquo;AS AVAILABLE,&rdquo; WITH ALL FAULTS AND WITHOUT ANY
                WARRANTY OF ANY KIND.
              </p>
              <p className="text-gray-500 text-base leading-relaxed mb-3">
                To the fullest extent permitted by law, we disclaim all
                warranties, express or implied, including but not limited to
                implied warranties of merchantability, fitness for a particular
                purpose, title, non-infringement, quiet enjoyment, accuracy,
                availability, and any warranties arising from course of dealing
                or usage of trade.
              </p>
              <p className="text-gray-500 text-base leading-relaxed mb-3">
                Without limiting the foregoing, we do not warrant that the Site
                or Services will be uninterrupted, error-free, secure, accurate,
                complete, current, or meet your expectations, or that any
                specific results will be achieved.
              </p>
              <p className="text-gray-500 text-base leading-relaxed">
                Some jurisdictions do not allow the exclusion of certain
                warranties, so some of these exclusions may not apply to you to
                the extent prohibited; in that case, any such warranty is
                limited to the minimum duration and extent required by law.
              </p>
            </TermsSection>

            <TermsSection heading="11. Limitation of Liability" delay={0.55}>
              <p className="text-gray-300 text-base leading-relaxed font-semibold mb-3">
                TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL WE OR
                OUR OWNERS, OFFICERS, EMPLOYEES, CONTRACTORS, AGENTS, OR
                AFFILIATES BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY:
              </p>
              <BulletList
                items={[
                  "Indirect, incidental, consequential, special, exemplary, or punitive damages;",
                  "Lost profits, lost revenue, lost business opportunity, lost savings, lost goodwill, lost data, or cost of substitute services;",
                  "Damages arising from your business, career, financial, investment, employment, health, or personal decisions;",
                ]}
              />
              <p className="text-gray-500 text-base leading-relaxed mt-3 mb-3">
                in each case arising out of or related to the Site, the
                Services, or these Terms, whether in contract, tort (including
                negligence), strict liability, or any other theory, and whether
                or not we have been advised of the possibility of such damages.
              </p>
              <p className="text-gray-300 text-base leading-relaxed font-semibold mb-3">
                OUR TOTAL CUMULATIVE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT
                OF OR RELATED TO THE SITE, THE SERVICES, OR THESE TERMS IS
                CAPPED AT THE GREATER OF (A) THE AMOUNT YOU ACTUALLY PAID US FOR
                THE SERVICES GIVING RISE TO THE CLAIM IN THE SIX (6) MONTHS
                IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM, OR
                (B) ONE HUNDRED U.S. DOLLARS (US $100).
              </p>
              <p className="text-gray-500 text-base leading-relaxed">
                The limitations in this Section apply even if any limited remedy
                fails of its essential purpose, and are an essential basis of
                the bargain between you and us; our pricing reflects this
                allocation of risk. Some jurisdictions do not allow certain
                limitations; in those jurisdictions, our liability is limited to
                the minimum extent permitted by law.
              </p>
            </TermsSection>

            <TermsSection heading="12. Indemnification" delay={0.6}>
              <p className="text-gray-500 text-base leading-relaxed">
                You agree to defend, indemnify, and hold harmless the Company
                and its owners, officers, employees, contractors, agents, and
                affiliates from and against any and all claims, damages, losses,
                liabilities, costs, and expenses (including reasonable
                attorneys&apos; fees) arising out of or related to: (a) your use
                of the Site or Services; (b) your breach of these Terms; (c)
                your violation of any law or the rights of any third party; (d)
                any decision or action you take in reliance on the Services; or
                (e) any content or information you provide to us.
              </p>
            </TermsSection>

            <TermsSection heading="13. Assumption of Risk" delay={0.65}>
              <p className="text-gray-500 text-base leading-relaxed">
                You acknowledge and agree that business and career coaching
                involves discussion and decision-making that may lead to
                significant professional, financial, and personal consequences,
                and that you assume all risks associated with acting on
                information discussed in connection with the Services.
              </p>
            </TermsSection>

            <TermsSection heading="14. Termination" delay={0.7}>
              <p className="text-gray-500 text-base leading-relaxed">
                We may suspend or terminate your access to the Site or the
                Services, and/or these Terms, at any time, for any reason or no
                reason, with or without notice, including for violation of these
                Terms. Upon termination, your right to use the Services ceases,
                but Sections 5.3 (No Refunds), 6 (IP), 7 (Confidentiality),
                10–13, 15–23, and any provision that by its nature should
                survive, will survive.
              </p>
            </TermsSection>

            <TermsSection
              heading="15. Governing Law and Venue"
              delay={0.75}
            >
              <p className="text-gray-500 text-base leading-relaxed">
                These Terms and any dispute arising out of or related to the
                Site or the Services are governed by the laws of the{" "}
                <strong className="text-gray-300">
                  State of Wyoming, USA
                </strong>
                , without regard to its conflict-of-law principles. Subject to
                Section 16, the exclusive venue for any judicial proceeding
                permitted by these Terms (such as to compel arbitration, confirm
                an award, or seek injunctive relief) will be the state or
                federal courts located in Wyoming, and each party consents to
                personal jurisdiction there. The U.N. Convention on Contracts
                for the International Sale of Goods does not apply.
              </p>
            </TermsSection>

            <TermsSection
              heading="16. Binding Arbitration and Class-Action Waiver"
              delay={0.8}
            >
              <p className="text-gray-400 text-sm leading-relaxed mb-4 italic">
                Please read this Section carefully — it affects your legal
                rights.
              </p>
              <SubSection heading="16.1 Agreement to Arbitrate">
                Except as set forth in Section 16.5, any dispute, claim, or
                controversy arising out of or relating to these Terms, the Site,
                or the Services (&ldquo;Dispute&rdquo;) will be resolved by
                final and binding individual arbitration. You and the Company
                each waive the right to a jury trial or to participate in a
                class-action lawsuit or class-wide arbitration.
              </SubSection>
            </TermsSection>

            <TermsSection heading="Contact" delay={0.85}>
              <p className="text-gray-500 text-base leading-relaxed">
                Questions about these Terms? Contact us at:
              </p>
              <div className="mt-3 space-y-1">
                <p className="text-gray-400 font-semibold">{ENTITY}</p>
                <p className="text-gray-500">
                  Email:{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-gold hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </TermsSection>
          </div>
        </div>
      </section>
    </div>
  );
}

function TermsSection({
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

function SubSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <h3 className="font-body text-base font-semibold text-gray-300 mb-1.5">
        {heading}
      </h3>
      <p className="text-gray-500 text-base leading-relaxed">{children}</p>
    </div>
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
