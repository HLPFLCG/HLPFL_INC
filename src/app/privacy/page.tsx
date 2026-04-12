import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "HLPFL Privacy Policy — hospitality and tourism businesses in Limón Province, Costa Rica.",
  alternates: { canonical: "https://hlpfl.org/privacy/" },
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 min-h-screen bg-cream">
      <section className="section">
        <div className="max-w-[800px] mx-auto px-4">
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">Legal</span>
          <h1 className="font-display text-5xl md:text-7xl tracking-wide leading-none mb-4 text-night">Privacy Policy</h1>
          <p className="text-bark text-sm mb-12">Last updated: April 2026</p>

          <div className="prose prose-gold max-w-none text-fog space-y-8">
            <div>
              <h2 className="font-display text-2xl text-night tracking-wide mb-3">Scope</h2>
              <p>This privacy policy applies to HLPFL and the services we provide to hospitality and tourism businesses in Limón Province, Costa Rica — specifically the Cahuita → Puerto Viejo → Manzanillo corridor.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-night tracking-wide mb-3">Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you fill out our contact form: your business name, your name, business type, location, biggest challenge, monthly revenue range, preferred contact method, WhatsApp number, and email address.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-night tracking-wide mb-3">How We Use Your Information</h2>
              <p>We use the information we collect to respond to your inquiry, provide consulting services, and communicate with you about HLPFL services. We do not sell or share your information with third parties for marketing purposes.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-night tracking-wide mb-3">Legal Basis &amp; Compliance</h2>
              <p>We process personal data in compliance with Costa Rican Law 8968 (Ley de Protección de la Persona frente al tratamiento de sus datos personales) and the EU General Data Protection Regulation (GDPR) where applicable to European travelers and business operators. You have the right to access, correct, or delete your personal data at any time by contacting us.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-night tracking-wide mb-3">Cookies</h2>
              <p>We use a minimal number of cookies to improve your experience on our site. You can control cookie settings through your browser or through our cookie consent banner. We use analytics cookies to understand how visitors use our site.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-night tracking-wide mb-3">Contact</h2>
              <p>If you have questions about this privacy policy, contact us at <a href="mailto:hello@hlpfl.org" className="text-sea hover:text-canopy">hello@hlpfl.org</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
