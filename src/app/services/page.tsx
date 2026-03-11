import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, DollarSign, Zap, Shield, Heart } from "lucide-react";
import { ScrollReveal, Button, Card } from "@/components/ui";
import { services, audiences } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services | HLPFL INC",
  description:
    "Full business infrastructure for creative entrepreneurs. $1,000 activation + commission model — brand, website, contracts, sales, all included. We earn when you earn.",
  keywords: [
    "creative entrepreneur services",
    "$1000 activation",
    "commission model",
    "brand development",
    "sales representation",
    "business formation",
  ],
  openGraph: {
    title: "Services | HLPFL INC",
    description:
      "Full business infrastructure for creative entrepreneurs. $1,000 activation + commission. We earn when you earn.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HLPFL INC" }],
  },
};

const commissionFeatures = [
  {
    icon: DollarSign,
    title: "$1,000 Activation",
    description: "One-time fee covers entity setup, brand, website, contracts, sales materials — $10K+ in value.",
  },
  {
    icon: Zap,
    title: "Success-Aligned",
    description: "After activation, we earn a commission on revenue we help generate. Your success is our success.",
  },
  {
    icon: Shield,
    title: "Transparent Terms",
    description: "Commission rates (10-25%) negotiated upfront and in writing. No hidden costs. No surprises.",
  },
  {
    icon: Heart,
    title: "Your Rights",
    description: "You keep 100% of your intellectual property. Always. No exceptions.",
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
                $1,000 Replaces{" "}
                <span className="text-gradient">$10,000+</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-gray-400 text-lg md:text-xl mb-4">
                Other companies charge $10,000–$30,000 for what we deliver in the activation alone.
              </p>
              <p className="text-gold text-lg font-medium">
                $1,000 to start. Commission on revenue we help generate. That&apos;s it.
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
              What&apos;s Included
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
              A Full Business Team. One Partner.
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to sell professionally — built by a team that&apos;s invested in your success.
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
              We work with creators who have a product or talent but lack the business
              infrastructure to monetize it.
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
              Three Steps to a Real Business
            </h2>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            {[
              {
                step: "01",
                title: "Activate — $1,000",
                description:
                  "Full business audit, entity setup, brand strategy, and market positioning. In 2–4 weeks, you have a legitimate business.",
              },
              {
                step: "02",
                title: "Build — Included",
                description:
                  "Custom website, brand identity, contracts, sales materials, social presence. Everything you need to sell professionally.",
              },
              {
                step: "03",
                title: "Grow — Commission",
                description:
                  "We actively sell for you. Outreach, negotiation, deal closing, pipeline management. We earn when you earn.",
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
              can build your business.
            </p>
            <p className="text-gold mb-8">
              $1,000 activation. Commission on sales. Your rights, always.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="group">
                  Apply to Partner
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  See Case Studies
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
