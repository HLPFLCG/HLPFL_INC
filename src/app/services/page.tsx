import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, DollarSign, Zap, Shield, Heart } from "lucide-react";
import { ScrollReveal, Button, Card } from "@/components/ui";
import { services, audiences } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services | HLPFL INC",
  description:
    "Professional business services for creative entrepreneurs with zero upfront costs. Commission-only model—we earn when you earn.",
  keywords: [
    "creative entrepreneur services",
    "commission-only",
    "no upfront fees",
    "brand development",
    "sales representation",
    "business formation",
  ],
  openGraph: {
    title: "Services | HLPFL INC",
    description:
      "Professional business services for creative entrepreneurs with zero upfront costs. Commission-only model.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HLPFL INC" }],
  },
};

const commissionFeatures = [
  {
    icon: DollarSign,
    title: "$0 Upfront",
    description: "No retainers. No deposits. No fees until we deliver results.",
  },
  {
    icon: Zap,
    title: "Success-Aligned",
    description: "We only earn when you earn. Our incentives are your incentives.",
  },
  {
    icon: Shield,
    title: "Transparent Terms",
    description: "Clear commission rates (15-30%) negotiated per project. No hidden costs.",
  },
  {
    icon: Heart,
    title: "Your Rights",
    description: "You keep 100% of your intellectual property. Always.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section pt-24 md:pt-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
                How We Work
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
                Professional Services,{" "}
                <span className="text-gradient">Zero Upfront</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-gray-400 text-lg md:text-xl mb-4">
                You shouldn&apos;t have to pay thousands just to find out if someone can help you.
              </p>
              <p className="text-gold text-lg font-medium">
                We don&apos;t charge anything upfront. We earn when you earn. That&apos;s it.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Commission Model Section */}
      <section className="section pt-8 pb-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commissionFeatures.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.1}>
                <Card variant="bordered" className="h-full text-center group">
                  <div className="p-4 rounded-xl bg-gold/10 text-gold w-fit mx-auto mb-4 group-hover:bg-gold group-hover:text-void transition-all">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="font-display text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-void-light">
        <div className="container-custom">
          <ScrollReveal className="text-center mb-16">
            <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
              Our Services
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
              What We Offer
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive business support for creative entrepreneurs—everything
              you need to succeed, nothing you don&apos;t.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.1}>
                <Card variant="bordered" hover className="h-full group">
                  <div className="p-4 rounded-lg bg-gold/10 text-gold w-fit mb-4 group-hover:bg-gold group-hover:text-void transition-all">
                    <service.icon size={28} />
                  </div>
                  <h3 className="font-display text-2xl mb-3 group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-gray-500"
                      >
                        <Check size={16} className="text-gold flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="section">
        <div className="container-custom">
          <ScrollReveal className="text-center mb-16">
            <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
              Who We Serve
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
              Creative Entrepreneurs
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We work with creators who have viable products or talent but need
              business infrastructure to reach their potential.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {audiences.map((audience, index) => (
              <ScrollReveal key={audience.title} delay={index * 0.1}>
                <Card variant="bordered" className="h-full text-center group">
                  <div className="p-3 rounded-lg bg-gold/10 text-gold w-fit mx-auto mb-4 group-hover:bg-gold group-hover:text-void transition-all">
                    <audience.icon size={24} />
                  </div>
                  <h3 className="font-display text-lg mb-2">{audience.title}</h3>
                  <p className="text-gray-500 text-sm">{audience.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section bg-void-light">
        <div className="container-custom">
          <ScrollReveal className="text-center mb-16">
            <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
              The Process
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
              How It Works
            </h2>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            {[
              {
                step: "01",
                title: "Initial Consultation",
                description:
                  "We assess your product, market potential, and needs. If we believe we can help, we'll propose a partnership.",
              },
              {
                step: "02",
                title: "Define the Scope",
                description:
                  "We agree on services, commission structure (typically 15-30%), and clear success metrics.",
              },
              {
                step: "03",
                title: "We Get to Work",
                description:
                  "Our team executes on brand development, marketing, sales, content—whatever you need.",
              },
              {
                step: "04",
                title: "You Earn, We Earn",
                description:
                  "When our work generates sales, we take our commission. No sales? No fees. Simple.",
              },
            ].map((item, index) => (
              <ScrollReveal key={item.step} delay={index * 0.1}>
                <div className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center">
                    <span className="font-display text-2xl text-gold">
                      {item.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container-custom">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 text-lg mb-4">
              Have a viable product or creative talent? Let&apos;s talk about how we
              can help you reach your market.
            </p>
            <p className="text-gold mb-8">
              No pitch fees. No consultation costs. Just a conversation.
            </p>
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
        </div>
      </section>
    </div>
  );
}
