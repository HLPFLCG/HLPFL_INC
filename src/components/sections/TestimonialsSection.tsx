"use client";

import Link from "next/link";
import { Quote, ArrowRight, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/ui";
import { testimonials } from "@/lib/blog";

const PARTNERS = [
  { name: "Pardyalone", type: "Musician", status: "Partner" },
  { name: "Alki", type: "Musician", status: "Partner" },
];

export default function TestimonialsSection() {
  const featuredTestimonials = testimonials.filter((t) => t.featured);

  return (
    <section className="section" id="partners">
      <div className="container-custom">
        {/* Partners — Proof of Work */}
        <ScrollReveal>
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block text-center">
            Proof of Work
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-center mb-4">
            Who We&apos;ve <span className="text-gradient">Built With</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-gray-400 text-center text-base mb-12 max-w-xl mx-auto leading-relaxed">
            Artists and entrepreneurs who trusted HLPFL to build the business
            side while they focused on their craft.
          </p>
        </ScrollReveal>

        {/* Partner cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-20">
          {PARTNERS.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-void-light border border-void-lighter p-8 text-center group transition-all duration-300 hover:border-gold/25">
                <div className="w-16 h-16 rounded-full bg-gold/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="font-display text-2xl text-gold">
                    {p.name[0]}
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl text-white mb-1 tracking-wide">
                  {p.name}
                </h3>
                <div className="text-gold text-[11px] tracking-[0.15em] uppercase mb-1">
                  {p.status}
                </div>
                <div className="text-gray-500 text-xs">{p.type}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Testimonials */}
        {featuredTestimonials.length > 0 && (
          <>
            <ScrollReveal>
              <span className="text-gold uppercase tracking-[0.25em] text-xs mb-4 block text-center">
                Success Stories
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-center mb-16">
                Real Results, <span className="text-gradient">Real Creators</span>
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {featuredTestimonials.map((testimonial, index) => (
                <ScrollReveal key={testimonial.name} delay={0.2 + index * 0.1}>
                  <div className="relative p-8 rounded-2xl bg-void-light border border-gold/20 shadow-xl shadow-gold/5 h-full flex flex-col">
                    <div className="absolute -top-5 left-8 w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                      <Quote size={20} className="text-void" />
                    </div>
                    <blockquote className="text-lg text-gray-300 leading-relaxed mb-6 mt-4 flex-grow">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <p className="font-display text-xl text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-gold">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                      {testimonial.company === "HCJK" ? (
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
                      ) : testimonial.company === "Elisabeth Jane" ? (
                        <div className="flex items-center gap-2">
                          <Link
                            href="/blog/elisabeth-jane-hand-painted-recipe-boxes-case-study"
                            className="inline-flex items-center gap-2 px-4 py-2 border border-gold/30 rounded-lg text-gold hover:bg-gold/10 transition-colors group text-sm"
                          >
                            Case Study
                            <ArrowRight
                              size={14}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </Link>
                          <a
                            href="https://elisabethjane.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 border border-gold/30 rounded-lg text-gold hover:bg-gold/10 transition-colors group text-sm"
                          >
                            elisabethjane.com
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

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
          </>
        )}
      </div>
    </section>
  );
}
