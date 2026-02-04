"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ScrollReveal, Button } from "@/components/ui";

export default function CTASection() {
  return (
    <section className="section relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-light via-void to-void" />

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 border-y border-gold/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
              Ready to Take Control of Your{" "}
              <span className="text-gradient">Creative Career</span>?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-gray-400 text-lg md:text-xl mb-4 max-w-2xl mx-auto">
              Have a viable product or creative talent? Let&apos;s talk about how we
              can help you reach your market—with zero upfront costs.
            </p>
            <p className="text-gold text-lg font-medium mb-10">
              We don&apos;t charge anything upfront. We earn when you earn.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="group">
                  Apply Now
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>
              <Link href="/portal">
                <Button variant="outline" size="lg">
                  Try Demo Portal
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="mt-8 text-gray-500 text-sm">
              No pitch fees • No consultation costs • Commission-only model
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
