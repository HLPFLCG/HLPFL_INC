"use client";

import { Check } from "lucide-react";
import type { Package } from "@/lib/data";
import type { Lang } from "@/lib/translations";
import { getTranslations } from "@/lib/translations";

interface PackageCardProps {
  pkg: Package;
  lang: Lang;
}

export default function PackageCard({ pkg, lang }: PackageCardProps) {
  const global = getTranslations("global", lang);
  const name = lang === "es" ? pkg.nameEs : pkg.nameEn;
  const tagLine = lang === "es" ? pkg.tagEs : pkg.tagEn;
  const desc = lang === "es" ? pkg.descEs : pkg.descEn;
  const includes = lang === "es" ? pkg.includesEs : pkg.includes;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border bg-void-lighter shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden ${
        pkg.featured ? "border-gold border-2" : "border-gold/15"
      }`}
    >
      {/* Featured badge */}
      {pkg.featured && (
        <div className="absolute top-3 right-3 bg-gold text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
          {global.featured}
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        {/* Emoji and name */}
        <div className="mb-3">
          <span className="text-3xl" role="img" aria-hidden="true">
            {pkg.emoji}
          </span>
          <h3 className="font-display text-xl font-bold text-white mt-2">
            {name}
          </h3>
          <p className="text-sm text-turquoise font-semibold italic mt-1">
            &ldquo;{tagLine}&rdquo;
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>

        {/* Price and savings */}
        <div className="mb-4">
          <span className="text-3xl font-bold text-white">${pkg.price}</span>
          {pkg.savingsVsALaCarte > 0 && (
            <span className="ml-2 inline-flex items-center bg-gold/15 text-gold text-xs font-bold px-2 py-0.5 rounded-full">
              {global.save} ${pkg.savingsVsALaCarte} {global.vsAlaCarte}
            </span>
          )}
        </div>

        {/* Included items */}
        <ul className="flex flex-col gap-2 mb-6 flex-1">
          {includes.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white">
              <Check
                size={16}
                className="text-gold flex-shrink-0 mt-0.5"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <a
          href={pkg.stripeLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-center font-bold text-sm inline-flex items-center justify-center ${
            pkg.featured ? "btn-primary" : "btn-secondary"
          }`}
        >
          {global.buyNow}
        </a>
      </div>
    </div>
  );
}
