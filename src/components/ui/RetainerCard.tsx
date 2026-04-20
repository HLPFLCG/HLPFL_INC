"use client";

import { Check } from "lucide-react";
import type { Retainer } from "@/lib/data";
import type { Lang } from "@/lib/translations";
import { getTranslations } from "@/lib/translations";

interface RetainerCardProps {
  retainer: Retainer;
  lang: Lang;
}

export default function RetainerCard({ retainer, lang }: RetainerCardProps) {
  const global = getTranslations("global", lang);
  const name = lang === "es" ? retainer.nameEs : retainer.nameEn;
  const desc = lang === "es" ? retainer.descEs : retainer.descEn;
  const includes = lang === "es" ? retainer.includesEs : retainer.includes;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border bg-void-lighter shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden ${
        retainer.featured ? "border-gold border-2" : "border-gold/15"
      }`}
    >
      {/* Featured badge */}
      {retainer.featured && (
        <div className="absolute top-3 right-3 bg-gold text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
          {global.featured}
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        {/* Name */}
        <h3 className="font-display text-xl font-bold text-white mb-1">
          {name}
        </h3>

        {/* Price */}
        <div className="mb-3">
          <span className="text-3xl font-bold text-white">
            ${retainer.price}
          </span>
          <span className="text-sm font-normal text-gray-500">
            {global.perMonth}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>

        {/* Includes list */}
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

        {/* Subscribe button */}
        <a
          href={retainer.stripeLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-center font-bold text-sm inline-flex items-center justify-center ${
            retainer.featured ? "btn-primary" : "btn-secondary"
          }`}
        >
          {global.buyNow}
        </a>
      </div>
    </div>
  );
}
