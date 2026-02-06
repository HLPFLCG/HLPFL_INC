import { Metadata } from "next";
import Link from "next/link";
import { Mail, ArrowRight, CheckCircle, Newspaper, Users, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Subscribe to the HLPFL newsletter for the latest news, case studies, and resources for creative entrepreneurs. Get insights delivered to your inbox.",
  keywords: [
    "creative entrepreneur newsletter",
    "artist business tips",
    "creator economy news",
    "HLPFL updates",
    "nonprofit newsletter",
  ],
  openGraph: {
    title: "Newsletter | HLPFL INC",
    description:
      "Subscribe to the HLPFL newsletter for news and resources for creative entrepreneurs.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HLPFL INC" }],
  },
};

const benefits = [
  {
    icon: Newspaper,
    title: "Industry Insights",
    description: "Stay informed about trends affecting creative entrepreneurs",
  },
  {
    icon: Users,
    title: "Success Stories",
    description: "Learn from creators who've built thriving businesses",
  },
  {
    icon: Lightbulb,
    title: "Practical Tips",
    description: "Actionable advice for growing your creative business",
  },
];

export default function NewsletterPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 text-gold mb-6">
            <Mail size={32} />
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            Stay <span className="text-gradient">Connected</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get the latest news, case studies, and resources for creative
            entrepreneurs delivered straight to your inbox. No spam, just value.
          </p>
        </div>

        {/* Signup Form */}
        <div className="p-8 lg:p-12 rounded-2xl bg-void-light border border-gold/20 mb-12">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-void border border-gold/20 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors"
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-4 py-3 rounded-lg bg-void border border-gold/20 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors"
                  placeholder="Your last name"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-void border border-gold/20 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                I&apos;m interested in (optional)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Brand Development",
                  "Business Formation",
                  "Sales & Marketing",
                  "Content Creation",
                  "Creator Education",
                  "General News",
                ].map((interest) => (
                  <label
                    key={interest}
                    className="flex items-center gap-2 p-3 rounded-lg bg-void border border-gold/10 hover:border-gold/30 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      name="interests"
                      value={interest}
                      className="w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold focus:ring-offset-0 bg-void"
                    />
                    <span className="text-sm text-gray-300">{interest}</span>
                  </label>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gold hover:bg-gold-light text-void font-semibold rounded-lg transition-colors text-lg"
            >
              Subscribe to Newsletter
              <ArrowRight size={20} />
            </button>
            <p className="text-center text-gray-500 text-sm">
              By subscribing, you agree to our{" "}
              <Link href="/privacy" className="text-gold hover:underline">
                Privacy Policy
              </Link>
              . Unsubscribe anytime.
            </p>
          </form>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="p-6 rounded-xl bg-void-light border border-gold/10"
            >
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold mb-4">
                <benefit.icon size={24} />
              </div>
              <h3 className="font-display text-xl mb-2">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* What You'll Get */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent border border-gold/20">
          <h2 className="font-display text-2xl mb-6">What You&apos;ll Get</h2>
          <ul className="space-y-4">
            {[
              "Monthly digest of the latest in the creator economy",
              "Case studies from successful creative entrepreneurs",
              "Early access to new HLPFL programs and services",
              "Tips for building a sustainable creative business",
              "Industry news and opportunities curated for creators",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle size={20} className="text-gold flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Blog Posts */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Want to see what we write about?
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
          >
            Browse Our Blog
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
