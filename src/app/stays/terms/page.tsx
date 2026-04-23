import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rental Agreement — Stays',
  description: 'Short-term vacation rental terms and conditions for properties booked through HLPFL Stays.',
  alternates: { canonical: 'https://hlpfl.org/stays/terms/' },
}

const EFFECTIVE_DATE = 'January 1, 2026'

export default function StaysTermsPage() {
  return (
    <div className="pt-24 min-h-screen bg-void">
      <div className="max-w-3xl mx-auto px-4 py-16">

        <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">Legal</span>
        <h1 className="font-display text-[clamp(2.5rem,7vw,4rem)] leading-none tracking-wider text-white mb-4">
          RENTAL AGREEMENT
        </h1>
        <p className="text-white/40 text-sm mb-12">Effective {EFFECTIVE_DATE}</p>

        {/* Disclaimer banner */}
        <div className="border border-gold/25 bg-gold/[0.04] px-6 py-5 mb-12">
          <p className="text-gold font-semibold text-sm mb-2">Booking Facilitator Disclaimer</p>
          <p className="text-white/60 text-sm leading-relaxed">
            HLPFL INC acts solely as a booking facilitator and technology platform. Individual property owners
            are responsible for their own compliance with Costa Rica&apos;s ICT (Instituto Costarricense de Turismo)
            registration requirements, Hacienda electronic invoicing obligations (comprobantes electrónicos),
            and all applicable local, municipal, and national regulations. HLPFL INC is not the property owner,
            landlord, or employer of property staff.
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-10 text-white/70 text-sm leading-relaxed">

          <Section title="1. Parties">
            <p>This agreement is between the <strong className="text-white">Guest</strong> (the person making the booking)
              and the <strong className="text-white">Property Owner</strong> (the individual or entity that owns the listed
              property). HLPFL INC (&quot;Platform&quot;) facilitates the booking transaction but is not a party to the underlying
              rental agreement between Guest and Owner.</p>
          </Section>

          <Section title="2. Booking and Payment">
            <ul className="space-y-2">
              <li><span className="text-gold">◆</span> Bookings are confirmed only after full payment is received via Stripe.</li>
              <li><span className="text-gold">◆</span> Prices are quoted in USD. Stripe applies a standard 3% processing fee included in the displayed total.</li>
              <li><span className="text-gold">◆</span> A damage deposit pre-authorization may be applied to the Guest&apos;s card at check-in at the Owner&apos;s discretion. The pre-authorization is released within 7 days of check-out absent damage claims.</li>
              <li><span className="text-gold">◆</span> HLPFL INC does not store card details. All payment processing is handled by Stripe, Inc. under their terms of service.</li>
            </ul>
          </Section>

          <Section title="3. Cancellation Policy">
            <div className="border border-void-lighter bg-void-light p-5 space-y-3">
              <p><strong className="text-white">48+ hours before check-in:</strong> Full refund, no questions asked.</p>
              <p><strong className="text-white">Less than 48 hours before check-in:</strong> 50% of the total booking amount is retained by the Property Owner. The remaining 50% is refunded within 5–7 business days.</p>
              <p><strong className="text-white">No-show / early departure:</strong> No refund.</p>
              <p className="text-white/40 text-xs">Refunds are processed by Stripe and may take 5–10 business days to appear depending on your bank.</p>
            </div>
          </Section>

          <Section title="4. Check-in / Check-out">
            <ul className="space-y-2">
              <li><span className="text-gold">◆</span> Standard check-in is 3:00 PM local Costa Rica time. Check-out is 11:00 AM.</li>
              <li><span className="text-gold">◆</span> Early check-in or late check-out may be available upon request, subject to Owner availability and an additional fee.</li>
              <li><span className="text-gold">◆</span> Guests will receive arrival instructions via email and WhatsApp after booking confirmation.</li>
            </ul>
          </Section>

          <Section title="5. Occupancy and Use">
            <ul className="space-y-2">
              <li><span className="text-gold">◆</span> The property may not be occupied by more guests than the stated maximum occupancy.</li>
              <li><span className="text-gold">◆</span> Sub-letting or re-listing the property is strictly prohibited.</li>
              <li><span className="text-gold">◆</span> Commercial filming, photography for commercial use, or events/parties require prior written consent from the Owner.</li>
              <li><span className="text-gold">◆</span> Smoking is prohibited inside all properties unless explicitly stated otherwise in the listing.</li>
              <li><span className="text-gold">◆</span> Pet policies are set per property and disclosed in the listing.</li>
            </ul>
          </Section>

          <Section title="6. Damage and Liability">
            <ul className="space-y-2">
              <li><span className="text-gold">◆</span> Guests are responsible for leaving the property in the same condition as found, reasonable wear and tear excepted.</li>
              <li><span className="text-gold">◆</span> Damage beyond the damage deposit will be billed to the Guest and may be pursued via legal means.</li>
              <li><span className="text-gold">◆</span> The Property Owner and HLPFL INC accept no liability for theft of personal belongings, injury, illness, or other loss during the stay beyond what is required by applicable Costa Rica law.</li>
              <li><span className="text-gold">◆</span> Guests assume full responsibility for activities undertaken during their stay, including ocean swimming, wildlife encounters, and use of outdoor amenities.</li>
            </ul>
          </Section>

          <Section title="7. Jurisdiction">
            <p>This agreement is governed by the laws of the Republic of Costa Rica. Any disputes arising from a booking made through this platform shall be subject to the jurisdiction of the courts of Limón Province, Costa Rica, unless otherwise required by applicable consumer protection law in the Guest&apos;s country of residence.</p>
          </Section>

          <Section title="8. ICT and Hacienda Compliance (Property Owners)">
            <p className="text-white/50">This section applies to Property Owners listing on the platform, not Guests.</p>
            <ul className="space-y-2 mt-3">
              <li><span className="text-gold">◆</span> Property Owners are solely responsible for registering with the Instituto Costarricense de Turismo (ICT) as required under Costa Rica&apos;s tourism law.</li>
              <li><span className="text-gold">◆</span> Property Owners are solely responsible for issuing comprobantes electrónicos (electronic invoices) via the Ministerio de Hacienda system for all rental income, as required by Costa Rica tax law.</li>
              <li><span className="text-gold">◆</span> HLPFL INC provides informational guidance only and is not responsible for Owner compliance with any tax or regulatory obligation.</li>
            </ul>
          </Section>

          <Section title="9. Seller of Travel">
            <p>HLPFL INC is not currently registered as a Seller of Travel under the laws of California, Florida, Hawaii, Washington, or Iowa. Guests residing in these states should note this disclosure. Property Owners operating as travel agents or tour operators should independently verify their registration requirements under applicable state law and consult with a qualified attorney.</p>
          </Section>

          <Section title="10. Modifications">
            <p>HLPFL INC reserves the right to update these terms at any time. The version in effect at the time of booking governs that booking. Continued use of the platform constitutes acceptance of the current terms.</p>
          </Section>

          <Section title="11. Contact">
            <p>Questions about this agreement: <a href="mailto:hello@hlpfl.com" className="text-gold hover:text-gold-light transition-colors">hello@hlpfl.com</a></p>
          </Section>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl tracking-wider text-white mb-4">{title.toUpperCase()}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}
