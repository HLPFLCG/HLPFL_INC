"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "50688888888"; // placeholder — replace with real number

export default function CTASection() {
  const { t } = useLanguage();
  const home = t("home");
  const labels = home.ctaFormLabels;

  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    location: "",
    challenge: "",
    revenue: "",
    contactMethod: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi HLPFL, I'd like to discuss my hospitality business on the Caribbean coast.")}`;

  if (submitted) {
    return (
      <section id="apply" className="section bg-void-light">
        <div className="max-w-[600px] mx-auto px-4 text-center">
          <div className="text-5xl mb-6 text-gold">◆</div>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4 tracking-wide">
            {home.ctaSuccessTitle}
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-8">{home.ctaSuccessDesc}</p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
            <MessageCircle className="w-5 h-5" />
            {labels.whatsapp}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="section bg-void-light">
      <div className="max-w-[700px] mx-auto px-4">
        <ScrollReveal>
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">{home.ctaOverline}</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 tracking-wide leading-none">
            {home.ctaTitle}{" "}
            <span className="text-gradient">{home.ctaTitleAccent}</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-10">{home.ctaSubtitle}</p>
        </ScrollReveal>

        {/* WhatsApp shortcut */}
        <ScrollReveal delay={0.05}>
          <div className="mb-8">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
              <MessageCircle className="w-5 h-5" />
              {labels.whatsapp}
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div>
              <label className="form-label">{labels.businessName}</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Cabinas Mar Azul"
                value={form.businessName}
                onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                required
              />
            </div>

            {/* Business Type */}
            <div>
              <label className="form-label">{labels.businessType}</label>
              <select
                className="form-input"
                value={form.businessType}
                onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                required
              >
                <option value="">Select type...</option>
                {home.ctaBusinessTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="form-label">{labels.location}</label>
              <select
                className="form-input"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
              >
                <option value="">Select location...</option>
                {home.ctaLocations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Challenge */}
            <div>
              <label className="form-label">{labels.challenge}</label>
              <textarea
                className="form-input min-h-[100px] resize-none"
                placeholder="e.g. We get walk-in guests but no online bookings. Our photos are terrible and we have no website..."
                value={form.challenge}
                onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                required
              />
            </div>

            {/* Revenue Range (optional) */}
            <div>
              <label className="form-label">{labels.revenue}</label>
              <select
                className="form-input"
                value={form.revenue}
                onChange={(e) => setForm({ ...form, revenue: e.target.value })}
              >
                <option value="">Prefer not to say</option>
                {home.ctaRevenues.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Contact Method */}
            <div>
              <label className="form-label">{labels.contactMethod}</label>
              <div className="flex gap-3">
                {home.ctaContactMethods.map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setForm({ ...form, contactMethod: method })}
                    className={`px-4 py-2 text-sm border transition-all duration-200 ${
                      form.contactMethod === method
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-void-lighter text-gray-400 hover:border-gold/40"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary w-full">
              {labels.submit}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
