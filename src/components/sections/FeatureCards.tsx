"use client";

import Link from "next/link";
import { Compass, BedDouble, UtensilsCrossed } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const features = [
  {
    icon: Compass,
    titleKey: "featureExploreTitle" as const,
    descKey: "featureExploreDesc" as const,
    href: "/explore",
    color: "bg-turquoise",
    lightColor: "bg-turquoise/10",
    textColor: "text-turquoise",
  },
  {
    icon: BedDouble,
    titleKey: "featureStayTitle" as const,
    descKey: "featureStayDesc" as const,
    href: "/stay",
    color: "bg-jungle",
    lightColor: "bg-jungle/10",
    textColor: "text-jungle",
  },
  {
    icon: UtensilsCrossed,
    titleKey: "featureEatTitle" as const,
    descKey: "featureEatDesc" as const,
    href: "/eat-drink",
    color: "bg-coral",
    lightColor: "bg-coral/10",
    textColor: "text-coral",
  },
];

export default function FeatureCards() {
  const { t } = useLanguage();
  const home = t("home");
  const common = t("common");

  return (
    <section className="section bg-white" aria-label="Main sections">
      <div className="container-custom">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-jungle text-center mb-12">
          {home.featuresTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, titleKey, descKey, href, lightColor, textColor }) => (
            <Link
              key={href}
              href={href}
              className="group card-hover rounded-2xl border border-gray-100 bg-white p-8 flex flex-col items-start gap-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`${lightColor} w-14 h-14 rounded-xl flex items-center justify-center`}>
                <Icon className={`${textColor} w-7 h-7`} aria-hidden="true" />
              </div>
              <div>
                <h3 className={`font-display text-2xl font-bold ${textColor} mb-3`}>
                  {home[titleKey]}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {home[descKey]}
                </p>
              </div>
              <span className={`mt-auto ${textColor} text-sm font-semibold group-hover:underline`}>
                {common.learnMore} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
