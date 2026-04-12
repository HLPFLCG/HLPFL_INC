"use client";

import Link from "next/link";
import { activities } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";

const tagColors: Record<string, string> = {
  Water: "bg-turquoise/10 text-turquoise-dark",
  Wildlife: "bg-jungle/10 text-jungle",
  Culture: "bg-coral/10 text-coral-dark",
  Hiking: "bg-sandy-dark/50 text-dark",
};

export default function ExplorePageClient() {
  const { t, lang } = useLanguage();
  const explore = t("explore");
  const common = t("common");

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div
        className="py-20 px-4 text-center text-white"
        style={{
          background:
            "linear-gradient(135deg, #1B4332 0%, #0E9AA7 100%)",
        }}
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
          {explore.pageTitle}
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto text-lg">
          {explore.pageSubtitle}
        </p>
      </div>

      {/* Activities Grid */}
      <section className="section bg-sandy-light" aria-label="Activities and experiences">
        <div className="container-custom">
          <h2 className="font-display text-3xl font-bold text-jungle mb-10 text-center">
            {explore.activitiesTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-turquoise/10 flex items-center justify-center shrink-0">
                      <Icon className="text-turquoise w-6 h-6" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold text-jungle mb-1">
                        {lang === "en" ? activity.titleEn : activity.titleEs}
                      </h3>
                      <p className="text-turquoise text-xs font-semibold">
                        📍 {lang === "en" ? activity.locationEn : activity.locationEs}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {lang === "en" ? activity.descEn : activity.descEs}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColors[activity.tag] ?? "bg-gray-100 text-gray-600"}`}
                    >
                      {activity.tag}
                    </span>
                    <Link
                      href="/list-with-us"
                      className="text-turquoise text-sm font-semibold hover:underline"
                    >
                      {common.findAGuide}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 text-center text-white"
        style={{ background: "linear-gradient(135deg, #E07A5F 0%, #C4614A 100%)" }}
      >
        <div className="container-custom">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Ready to explore the Caribbean coast?
          </h2>
          <p className="text-white/80 mb-8">
            Plan your perfect trip — from 3-day highlights to 7-day immersions.
          </p>
          <Link href="/plan" className="btn-outline-white px-8 py-3">
            {common.planYourVisit}
          </Link>
        </div>
      </section>
    </div>
  );
}
