"use client";

import Link from "next/link";
import { Quote, ArrowRight, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/ui";
import { testimonials } from "@/lib/blog";

export default function TestimonialsSection() {
  const featuredTestimonials = testimonials.filter((t) => t.featured);

  if (featuredTestimonials.length === 0) return null;

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

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {featuredTestimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.name} delay={0.2 + index * 0.1}>
              <div className="relative p-8 rounded-2xl bg-void border border-gold/20 shadow-xl shadow-gold/5 h-full flex flex-col">
                {/* Quote Icon */}
                <div className="absolute -top-5 left-8 w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                  <Quote size={20} className="text-void" />
                </div>

                {/* Quote Text */}
                <blockquote className="text-lg text-gray-300 leading-relaxed mb-6 mt-4 flex-grow">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="font-display text-xl text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-gold">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                  {testimonial.company === "Torres Entertainment" ? (
                    <Link
                      href="/blog/torres-entertainment-partnership-success-story"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gold/30 rounded-lg text-gold hover:bg-gold/10 transition-colors group text-sm"
                    >
                      Case Study
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  ) : testimonial.company === "HCJK" ? (
                    <div className="flex items-center gap-2">
                      <Link
                        href="/blog/hcjk-heather-krystecki-author-platform-case-study"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gold/30 rounded-lg text-gold hover:bg-gold/10 transition-colors group text-sm"
                      >
                        Case Study
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                      <a
                        href="https://hcjk.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gold/30 rounded-lg text-gold hover:bg-gold/10 transition-colors group text-sm"
                      >
                        hcjk.org
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

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
