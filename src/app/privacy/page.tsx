import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "HLPFL Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 min-h-screen">
      <section className="section">
        <div className="max-w-[800px] mx-auto px-4">
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">Legal</span>
          <h1 className="font-display text-5xl md:text-7xl tracking-wide leading-none mb-4">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-12">Last updated: April 2026</p>

          <div className="prose prose-invert prose-gold max-w-none text-gray-400 space-y-8">
            <div>
              <h2 className="font-display text-2xl text-white tracking-wide mb-3">Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you fill out our contact form: your business name, business type, location, biggest challenge, monthly revenue range, and preferred contact method.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-white tracking-wide mb-3">How We Use Your Information</h2>
              <p>We use the information we collect to respond to your inquiry, provide consulting services, and communicate with you about HLPFL services. We do not sell or share your information with third parties for marketing purposes.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-white tracking-wide mb-3">Cookies</h2>
              <p>We use a minimal number of cookies to improve your experience on our site. You can control cookie settings through your browser. We use analytics cookies to understand how visitors use our site.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-white tracking-wide mb-3">Contact</h2>
              <p>If you have questions about this privacy policy, contact us at <a href="mailto:hello@hlpfl.org" className="text-gold hover:text-gold-light">hello@hlpfl.org</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
