"use client";

import { useState } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle, Mail } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { submitForm } from "@/lib/web3forms";

export default function ContactPageClient() {
  const { t, lang } = useLanguage();
  const contact = t("contact");

  const [form, setForm] = useState({
    yourName: "",
    email: "",
    businessName: "",
    serviceInterest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const result = await submitForm({
      yourName: form.yourName,
      email: form.email,
      businessName: form.businessName,
      serviceInterest: form.serviceInterest,
      message: form.message,
      language: lang,
    });

    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(contact.errorMessage);
    }
  };

  const whatsappUrl = getWhatsAppUrl();

  return (
    <div className="pt-24 min-h-screen bg-cream">
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Form */}
            <div>
              <ScrollReveal>
                <h1 className="font-display text-5xl md:text-7xl tracking-wide leading-none mb-4 text-night">
                  {contact.headline}
                </h1>
                <p className="text-fog text-base leading-relaxed mb-10">
                  {contact.sub}
                </p>
              </ScrollReveal>

              {submitted ? (
                <ScrollReveal>
                  <div className="text-center py-16 bg-mist rounded-2xl border border-sea/15">
                    <div className="text-5xl mb-6">✓</div>
                    <h2 className="font-display text-2xl text-night mb-3 tracking-wide">
                      {contact.successMessage}
                    </h2>
                  </div>
                </ScrollReveal>
              ) : (
                <ScrollReveal delay={0.05}>
                  <h2 className="font-body text-xl font-bold mb-6 text-night">
                    {contact.formHeadline}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="contact-name" className="form-label">
                        {contact.nameLabel}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        className="form-input"
                        value={form.yourName}
                        onChange={(e) =>
                          setForm({ ...form, yourName: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="form-label">
                        {contact.emailLabel}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        className="form-input"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-business" className="form-label">
                        {contact.businessLabel}
                      </label>
                      <input
                        id="contact-business"
                        type="text"
                        className="form-input"
                        value={form.businessName}
                        onChange={(e) =>
                          setForm({ ...form, businessName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-service" className="form-label">
                        {contact.serviceLabel}
                      </label>
                      <input
                        id="contact-service"
                        type="text"
                        className="form-input"
                        placeholder={contact.servicePlaceholder}
                        value={form.serviceInterest}
                        onChange={(e) =>
                          setForm({ ...form, serviceInterest: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="form-label">
                        {contact.messageLabel}
                      </label>
                      <textarea
                        id="contact-message"
                        className="form-input min-h-[120px] resize-none"
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                      />
                    </div>

                    {error && (
                      <p className="text-red-600 text-sm text-center">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      aria-busy={submitting}
                      className="btn-primary w-full disabled:opacity-50"
                    >
                      {submitting
                        ? lang === "es"
                          ? "Enviando…"
                          : "Sending…"
                        : contact.submitButton}
                    </button>

                    <p className="text-bark text-xs text-center pt-1">
                      {contact.noSpam}
                    </p>
                  </form>
                </ScrollReveal>
              )}
            </div>

            {/* Right: Alternative contact methods */}
            <div className="flex flex-col gap-6 lg:pt-32">
              <ScrollReveal delay={0.1}>
                <div className="bg-jungle rounded-2xl border border-sea/15 p-8">
                  <h2 className="font-body text-xl font-bold text-sand mb-3">
                    {contact.whatsappLabel}
                  </h2>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-btn"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {contact.whatsappCTA}
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="bg-mist rounded-2xl border border-sea/15 p-8">
                  <h2 className="font-body text-xl font-bold text-night mb-3">
                    {contact.emailDirectLabel}
                  </h2>
                  <a
                    href="mailto:hello@hlpfl.org"
                    className="inline-flex items-center gap-2 text-sea hover:text-canopy transition-colors font-semibold"
                  >
                    <Mail size={18} />
                    hello@hlpfl.org
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
