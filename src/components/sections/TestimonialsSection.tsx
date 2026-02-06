"use client";

import Link from "next/link";
import { Quote, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui";
import { testimonials } from "@/lib/blog";

export default function TestimonialsSection() {
  const featuredTestimonial = testimonials.find((t) => t.featured) || testimonials[0];

  if (!featuredTestimonial) return null;

  return (
    <section className="section bg-gradient-to-b from-void to-void-light" id="testimonials">
      <div className="container-custom">
        <ScrollReveal>
          <span className="text-gold uppercase tracking-widest text-sm mb-4 block text-center">
            Success Stories
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-center mb-16">
            Real Results, <span className="text-gradient">Real Creators</span>
          </h2>
        </ScrollReveal>

        {/* Featured Testimonial */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <div className="relative p-8 lg:p-12 rounded-2xl bg-void border border-gold/20 shadow-xl shadow-gold/5">
              {/* Quote Icon */}
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                <Quote size={24} className="text-void" />
              </div>

              {/* Quote Text */}
              <blockquote className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-8 mt-4">
                &ldquo;{featuredTestimonial.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="font-display text-xl text-white">
                    {featuredTestimonial.name}
                  </p>
                  <p className="text-gold">
                    {featuredTestimonial.role}, {featuredTestimonial.company}
                  </p>
                </div>
                <Link
                  href="/blog/torres-entertainment-partnership-success-story"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-gold/30 rounded-lg text-gold hover:bg-gold/10 transition-colors group"
                >
                  Read Full Case Study
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {[
              { value: "0", label: "Upfront Fees" },
              { value: "100%", label: "Creator Ownership" },
              { value: "15-30%", label: "Commission Only" },
              { value: "5+", label: "New Markets Found" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-4 rounded-xl bg-void-light border border-gold/10"
              >
                <p className="font-display text-3xl lg:text-4xl text-gold mb-1">
                  {stat.value}
                </p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.4}>
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors group"
            >
              View All Success Stories
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
