"use client";

import { Quote } from "lucide-react";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const home = t("home");

  return (
    <section className="section bg-mist" id="testimonials">
      <div className="container-custom">
        <ScrollReveal>
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block text-center">
            {home.testimonialsOverline}
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-center mb-16 tracking-wide leading-none text-night">
            {home.testimonialsTitle}{" "}
            <span className="text-gradient">{home.testimonialsTitleAccent}</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {home.testimonials.map((testimonial, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-cream border-l-4 border-sea p-8 h-full relative">
                <Quote className="w-8 h-8 text-gold/20 mb-6" />
                <p className="text-night text-sm leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="border-t border-sea/15 pt-4">
                  <div className="text-bark text-sm font-medium">— {testimonial.author}</div>
                  <div className="text-wave text-xs tracking-wider mt-0.5">{testimonial.location}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
