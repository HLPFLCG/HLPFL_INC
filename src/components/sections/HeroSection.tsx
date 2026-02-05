"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { ShimmerText, GlowHover } from "@/components/animations";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void to-void-light" />

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

      {/* Content */}
      <div className="container-custom relative z-10 text-center px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 mb-8"
        >
          <Sparkles size={16} className="text-gold" />
          <span className="text-sm text-gold">Commission-Only Model • Zero Upfront Costs</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide mb-6"
        >
          Empowering{" "}
          <span className="text-gradient">Creative</span>
          <br />
          Entrepreneurs
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          Professional business support with zero upfront costs. We don&apos;t charge
          anything upfront—we earn when you earn.
        </motion.p>

        {/* Key Message */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-gold font-medium text-lg mb-10"
        >
          <ShimmerText>No VCs. No Exploitation. No Bullshit.</ShimmerText>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <GlowHover>
            <Link href="/portal">
              <Button size="lg" className="group">
                Enter Creative Portal
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Button>
            </Link>
          </GlowHover>
          <Link href="/services">
            <Button variant="outline" size="lg">
              How It Works
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "$0", label: "Upfront Fees" },
            { value: "100%", label: "Your Rights" },
            { value: "15-30%", label: "Commission Only" },
            { value: "∞", label: "Possibilities" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display text-3xl md:text-4xl text-gold mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
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
