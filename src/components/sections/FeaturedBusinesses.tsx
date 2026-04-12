"use client";

import Link from "next/link";
import { featuredBusinesses } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FeaturedBusinesses() {
  const { t, lang } = useLanguage();
  const home = t("home");

  return (
    <section className="section bg-sandy-light" aria-label="Featured businesses">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-jungle mb-4">
            {home.featuredTitle}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            {home.featuredSubtitle}
          </p>
        </div>

        {/* Carousel / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBusinesses.map((biz) => (
            <div
              key={biz.id}
              className="group card-hover rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100"
            >
              {/* Placeholder image with gradient */}
              <div
                className={`h-44 bg-gradient-to-br ${biz.bgColor} flex items-end p-4`}
                role="img"
                aria-label={`Photo placeholder for ${biz.name} in ${biz.location}, Costa Rica`}
              >
                <span className="tag-pill text-xs">
                  {lang === "en" ? biz.categoryEn : biz.categoryEs}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display text-lg font-bold text-jungle leading-snug">
                    {biz.name}
                  </h3>
                </div>
                <p className="text-turquoise text-xs font-semibold mb-2">
                  📍 {biz.location}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lang === "en" ? biz.descEn : biz.descEs}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/list-with-us" className="btn-outline text-sm px-6 py-3">
            List Your Business — It&apos;s Free
          </Link>
        </div>
      </div>
    </section>
  );
}
