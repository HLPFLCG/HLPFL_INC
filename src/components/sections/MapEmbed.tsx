"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function MapEmbed() {
  const { t } = useLanguage();
  const home = t("home");

  return (
    <section className="section bg-white" aria-label="Interactive map of the region">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-jungle mb-4">
            {home.mapTitle}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            {home.mapSubtitle}
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            title="Map of the Cahuita to Manzanillo corridor, Limón Province, Costa Rica"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-83.0%2C9.5%2C-82.55%2C9.85&layer=mapnik&marker=9.6565%2C-82.7536"
            width="100%"
            height="450"
            className="w-full"
            loading="lazy"
            allowFullScreen
            aria-label="OpenStreetMap showing the Caribbean coast corridor from Cahuita to Manzanillo in Limón Province, Costa Rica"
          />
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">
          Map data ©{" "}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-turquoise"
          >
            OpenStreetMap contributors
          </a>
        </p>
      </div>
    </section>
  );
}
