"use client";

import { useState } from "react";
import { Bus, Car, Truck, Calendar, Package, DollarSign, Wifi, Leaf, Check, X } from "lucide-react";
import { itineraries } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PlanPageClient() {
  const { t, lang } = useLanguage();
  const plan = t("plan");
  const [openItinerary, setOpenItinerary] = useState<string | null>(null);

  const transportModes = [
    { icon: Bus, titleKey: "busTitle" as const, descKey: "busDesc" as const },
    { icon: Truck, titleKey: "shuttleTitle" as const, descKey: "shuttleDesc" as const },
    { icon: Car, titleKey: "driveTitle" as const, descKey: "driveDesc" as const },
  ];

  const tipSections = [
    { icon: Package, titleKey: "packingTitle" as const, itemsKey: "packingItems" as const },
    { icon: DollarSign, titleKey: "currencyTitle" as const, descKey: "currencyDesc" as const },
    { icon: Wifi, titleKey: "connectivityTitle" as const, descKey: "connectivityDesc" as const },
  ];

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div
        className="py-20 px-4 text-center text-white"
        style={{ background: "linear-gradient(135deg, #0E9AA7 0%, #1B4332 100%)" }}
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
          {plan.pageTitle}
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto text-lg">
          {plan.pageSubtitle}
        </p>
      </div>

      {/* Getting Here */}
      <section className="section bg-sandy-light" aria-label="How to get to the Caribbean coast">
        <div className="container-custom">
          <h2 className="font-display text-3xl font-bold text-jungle mb-10 text-center">
            {plan.gettingHereTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transportModes.map(({ icon: Icon, titleKey, descKey }) => (
              <div key={titleKey} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-turquoise/10 flex items-center justify-center mb-4">
                  <Icon className="text-turquoise w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-bold text-jungle mb-3">
                  {plan[titleKey]}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {plan[descKey]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Time to Visit */}
      <section
        className="section text-white"
        style={{ background: "linear-gradient(135deg, #2D6A4F 0%, #0E9AA7 100%)" }}
        aria-label="Best time to visit the Caribbean coast"
      >
        <div className="container-custom max-w-3xl">
          <div className="flex justify-center mb-6" aria-hidden="true">
            <Calendar className="w-12 h-12 text-sandy" />
          </div>
          <h2 className="font-display text-3xl font-bold text-sandy text-center mb-6">
            {plan.bestTimeTitle}
          </h2>
          <p className="text-white/85 text-base leading-relaxed text-center">
            {plan.bestTimeDesc}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { month: "Feb–Apr", icon: "☀️", desc: lang === "en" ? "Dry & sunny" : "Seco y soleado" },
              { month: "May–Aug", icon: "🌦️", desc: lang === "en" ? "Lush, some rain" : "Exuberante, algo de lluvia" },
              { month: "Sep–Oct", icon: "☀️", desc: lang === "en" ? "Second dry season" : "Segunda estación seca" },
              { month: "Nov–Jan", icon: "🌧️", desc: lang === "en" ? "Rainy, tropical" : "Lluvioso, tropical" },
            ].map(({ month, icon, desc }) => (
              <div key={month} className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="text-2xl mb-2" aria-hidden="true">{icon}</div>
                <div className="font-semibold text-sandy text-sm">{month}</div>
                <div className="text-white/70 text-xs mt-1">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Itineraries */}
      <section className="section bg-white" aria-label="Sample itineraries">
        <div className="container-custom">
          <h2 className="font-display text-3xl font-bold text-jungle mb-10 text-center">
            {plan.itinerariesTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {itineraries.map((itin) => (
              <div key={itin.id} className="bg-sandy-light rounded-2xl border border-gray-100 overflow-hidden">
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => setOpenItinerary(openItinerary === itin.id ? null : itin.id)}
                  role="button"
                  aria-expanded={openItinerary === itin.id}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setOpenItinerary(openItinerary === itin.id ? null : itin.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="tag-pill text-turquoise-dark bg-turquoise/10">
                      {lang === "en" ? itin.durationEn : itin.durationEs}
                    </span>
                    <span className="text-turquoise text-lg font-bold">
                      {openItinerary === itin.id ? "−" : "+"}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-jungle mb-1">
                    {lang === "en" ? itin.titleEn : itin.titleEs}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {lang === "en" ? itin.taglineEn : itin.taglineEs}
                  </p>
                </div>

                {openItinerary === itin.id && (
                  <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                    {itin.days.map((day) => (
                      <div key={lang === "en" ? day.dayEn : day.dayEs}>
                        <h4 className="font-semibold text-jungle text-sm mb-2">
                          {lang === "en" ? day.dayEn : day.dayEs}
                        </h4>
                        <ul className="space-y-1">
                          {(lang === "en" ? day.activitiesEn : day.activitiesEs).map((act) => (
                            <li key={act} className="text-gray-600 text-xs flex gap-2">
                              <span className="text-turquoise mt-0.5" aria-hidden="true">▸</span>
                              {act}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Essential Tips */}
      <section className="section bg-sandy-light" aria-label="Essential travel tips">
        <div className="container-custom">
          <h2 className="font-display text-3xl font-bold text-jungle mb-10 text-center">
            {plan.essentialTipsTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tipSections.map(({ icon: Icon, titleKey, itemsKey, descKey }) => (
              <div key={titleKey} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-turquoise/10 flex items-center justify-center mb-4">
                  <Icon className="text-turquoise w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-bold text-jungle mb-3">
                  {plan[titleKey]}
                </h3>
                {itemsKey ? (
                  <ul className="space-y-2">
                    {(plan[itemsKey] as readonly string[]).map((item) => (
                      <li key={item} className="text-gray-600 text-sm flex gap-2">
                        <span className="text-turquoise mt-0.5" aria-hidden="true">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {descKey && plan[descKey as keyof typeof plan]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Wildlife Dos & Don'ts */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex justify-center mb-4">
              <Leaf className="w-10 h-10 text-jungle" aria-hidden="true" />
            </div>
            <h3 className="font-display text-2xl font-bold text-jungle text-center mb-8">
              {plan.wildlifeTitle}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-jungle mb-4 flex items-center gap-2">
                  <Check size={18} className="text-turquoise" aria-hidden="true" />
                  Do
                </h4>
                <ul className="space-y-3">
                  {plan.wildlifeDos.map((item) => (
                    <li key={item} className="text-gray-600 text-sm flex gap-2">
                      <Check size={16} className="text-turquoise shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-coral mb-4 flex items-center gap-2">
                  <X size={18} className="text-coral" aria-hidden="true" />
                  Don&apos;t
                </h4>
                <ul className="space-y-3">
                  {plan.wildlifeDonts.map((item) => (
                    <li key={item} className="text-gray-600 text-sm flex gap-2">
                      <X size={16} className="text-coral shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
