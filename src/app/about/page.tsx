import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Users, Shield, Sparkles } from "lucide-react";
import { ScrollReveal, Button, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "About | HLPFL INC",
  description:
    "Learn about our mission to empower creative entrepreneurs with tools, resources, and community.",
};

const teamValues = [
  {
    icon: Heart,
    title: "Creator-First Always",
    description:
      "Every decision we make is guided by one question: does this genuinely help creators succeed? If not, we don't do it.",
  },
  {
    icon: Shield,
    title: "Radical Transparency",
    description:
      "No hidden fees, no confusing contracts, no fine print designed to trap you. We believe clarity builds trust.",
  },
  {
    icon: Users,
    title: "Community Over Competition",
    description:
      "We're building a movement, not just a platform. When one creator wins, we all win.",
  },
  {
    icon: Sparkles,
    title: "Independence is Everything",
    description:
      "Your work, your rights, your decisions. We support and amplify—never extract or control.",
  },
];

const milestones = [
  { year: "2023", event: "HLPFL founded with a mission to help creators" },
  { year: "2024", event: "Launched distribution tools for independent artists" },
  { year: "2025", event: "Reached 10,000+ creative entrepreneurs served" },
  { year: "2026", event: "Expanded community programs and resources" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section pt-24 md:pt-32">
        <div className="container-custom">
          <div className="max-w-4xl">
            <ScrollReveal>
              <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
                Our Story
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
                We Exist to Help{" "}
                <span className="text-gradient">Creative Entrepreneurs</span>{" "}
                Thrive
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                HLPFL was born from frustration with an industry that takes
                more than it gives. We're here to flip the script—providing
                tools and support without the exploitative contracts.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section bg-void-light">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="font-display text-3xl md:text-4xl">
                  Tools, Not Contracts
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  The creative industry is built on a broken model: talented
                  people sign away their work for the chance to succeed. We
                  believe there's a better way.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  HLPFL is a nonprofit organization providing the infrastructure,
                  tools, and community that creative entrepreneurs need to build
                  sustainable careers—without giving up ownership of their work.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  No VCs demanding growth at all costs. No shareholders expecting
                  extraction. Just genuine support for your creative journey.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} direction="left">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "100%", label: "Royalties to Creators" },
                  { value: "0%", label: "Hidden Fees" },
                  { value: "10K+", label: "Creators Served" },
                  { value: "150+", label: "Distribution Partners" },
                ].map((stat, index) => (
                  <Card key={index} variant="bordered" className="text-center">
                    <div className="font-display text-3xl text-gold mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </Card>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section">
        <div className="container-custom">
          <ScrollReveal className="text-center mb-16">
            <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
              What We Believe
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl">
              Our Core Values
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {teamValues.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <Card variant="bordered" hover className="h-full group">
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-void transition-all">
                      <value.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl mb-2 group-hover:text-gold transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-gray-400">{value.description}</p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section bg-void-light">
        <div className="container-custom">
          <ScrollReveal className="text-center mb-16">
            <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
              Our Journey
            </span>
            <h2 className="font-display text-3xl md:text-4xl">
              Building Something Different
            </h2>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto">
            {milestones.map((milestone, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="flex gap-6 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center font-display text-gold">
                      {milestone.year.slice(-2)}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-px h-full bg-gold/20 mt-2" />
                    )}
                  </div>
                  <div className="pt-3">
                    <span className="text-gold font-medium">{milestone.year}</span>
                    <p className="text-gray-400 mt-1">{milestone.event}</p>
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
              Ready to Join the Movement?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Whether you're just starting out or looking to take your creative
              business to the next level, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/portal">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
