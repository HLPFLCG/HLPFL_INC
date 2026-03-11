"use client";

import { useState, useRef } from "react";
import { ScrollReveal } from "@/components/ui";

export default function CTASection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    work: "",
    link: "",
    blocker: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section ref={formRef} id="apply" className="section bg-void-light">
        <div className="max-w-[600px] mx-auto px-4 text-center">
          <div className="text-5xl mb-6 text-gold">◆</div>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Application Received
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            We review every application personally. If there&apos;s a fit,
            you&apos;ll hear from us within 48 hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={formRef} id="apply" className="section bg-void-light">
      <div className="max-w-[600px] mx-auto px-4">
        <ScrollReveal>
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block">
            Get Started
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 tracking-wide leading-none">
            Apply to <span className="text-gradient">Partner</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-10">
            We&apos;re selective because our model requires us to believe in the
            product. Tell us about yours.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-void-lighter border border-void-lighter text-white px-4 py-3.5 text-sm outline-none transition-colors focus:border-gold placeholder:text-gray-600"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-void-lighter border border-void-lighter text-white px-4 py-3.5 text-sm outline-none transition-colors focus:border-gold placeholder:text-gray-600"
            />
            <input
              type="text"
              placeholder="What do you do? (musician, inventor, artist, etc.)"
              required
              value={form.work}
              onChange={(e) => setForm({ ...form, work: e.target.value })}
              className="bg-void-lighter border border-void-lighter text-white px-4 py-3.5 text-sm outline-none transition-colors focus:border-gold placeholder:text-gray-600"
            />
            <input
              type="url"
              placeholder="Link to your work (optional)"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              className="bg-void-lighter border border-void-lighter text-white px-4 py-3.5 text-sm outline-none transition-colors focus:border-gold placeholder:text-gray-600"
            />
            <textarea
              placeholder="What's the biggest thing holding your business back right now?"
              value={form.blocker}
              onChange={(e) => setForm({ ...form, blocker: e.target.value })}
              rows={4}
              className="bg-void-lighter border border-void-lighter text-white px-4 py-3.5 text-sm outline-none transition-colors focus:border-gold placeholder:text-gray-600 resize-y"
            />

            <button
              type="submit"
              className="bg-gold text-white border-none px-10 py-4 text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(200,121,65,0.4)] mt-2"
            >
              Submit Application
            </button>

            <p className="text-gray-500 text-[11px] text-center mt-2">
              We respond to every application within 48 hours.
            </p>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
