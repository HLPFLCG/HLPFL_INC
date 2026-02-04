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
            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of creative entrepreneurs who've chosen independence
              over exploitation. Your journey starts here.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/portal">
                <Button size="lg" className="group">
                  Get Started Free
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Talk to Us
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="mt-8 text-gray-500 text-sm">
              No credit card required • No long-term commitments • Cancel
              anytime
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
