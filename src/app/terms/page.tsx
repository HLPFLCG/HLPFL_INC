import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "HLPFL Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="pt-24 min-h-screen">
      <section className="section">
        <div className="max-w-[800px] mx-auto px-4">
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">Legal</span>
          <h1 className="font-display text-5xl md:text-7xl tracking-wide leading-none mb-4">Terms of Service</h1>
          <p className="text-gray-500 text-sm mb-12">Last updated: April 2026</p>

          <div className="prose prose-invert max-w-none text-gray-400 space-y-8">
            <div>
              <h2 className="font-display text-2xl text-white tracking-wide mb-3">Services</h2>
              <p>HLPFL provides B2B consulting services to hospitality and tourism businesses operating in the Cahuita–Manzanillo corridor of Costa Rica&apos;s Caribbean coast. Services include digital marketing, website development, online booking system setup, visual identity, business strategy, legal entity setup, operational systems, and team building.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-white tracking-wide mb-3">Engagement</h2>
              <p>All consulting engagements begin with a discovery session. Specific scope, deliverables, timeline, and pricing are agreed upon in a written service agreement before work begins.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-white tracking-wide mb-3">Intellectual Property</h2>
              <p>All work product created for your business — including websites, brand assets, documents, and systems — belongs to you upon full payment. HLPFL retains no ownership rights to your deliverables.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-white tracking-wide mb-3">Limitation of Liability</h2>
              <p>HLPFL&apos;s liability is limited to the fees paid for the specific service in question. We do not guarantee specific business outcomes, occupancy rates, or revenue increases.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-white tracking-wide mb-3">Contact</h2>
              <p>Questions about these terms: <a href="mailto:hello@hlpfl.org" className="text-gold hover:text-gold-light">hello@hlpfl.org</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
