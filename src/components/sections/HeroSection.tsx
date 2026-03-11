"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui";

export default function HeroSection() {
  const scrollToApply = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void to-void-light" />

      {/* Radial gold glow */}
      <div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(200,121,65,0.03) 0%, transparent 70%)",
        }}
      />

      {/* Animated gold accent lines */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Diagonal lines */}
      <div
        className="absolute top-0 right-0 w-[400px] h-full opacity-[0.03] pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(45deg, transparent, transparent 40px, #fff 40px, #fff 41px)",
        }}
      />

      {/* Content */}
      <div className="container-custom relative z-10 text-center px-4 py-32">
        <ScrollReveal>
          <span className="text-gold uppercase tracking-[0.25em] text-xs mb-8 block opacity-90">
            Wyoming 501(c)(3) Nonprofit
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide mb-6 leading-none">
            Your talent deserves
            <br />
            <span className="text-gradient">a real business</span>
            <br />
            behind it.
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            HLPFL builds the brand, the business, and the sales engine — so you
            can focus on creating.
            <span className="text-gold font-semibold"> $1,000 to start.</span>{" "}
            We earn when you earn.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToApply}
              className="bg-gold text-white border-none px-10 py-4 text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(200,121,65,0.4)]"
            >
              Apply to Partner
            </button>
            <a
              href="#how-it-works"
              className="text-gray-400 border border-void-lighter px-10 py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:border-gold hover:text-gold inline-block text-center"
            >
              How It Works
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-gold/50 flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-gold"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
