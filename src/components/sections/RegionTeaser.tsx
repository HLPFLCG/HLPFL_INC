"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function RegionTeaser() {
  const { t } = useLanguage();
  const home = t("home");

  return (
    <section
      className="section"
      style={{ background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)" }}
      aria-label="About the region"
    >
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          {/* Decorative top element */}
          <div className="flex justify-center mb-6" aria-hidden="true">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-turquoise" />
              <span className="w-3 h-3 rounded-full bg-coral" />
              <span className="w-3 h-3 rounded-full bg-sandy" />
            </div>
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-sandy mb-8">
            {home.regionTitle}
          </h2>

          <p className="text-white/85 text-lg leading-relaxed">
            {home.regionDesc}
          </p>

          {/* Region tags */}
          <div className="flex flex-wrap justify-center gap-3 mt-10" aria-label="Key locations in the corridor">
            {[
              "Cahuita National Park",
              "Puerto Viejo",
              "Playa Cocles",
              "Punta Uva",
              "Manzanillo",
              "Gandoca-Manzanillo Refuge",
            ].map((place) => (
              <span
                key={place}
                className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm border border-white/20"
              >
                {place}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
