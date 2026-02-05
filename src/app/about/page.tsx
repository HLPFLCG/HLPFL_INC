import { Metadata } from "next";
import Link from "next/link";
import { Heart, Zap, Users, Shield, ArrowRight, Quote } from "lucide-react";
import { ScrollReveal, Button, Card } from "@/components/ui";
import { audiences } from "@/lib/data";

export const metadata: Metadata = {
  title: "About | HLPFL INC",
  description:
    "HLPFL INC is a Wyoming nonprofit advocating for creative entrepreneurs. Zero upfront costs, commission-only model. Founded by James Rockel III.",
  keywords: [
    "HLPFL INC",
    "nonprofit",
    "creative entrepreneurs",
    "Wyoming 501c3",
    "James Rockel",
    "artist advocacy",
  ],
};

const values = [
  {
    icon: Heart,
    title: "Creator-First",
    description:
      "Every decision we make starts with one question: does this help the creator? If not, we don't do it.",
  },
  {
    icon: Zap,
    title: "Radical Transparency",
    description:
      "No hidden fees, no surprise terms, no bullshit. You'll always know exactly what you're getting and what it costs.",
  },
  {
    icon: Users,
    title: "Community Over Competition",
    description:
      "Creators supporting creators. We believe in building each other up, not tearing each other down.",
  },
  {
    icon: Shield,
    title: "Your Rights, Always",
    description:
      "You keep 100% of your intellectual property. We help you protect your work, not take it from you.",
  },
];

