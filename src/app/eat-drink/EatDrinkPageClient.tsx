"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { restaurants, type Location, type CuisineType, type PriceRange } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";

const LOCATIONS: Location[] = ["Cahuita", "Puerto Viejo", "Cocles", "Punta Uva", "Manzanillo"];
const CUISINES: CuisineType[] = ["Afro-Caribbean", "Seafood", "Vegetarian", "International", "Local Soda"];
const PRICES: PriceRange[] = ["$", "$$", "$$$"];

const cuisineBg: Record<CuisineType, string> = {
  "Afro-Caribbean": "from-coral/60 to-jungle/60",
  "Seafood": "from-turquoise/60 to-jungle/50",
  "Vegetarian": "from-jungle/50 to-turquoise/40",
  "International": "from-sandy-dark/50 to-turquoise/40",
  "Local Soda": "from-coral/40 to-sandy-dark/50",
};

export default function EatDrinkPageClient() {
  const { t, lang } = useLanguage();
  const eatDrink = t("eatDrink");
  const common = t("common");

  const [locationFilter, setLocationFilter] = useState<Location | "">("");
  const [cuisineFilter, setCuisineFilter] = useState<CuisineType | "">("");
  const [priceFilter, setPriceFilter] = useState<PriceRange | "">("");

  const filtered = restaurants.filter(
    (r) =>
      (!locationFilter || r.location === locationFilter) &&
      (!cuisineFilter || r.cuisine === cuisineFilter) &&
      (!priceFilter || r.price === priceFilter)
  );

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div
        className="py-20 px-4 text-center text-white"
        style={{ background: "linear-gradient(135deg, #E07A5F 0%, #1B4332 100%)" }}
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
          {eatDrink.pageTitle}
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto text-lg">
          {eatDrink.pageSubtitle}
        </p>
      </div>

      {/* Editorial Feature */}
      <section className="section bg-sandy" aria-label="About Afro-Caribbean cuisine">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-jungle mb-6">
              {eatDrink.editorialTitle}
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              {eatDrink.editorialBody}
            </p>

            {/* Dish tags */}
            <div className="flex flex-wrap gap-3 mt-8" aria-label="Local dishes to try">
              {["Rice & Beans in Coconut Milk", "Rondon Stew", "Patacones", "Fresh Ceviche", "Agua de Pipa", "Jerk Chicken", "Whole Lobster"].map((dish) => (
                <span key={dish} className="px-3 py-1 rounded-full bg-coral/10 text-coral-dark text-sm font-medium border border-coral/20">
                  {dish}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 py-6 sticky top-16 z-10">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              {common.filterBy}:
            </span>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value as Location | "")}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-dark bg-white focus:outline-none focus:border-turquoise min-w-[160px]"
              aria-label={common.location}
            >
              <option value="">{common.allLocations}</option>
              {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>

            <select
              value={cuisineFilter}
              onChange={(e) => setCuisineFilter(e.target.value as CuisineType | "")}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-dark bg-white focus:outline-none focus:border-turquoise min-w-[160px]"
              aria-label="Cuisine type"
            >
              <option value="">{common.allTypes}</option>
              {CUISINES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as PriceRange | "")}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-dark bg-white focus:outline-none focus:border-turquoise min-w-[120px]"
              aria-label={common.priceRange}
            >
              <option value="">{common.allPrices}</option>
              {PRICES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>

            {(locationFilter || cuisineFilter || priceFilter) && (
              <button
                onClick={() => { setLocationFilter(""); setCuisineFilter(""); setPriceFilter(""); }}
                className="text-sm text-coral hover:underline"
              >
                Clear filters ×
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Restaurant Listings */}
      <section className="section bg-sandy-light" aria-label="Restaurant listings">
        <div className="container-custom">
          <h2 className="font-display text-3xl font-bold text-jungle mb-10 text-center">
            {eatDrink.restaurantsTitle}
          </h2>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-12">{eatDrink.noResults}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                >
                  {/* Placeholder image */}
                  <div
                    className={`h-40 bg-gradient-to-br ${cuisineBg[restaurant.cuisine]} flex items-end p-4`}
                    role="img"
                    aria-label={`Photo placeholder for ${restaurant.name} restaurant in ${restaurant.location}, Costa Rica`}
                  >
                    <div className="flex gap-2">
                      <span className="tag-pill">{restaurant.cuisine}</span>
                      <span className="tag-pill">{restaurant.price}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold text-jungle mb-1">
                      {restaurant.name}
                    </h3>
                    <p className="text-turquoise text-xs font-semibold mb-2">
                      📍 {restaurant.location}
                    </p>

                    {/* Star rating */}
                    <div className="flex items-center gap-1 mb-2" aria-label={`Rating: ${restaurant.rating} out of 5 ${common.stars}`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.round(restaurant.rating) ? "star-filled fill-yellow-400" : "text-gray-300"}
                          aria-hidden="true"
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">{restaurant.rating}</span>
                    </div>

                    <p className="text-xs text-coral font-medium mb-3">
                      ★ {lang === "en" ? restaurant.specialtyEn : restaurant.specialtyEs}
                    </p>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {lang === "en" ? restaurant.descEn : restaurant.descEs}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
