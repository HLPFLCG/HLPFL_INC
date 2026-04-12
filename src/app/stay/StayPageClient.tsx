"use client";

import { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { lodgings, type Location, type LodgingType, type PriceRange } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";

const LOCATIONS: Location[] = ["Cahuita", "Puerto Viejo", "Cocles", "Punta Uva", "Manzanillo"];
const TYPES: LodgingType[] = ["Hotel", "Eco-Lodge", "B&B", "Hostel", "Vacation Rental"];
const PRICES: PriceRange[] = ["$", "$$", "$$$"];

const bgColors: Record<LodgingType, string> = {
  "Hotel": "from-turquoise/60 to-jungle/70",
  "Eco-Lodge": "from-jungle/70 to-turquoise/50",
  "B&B": "from-coral/50 to-sandy-dark/60",
  "Hostel": "from-turquoise/40 to-coral/40",
  "Vacation Rental": "from-jungle/60 to-coral/50",
};

export default function StayPageClient() {
  const { t, lang } = useLanguage();
  const stay = t("stay");
  const common = t("common");

  const [locationFilter, setLocationFilter] = useState<Location | "">("");
  const [typeFilter, setTypeFilter] = useState<LodgingType | "">("");
  const [priceFilter, setPriceFilter] = useState<PriceRange | "">("");

  const filtered = lodgings.filter(
    (l) =>
      (!locationFilter || l.location === locationFilter) &&
      (!typeFilter || l.type === typeFilter) &&
      (!priceFilter || l.price === priceFilter)
  );

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div
        className="py-20 px-4 text-center text-white"
        style={{ background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)" }}
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
          {stay.pageTitle}
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto text-lg">
          {stay.pageSubtitle}
        </p>
      </div>

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 py-6 sticky top-16 z-10">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              {common.filterBy}:
            </span>

            {/* Location */}
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value as Location | "")}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-dark bg-white focus:outline-none focus:border-turquoise min-w-[160px]"
              aria-label={common.location}
            >
              <option value="">{common.allLocations}</option>
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>

            {/* Type */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as LodgingType | "")}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-dark bg-white focus:outline-none focus:border-turquoise min-w-[160px]"
              aria-label={common.type}
            >
              <option value="">{common.allTypes}</option>
              {TYPES.map((ty) => (
                <option key={ty} value={ty}>{ty}</option>
              ))}
            </select>

            {/* Price */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as PriceRange | "")}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-dark bg-white focus:outline-none focus:border-turquoise min-w-[120px]"
              aria-label={common.priceRange}
            >
              <option value="">{common.allPrices}</option>
              {PRICES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            {(locationFilter || typeFilter || priceFilter) && (
              <button
                onClick={() => { setLocationFilter(""); setTypeFilter(""); setPriceFilter(""); }}
                className="text-sm text-coral hover:underline"
              >
                Clear filters ×
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="section bg-sandy-light" aria-label="Lodging listings">
        <div className="container-custom">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-12">{stay.noResults}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((lodging) => (
                <div
                  key={lodging.id}
                  className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                >
                  {/* Placeholder image */}
                  <div
                    className={`h-44 bg-gradient-to-br ${bgColors[lodging.type]} flex items-end p-4`}
                    role="img"
                    aria-label={`Photo placeholder for ${lodging.name} ${lodging.type} in ${lodging.location}, Costa Rica`}
                  >
                    <div className="flex gap-2">
                      <span className="tag-pill">{lodging.type}</span>
                      <span className="tag-pill">{lodging.price}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold text-jungle mb-1">
                      {lodging.name}
                    </h3>
                    <p className="text-turquoise text-xs font-semibold mb-2">
                      📍 {lodging.location}
                    </p>

                    {/* Star rating */}
                    <div className="flex items-center gap-1 mb-3" aria-label={`Rating: ${lodging.rating} out of 5 ${common.stars}`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.round(lodging.rating) ? "star-filled fill-yellow-400" : "text-gray-300"}
                          aria-hidden="true"
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">{lodging.rating}</span>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {lang === "en" ? lodging.descEn : lodging.descEs}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {lang === "en" ? lodging.tagEn : lodging.tagEs}
                      </span>
                      <button className="btn-primary text-sm px-4 py-2 text-xs">
                        {common.bookLearnMore}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Business CTA */}
      <section className="py-16 bg-turquoise text-white text-center">
        <div className="container-custom">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            {stay.listingsCta}
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {stay.listingsCtaDesc}
          </p>
          <Link href="/list-with-us" className="btn-outline-white px-8 py-3">
            {stay.listNow}
          </Link>
        </div>
      </section>
    </div>
  );
}