const timeline = [
  {
    year: "2024",
    title: "The Vision",
    description:
      "Recognized the need for fair, transparent business support for independent creative entrepreneurs.",
  },
  {
    year: "2025",
    title: "Nonprofit Formation",
    description:
      "Established HLPFL INC as a Wyoming 501(c)(3) nonprofit with a commission-only model that puts creators first.",
  },
  {
    year: "2026",
    title: "Growing Impact",
    description:
      "Serving creative entrepreneurs across multiple disciplines: inventors, musicians, visual artists, designers, and writers.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section pt-24 md:pt-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
                About Us
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
                Advocating for{" "}
                <span className="text-gradient">Creative Entrepreneurs</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                HLPFL Inc. is a Wyoming 501(c)(3) nonprofit advocating for fair
                treatment, equitable compensation, and protection of rights for
                creative entrepreneurs.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Key Message Quote */}
      <section className="section pt-8 pb-16">
        <div className="container-custom">
          <ScrollReveal>
            <Card variant="bordered" className="max-w-3xl mx-auto text-center py-12">
              <Quote size={40} className="text-gold/30 mx-auto mb-4" />
              <p className="font-display text-2xl md:text-3xl text-gold mb-4">
                &ldquo;You shouldn&apos;t have to pay thousands just to find out if someone can help you.&rdquo;
              </p>
              <p className="text-gray-400">
                We don&apos;t charge anything upfront. We earn when you earn. That&apos;s it.
              </p>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section bg-void-light">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
                Our Mission
              </span>
              <h2 className="font-display text-3xl md:text-4xl mb-6">
                Tools, Not Contracts
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  The creator economy generates over $100 billion annually, yet the
                  individuals who create this value routinely face exploitation.
                </p>
                <p>
                  Predatory business services charge thousands of dollars upfront
                  with no guaranteed results. Unfair contract terms strip creators
                  of their rights and revenue. A lack of accessible business
                  education leaves talented entrepreneurs vulnerable.
                </p>
                <p>
                  We built HLPFL to be the opposite of that. Our commission-only
                  model means we only succeed when our clients succeed. No upfront
                  fees. No predatory contracts. No exploitation.
                </p>
              </div>
              <p className="text-gold font-semibold mt-6 text-lg">
                No VCs. No Exploitation. No Bullshit.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "$0", label: "Upfront Fees" },
                  { value: "100%", label: "Your Rights" },
                  { value: "15-30%", label: "Commission Only" },
                  { value: "501(c)(3)", label: "Nonprofit Status" },
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {audiences.map((audience, index) => (
              <ScrollReveal key={audience.title} delay={index * 0.1}>
                <Card variant="bordered" hover className="h-full group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gold/10 text-gold group-hover:bg-gold group-hover:text-void transition-all">
                      <audience.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl mb-2 group-hover:text-gold transition-colors">
                        {audience.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{audience.description}</p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-void-light">
        <div className="container-custom">
          <ScrollReveal className="text-center mb-16">
            <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
              What We Believe
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
              Our Core Values
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <Card variant="bordered" hover className="h-full group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gold/10 text-gold group-hover:bg-gold group-hover:text-void transition-all">
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

      {/* Leadership Section */}
      <section className="section">
        <div className="container-custom">
          <ScrollReveal className="text-center mb-12">
            <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
              Leadership
            </span>
            <h2 className="font-display text-3xl md:text-4xl mb-4">
              Our Team
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Led by experienced professionals committed to empowering creative entrepreneurs.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Founder */}
            <ScrollReveal delay={0.1}>
              <Card variant="bordered" className="text-center h-full">
                <div className="w-24 h-24 rounded-full bg-gold/10 mx-auto mb-6 flex items-center justify-center">
                  <span className="font-display text-3xl text-gold">JR</span>
                </div>
                <h3 className="font-display text-2xl mb-2">James Rockel III</h3>
                <p className="text-gold mb-4">Founder & CEO</p>
                <p className="text-gray-400 text-sm">
                  James brings direct experience in creator business development,
                  artist management, and entrepreneurship. The mission of creator
                  protection continues a family legacy established by his
                  great-grandfather Archie Acciacca, a pioneer of UAW Local 174.
                </p>
              </Card>
            </ScrollReveal>

            {/* Board Member Placeholder 1 */}
            <ScrollReveal delay={0.2}>
              <Card variant="bordered" className="text-center h-full border-dashed">
                <div className="w-24 h-24 rounded-full bg-void-lighter mx-auto mb-6 flex items-center justify-center border-2 border-dashed border-gold/30">
                  <span className="font-display text-3xl text-gold/30">?</span>
                </div>
                <h3 className="font-display text-2xl mb-2 text-gray-500">Board Member</h3>
                <p className="text-gold/50 mb-4">Position Open</p>
                <p className="text-gray-500 text-sm">
                  We&apos;re seeking passionate advocates for creative entrepreneurs
                  to join our board. Interested in making a difference?
                </p>
                <Link href="/contact" className="text-gold hover:text-gold-light transition-colors text-sm mt-4 inline-block">
                  Learn More →
                </Link>
              </Card>
            </ScrollReveal>

            {/* Board Member Placeholder 2 */}
            <ScrollReveal delay={0.3}>
              <Card variant="bordered" className="text-center h-full border-dashed">
                <div className="w-24 h-24 rounded-full bg-void-lighter mx-auto mb-6 flex items-center justify-center border-2 border-dashed border-gold/30">
                  <span className="font-display text-3xl text-gold/30">?</span>
                </div>
                <h3 className="font-display text-2xl mb-2 text-gray-500">Board Member</h3>
                <p className="text-gold/50 mb-4">Position Open</p>
                <p className="text-gray-500 text-sm">
                  Help shape the future of creator advocacy. We value diverse
                  perspectives and industry experience.
                </p>
                <Link href="/contact" className="text-gold hover:text-gold-light transition-colors text-sm mt-4 inline-block">
                  Learn More →
                </Link>
              </Card>
            </ScrollReveal>
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
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl">
              Building Something Different
            </h2>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <ScrollReveal key={item.year} delay={index * 0.1}>
                <div className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex-shrink-0 w-20">
                    <span className="font-display text-2xl text-gold">
                      {item.year}
                    </span>
                  </div>
                  <div className="flex-1 pb-8 border-l border-gold/20 pl-6 relative">
                    <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-gold -translate-x-[7px]" />
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
              Join the Movement
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Whether you&apos;re a creator looking for support or someone who
              believes in fair treatment for creative entrepreneurs—we&apos;d
              love to connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="group">
                  Get in Touch
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg">
                  See Our Services
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
