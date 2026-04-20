"use client";

import { Quote } from "lucide-react";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const home = t("home");
  const testimonials = t("testimonials");

  return (
    <section className="section bg-void-light" id="testimonials">
      <div className="container-custom">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-center mb-16 tracking-wide leading-none text-white">
            {home.testimonialsHeadline}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.items.map((testimonial, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-void border-l-4 border-gold p-8 h-full relative">
                <Quote className="w-8 h-8 text-gold/20 mb-6" />
                <p className="text-white text-sm leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className="border-t border-gold/15 pt-4">
                  <cite className="not-italic">
                    <div className="text-gray-400 text-sm font-medium">— {testimonial.name}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{testimonial.business}</div>
                  </cite>
                  <div className="text-gold text-xs tracking-wider mt-1">{testimonial.service}</div>
                </footer>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
