"use client";

import {
  Music,
  Users,
  TrendingUp,
  Shield,
  Headphones,
  Globe,
} from "lucide-react";
import { ScrollReveal, Card } from "@/components/ui";

const services = [
  {
    icon: Music,
    title: "Distribution",
    description:
      "Get your music on all major platforms worldwide. Spotify, Apple Music, Tidal, and 150+ more stores.",
  },
  {
    icon: TrendingUp,
    title: "Growth Tools",
    description:
      "Analytics, marketing resources, and promotional tools to help you reach new audiences.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Connect with fellow creative entrepreneurs. Collaborate, learn, and grow together.",
  },
  {
    icon: Shield,
    title: "Rights Protection",
    description:
      "Keep 100% of your rights. We help you protect your creative work without taking ownership.",
  },
  {
    icon: Headphones,
    title: "Production Support",
    description:
      "Access to production resources, mixing/mastering services, and creative consultation.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Expand your audience internationally with localized marketing and regional distribution.",
  },
];

export default function ServicesSection() {
  return (
    <section className="section bg-void-light" id="services">
      <div className="container-custom">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
            What We Offer
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            Tools for Your <span className="text-gradient">Creative Journey</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Everything you need to build, grow, and sustain your creative
            business—all without giving up your independence.
          </p>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.1}>
              <Card
                variant="bordered"
                hover
                className="h-full group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gold/10 text-gold group-hover:bg-gold group-hover:text-void transition-all duration-300">
                    <service.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl mb-2 group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
