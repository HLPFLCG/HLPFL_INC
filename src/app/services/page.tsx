import { Metadata } from "next";
import Link from "next/link";
import {
  Music,
  BarChart2,
  Users,
  Shield,
  Headphones,
  Globe,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";
import { ScrollReveal, Button, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services | HLPFL INC",
  description:
    "Distribution, analytics, community, and more. Everything creative entrepreneurs need to succeed.",
};

const services = [
  {
    icon: Music,
    title: "Music Distribution",
    description:
      "Get your music on Spotify, Apple Music, Tidal, Amazon, and 150+ other platforms worldwide.",
    features: [
      "Unlimited releases",
      "Keep 100% of royalties",
      "Same-day delivery to stores",
      "Pre-save campaigns",
      "Release scheduling",
    ],
  },
  {
    icon: BarChart2,
    title: "Analytics & Insights",
    description:
      "Understand your audience with detailed analytics across all platforms in one dashboard.",
    features: [
      "Real-time streaming data",
      "Audience demographics",
      "Playlist tracking",
      "Revenue reports",
      "Growth trends",
    ],
  },
  {
    icon: Users,
    title: "Community & Networking",
    description:
      "Connect with fellow creatives, collaborate on projects, and grow together.",
    features: [
      "Private Discord community",
      "Collaboration matchmaking",
      "Monthly virtual events",
      "Mentorship programs",
      "Resource sharing",
    ],
  },
  {
    icon: Shield,
    title: "Rights Protection",
    description:
      "Protect your work and ensure you're properly credited and compensated everywhere.",
    features: [
      "Copyright registration help",
      "Royalty collection setup",
      "Content ID enrollment",
      "Sync licensing support",
      "Legal resources",
    ],
  },
  {
    icon: Headphones,
    title: "Production Support",
    description:
      "Access professional resources to take your sound to the next level.",
    features: [
      "Mixing & mastering discounts",
      "Producer directory",
      "Sample pack library",
      "Feedback sessions",
      "Technical tutorials",
    ],
  },
  {
    icon: Globe,
    title: "Global Marketing",
    description:
      "Expand your reach with marketing tools and promotional resources.",
    features: [
      "Press release templates",
      "Playlist pitching guides",
      "Social media toolkit",
      "Email marketing tools",
      "Advertising credits",
    ],
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for getting started",
    features: [
      "Basic distribution",
      "Standard analytics",
      "Community access",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    description: "For serious creators",
    features: [
      "Everything in Starter",
      "Priority distribution",
      "Advanced analytics",
      "Playlist pitching",
      "Marketing toolkit",
      "Priority support",
    ],
    cta: "Start Pro",
    popular: true,
  },
  {
    name: "Team",
    price: "$29.99",
    period: "/month",
    description: "For labels & collectives",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "White-label options",
      "API access",
      "Dedicated manager",
      "Custom features",
    ],
    cta: "Contact Us",
    popular: false,
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
                Our Services
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
                Everything You Need to{" "}
                <span className="text-gradient">Succeed</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-gray-400 text-lg md:text-xl">
                Professional tools and resources without the professional price
                tag or exploitative contracts.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section pt-8">
        <div className="container-custom">
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

      {/* Pricing Section */}
      <section className="section bg-void-light" id="pricing">
        <div className="container-custom">
          <ScrollReveal className="text-center mb-16">
            <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
              Simple Pricing
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
              Choose Your Plan
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              No hidden fees, no surprises. Upgrade, downgrade, or cancel
              anytime.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <ScrollReveal key={tier.name} delay={index * 0.1}>
                <Card
                  variant={tier.popular ? "bordered" : "default"}
                  className={`h-full relative ${
                    tier.popular ? "border-gold ring-1 ring-gold" : ""
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-gold text-void text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <Sparkles size={12} /> Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="font-display text-2xl mb-2">{tier.name}</h3>
                    <div className="mb-2">
                      <span className="font-display text-4xl text-gold">
                        {tier.price}
                      </span>
                      {tier.period && (
                        <span className="text-gray-500">{tier.period}</span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">{tier.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Check size={16} className="text-gold flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={tier.popular ? "primary" : "outline"}
                    fullWidth
                    className="mt-auto"
                  >
                    {tier.cta}
                  </Button>
                </Card>
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
              Not Sure Where to Start?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Our team is happy to walk you through our services and help you
              find the perfect fit for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="group">
                  Schedule a Call
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>
              <Link href="/portal">
                <Button variant="outline" size="lg">
                  Try Free First
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
