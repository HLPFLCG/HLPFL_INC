"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { submitForm } from "@/lib/web3forms";

const WHATSAPP_CONTACT_METHOD = "whatsapp";

export default function ContactPageClient() {
  const { t, lang } = useLanguage();
  const contact = t("contact");
  const home = t("home");
  const labels = home.ctaFormLabels;

  const [form, setForm] = useState({
    businessName: "",
    yourName: "",
    businessType: "",
    location: "",
    challenge: "",
    revenue: "",
    contactMethod: "",
    whatsappNumber: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const result = await submitForm({
      businessName: form.businessName,
      yourName: form.yourName,
      businessType: form.businessType,
      location: form.location,
      challenge: form.challenge,
      revenue: form.revenue,
      contactMethod: form.contactMethod,
      whatsappNumber: form.whatsappNumber,
      email: form.email,
      language: lang,
    });

    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(
        lang === "es"
          ? "No se pudo enviar. Intenta por WhatsApp."
          : "Could not send. Please try WhatsApp instead."
      );
    }
  };

  const whatsappUrl = getWhatsAppUrl();

  return (
    <div className="pt-24 min-h-screen bg-cream">
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <div>
              <ScrollReveal>
                <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">Contact</span>
                <h1 className="font-display text-5xl md:text-7xl tracking-wide leading-none mb-6 text-night">
                  {contact.pageTitle}
                </h1>
                <p className="text-fog text-base leading-relaxed mb-10">{contact.pageSubtitle}</p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="bg-jungle border border-sea/15 p-8">
                  <h2 className="font-display text-2xl tracking-wide mb-3 text-sand">{contact.whatsappTitle}</h2>
                  <p className="text-sand/70 text-sm leading-relaxed mb-6">{contact.whatsappDesc}</p>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
                    <MessageCircle className="w-5 h-5 text-wa" />
                    {contact.whatsappButton}
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Form */}
            <div>
              {submitted ? (
                <ScrollReveal>
                  <div className="text-center py-16">
                    <div className="text-5xl mb-6 text-gold">◆</div>
                    <h2 className="font-display text-3xl text-night mb-4 tracking-wide">{home.ctaSuccessTitle}</h2>
                    <p className="text-fog text-base leading-relaxed mb-8">{home.ctaSuccessDesc}</p>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
                      <MessageCircle className="w-5 h-5" />
                      {labels.whatsapp}
                    </a>
                  </div>
                </ScrollReveal>
              ) : (
                <ScrollReveal delay={0.05}>
                  <h2 className="font-display text-3xl tracking-wide mb-8 text-night">{contact.formTitle}</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="contact-business-name" className="form-label">{labels.businessName}</label>
                      <input id="contact-business-name" type="text" className="form-input" placeholder="e.g. Cabinas Mar Azul" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} required />
                    </div>
                    <div>
                      <label htmlFor="contact-your-name" className="form-label">{labels.yourName}</label>
                      <input id="contact-your-name" type="text" className="form-input" placeholder="e.g. María López" value={form.yourName} onChange={(e) => setForm({ ...form, yourName: e.target.value })} required />
                    </div>
                    <div>
                      <label htmlFor="contact-business-type" className="form-label">{labels.businessType}</label>
                      <select id="contact-business-type" className="form-input" value={form.businessType} onChange={(e) => setForm({ ...form, businessType: e.target.value })} required>
                        <option value="">Select type...</option>
                        {home.ctaBusinessTypes.map((type) => (<option key={type} value={type}>{type}</option>))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="contact-location" className="form-label">{labels.location}</label>
                      <select id="contact-location" className="form-input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required>
                        <option value="">Select location...</option>
                        {home.ctaLocations.map((loc) => (<option key={loc} value={loc}>{loc}</option>))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="contact-challenge" className="form-label">{labels.challenge}</label>
                      <textarea id="contact-challenge" className="form-input min-h-[100px] resize-none" placeholder="e.g., empty rooms in low season, no booking system, scattered reviews..." value={form.challenge} onChange={(e) => setForm({ ...form, challenge: e.target.value })} required />
                    </div>
                    <div>
                      <label htmlFor="contact-revenue" className="form-label">{labels.revenue}</label>
                      <select id="contact-revenue" className="form-input" value={form.revenue} onChange={(e) => setForm({ ...form, revenue: e.target.value })}>
                        <option value="">Prefer not to say</option>
                        {home.ctaRevenues.map((r) => (<option key={r} value={r}>{r}</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="form-label">{labels.contactMethod}</label>
                      <div className="flex gap-3 flex-wrap">
                        {home.ctaContactMethods.map((method) => (
                          <button key={method} type="button" onClick={() => setForm({ ...form, contactMethod: method })}
                            className={`px-4 py-2 text-sm border transition-all duration-200 ${form.contactMethod === method ? "border-gold bg-gold/10 text-gold" : "border-sea/15 text-fog hover:border-sea/40"}`}>
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>
                    {form.contactMethod.toLowerCase().includes(WHATSAPP_CONTACT_METHOD) && (
                      <div>
                        <label htmlFor="contact-whatsapp" className="form-label">{labels.whatsappNumber}</label>
                        <input id="contact-whatsapp" type="tel" className="form-input" placeholder="+506 8888 8888" value={form.whatsappNumber} onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })} />
                      </div>
                    )}
                    <div>
                      <label htmlFor="contact-email" className="form-label">{labels.email}</label>
                      <input id="contact-email" type="email" className="form-input" placeholder="you@yourbusiness.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    </div>
                    {error && (
                      <p className="text-red-600 text-sm text-center">{error}</p>
                    )}
                    <button type="submit" disabled={submitting} aria-busy={submitting} className="btn-primary w-full disabled:opacity-50">
                      {submitting
                        ? lang === "es" ? "Enviando…" : "Sending…"
                        : labels.submit}
                    </button>
                    <div className="text-center space-y-1 pt-2">
                      <p className="text-bark text-xs">{home.ctaLowPressure}</p>
                      <p className="text-bark text-xs">{home.ctaResponse}</p>
                    </div>
                  </form>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
