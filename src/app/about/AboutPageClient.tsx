"use client";

import { Mail, Leaf, Heart, Globe } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPageClient() {
  const { t } = useLanguage();
  const about = t("about");

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div
        className="py-20 px-4 text-center text-white"
        style={{ background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)" }}
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
          {about.pageTitle}
        </h1>
      </div>

      {/* Mission */}
      <section className="section bg-sandy-light" aria-label="Our mission">
        <div className="container-custom max-w-3xl">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-turquoise/10 flex items-center justify-center">
              <Globe className="text-turquoise w-7 h-7" aria-hidden="true" />
            </div>
          </div>
          <h2 className="font-display text-3xl font-bold text-jungle text-center mb-6">
            {about.missionTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed text-base text-center">
            {about.missionBody}
          </p>
        </div>
      </section>

      {/* Sustainability */}
      <section
        className="section text-white"
        style={{ background: "linear-gradient(135deg, #0E9AA7 0%, #1B4332 100%)" }}
        aria-label="Sustainable tourism commitment"
      >
        <div className="container-custom max-w-3xl">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
              <Leaf className="text-sandy w-7 h-7" aria-hidden="true" />
            </div>
          </div>
          <h2 className="font-display text-3xl font-bold text-sandy text-center mb-6">
            {about.sustainabilityTitle}
          </h2>
          <p className="text-white/85 leading-relaxed text-base text-center">
            {about.sustainabilityBody}
          </p>
        </div>
      </section>

      {/* Cultural Respect */}
      <section className="section bg-white" aria-label="Cultural respect">
        <div className="container-custom max-w-3xl">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-coral/10 flex items-center justify-center">
              <Heart className="text-coral w-7 h-7" aria-hidden="true" />
            </div>
          </div>
          <h2 className="font-display text-3xl font-bold text-jungle text-center mb-6">
            {about.cultureTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed text-base text-center">
            {about.cultureBody}
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="section bg-sandy" aria-label="Contact information">
        <div className="container-custom max-w-xl text-center">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-jungle/10 flex items-center justify-center">
              <Mail className="text-jungle w-7 h-7" aria-hidden="true" />
            </div>
          </div>
          <h2 className="font-display text-3xl font-bold text-jungle mb-4">
            {about.contactTitle}
          </h2>
          <p className="text-gray-600 mb-6">{about.contactNote}</p>
          <a
            href={`mailto:${about.contactEmail}`}
            className="btn-primary px-8 py-3 text-base"
          >
            {about.contactEmail}
          </a>

          <div className="mt-12 pt-8 border-t border-jungle/10">
            <p className="text-gray-500 text-sm mb-4">
              Are you a local business owner? List your property, tour, or restaurant for free.
            </p>
            <Link href="/list-with-us" className="btn-outline px-6 py-2.5 text-sm">
              List With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
