"use client";

import {
  Palette,
  Building2,
  Handshake,
  Target,
  Video,
  GraduationCap,
} from "lucide-react";
import { ScrollReveal, Card } from "@/components/ui";

const services = [
  {
    icon: Palette,
    title: "Brand Development",
    description:
      "Build a distinctive brand identity—logo design, visual identity, and market positioning that makes you stand out.",
  },
  {
    icon: Building2,
    title: "Business Formation",
    description:
      "Navigate entity formation, LLC filing, structure guidance, and compliance so you can focus on creating.",
  },
  {
    icon: Handshake,
    title: "Sales Representation",
    description:
      "Connect with buyers, close deals, and access markets through our network and direct sales advocacy.",
  },
  {
    icon: Target,
    title: "Marketing Strategy",
    description:
      "Develop targeted marketing plans, campaign strategies, and promotional tactics that actually work.",
  },
  {
    icon: Video,
    title: "Content Creation",
    description:
      "Professional video production, photography, and social media content that tells your story.",
  },
  {
    icon: GraduationCap,
    title: "Creator Education",
    description:
      "Learn business fundamentals, rights protection, and contract navigation to thrive independently.",
  },
];

export default function ServicesSection() {
  return (
    <section className="section bg-void-light" id="services">
      <div className="container-custom">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
            How We Help
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            Professional Services, <span className="text-gradient">Zero Upfront</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Everything you need to build and grow your creative business—with no
            upfront costs. We only earn when you earn.
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
