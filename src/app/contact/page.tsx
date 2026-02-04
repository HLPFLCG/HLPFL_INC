"use client";

import { useState } from "react";
import { Mail, MapPin, Clock, Send } from "lucide-react";
import { ScrollReveal, Button, Card } from "@/components/ui";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@hlpfl.com",
    href: "mailto:hello@hlpfl.com",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Remote-first, Global",
    href: null,
  },
  {
    icon: Clock,
    title: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section pt-24 md:pt-32">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <span className="text-gold uppercase tracking-widest text-sm mb-4 block">
                Get in Touch
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
                Let's <span className="text-gradient">Talk</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-gray-400 text-lg">
                Have questions about our tools? Want to collaborate? Just want
                to say hi? We'd love to hear from you.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section pt-0">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 0.1}>
                  <Card variant="bordered" className="group">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-gold/10 text-gold group-hover:bg-gold group-hover:text-void transition-all">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">{item.title}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-lg hover:text-gold transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-lg">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}

              <ScrollReveal delay={0.4}>
                <Card variant="glass" className="mt-8">
                  <h3 className="font-display text-xl mb-3">Quick Support</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    For urgent issues or quick questions, check our FAQ or join
                    our community Discord.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      View FAQ
                    </Button>
                    <Button variant="ghost" size="sm">
                      Join Discord
                    </Button>
                  </div>
                </Card>
              </ScrollReveal>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ScrollReveal delay={0.2}>
                <Card variant="bordered" padding="lg">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                        <Send className="text-green-500" size={32} />
                      </div>
                      <h3 className="font-display text-2xl mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-gray-400 mb-6">
                        Thanks for reaching out. We'll get back to you within 24
                        hours.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            subject: "",
                            message: "",
                          });
                        }}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium mb-2"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-lg bg-void border border-gold/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-2"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-lg bg-void border border-gold/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium mb-2"
                        >
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          required
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-lg bg-void border border-gold/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
                          placeholder="What's this about?"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium mb-2"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-lg bg-void border border-gold/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors resize-none"
                          placeholder="Tell us what's on your mind..."
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        fullWidth
                        isLoading={isSubmitting}
                      >
                        Send Message
                      </Button>
                    </form>
                  )}
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
