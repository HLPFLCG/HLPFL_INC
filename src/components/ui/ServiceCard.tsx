"use client";

import {
  Globe,
  FilePlus,
  Zap,
  Server,
  Pen,
  Palette,
  Mail,
  CreditCard,
  QrCode,
  Wifi,
  MapPin,
  MessageCircle,
  Briefcase,
  Compass,
  List,
  ShoppingBag,
  Store,
  Search,
  TrendingUp,
  Bot,
  MessageSquare,
  Plug,
  Shield,
  ShieldCheck,
  Gauge,
  BarChart2,
  Sparkles,
  Instagram,
  Calendar,
  Layers,
  FileText,
  Send,
  Tag,
  BarChart,
  Users,
  FileQuestion,
  Camera,
  Video,
  Shirt,
  Clock,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/lib/data";
import { getServicePrice, getStripeLink, isContentPricing } from "@/lib/data";
import type { Lang } from "@/lib/translations";
import { getTranslations } from "@/lib/translations";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  FilePlus,
  Zap,
  Server,
  Pen,
  Palette,
  Mail,
  CreditCard,
  QrCode,
  Wifi,
  MapPin,
  MessageCircle,
  Briefcase,
  Compass,
  List,
  ShoppingBag,
  Store,
  Search,
  TrendingUp,
  Bot,
  MessageSquare,
  Plug,
  Shield,
  ShieldCheck,
  Gauge,
  BarChart2,
  Sparkles,
  Instagram,
  Calendar,
  Layers,
  FileText,
  Send,
  Tag,
  BarChart,
  Users,
  FileQuestion,
  Camera,
  Video,
  Shirt,
};

interface ServiceCardProps {
  service: Service;
  useAI: boolean;
  lang: Lang;
}

export default function ServiceCard({
  service,
  useAI,
  lang,
}: ServiceCardProps) {
  const global = getTranslations("global", lang);
  const Icon = iconMap[service.icon];
  const name = lang === "es" ? service.nameEs : service.nameEn;
  const desc = lang === "es" ? service.descEs : service.descEn;
  const price = getServicePrice(service, useAI);
  const link = getStripeLink(service, useAI);
  const isQuote = price === "quote";
  const isContent = isContentPricing(service.price);

  return (
    <div className="relative flex flex-col rounded-2xl border border-gold/15 bg-void-lighter shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden">
      {/* Featured badge */}
      {service.featured && (
        <div className="absolute top-3 right-3 bg-gold text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
          {global.featured}
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        {/* Icon and name */}
        <div className="flex items-start gap-3 mb-3">
          {Icon && (
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-turquoise/10 flex items-center justify-center">
              <Icon size={20} className="text-turquoise" />
            </div>
          )}
          <h3 className="font-body text-lg font-bold text-white leading-snug">
            {name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{desc}</p>

        {/* Price display */}
        <div className="mb-4">
          {isContent && typeof service.price === "object" && "human" in service.price ? (
            <div className="flex items-baseline gap-3">
              <span
                className={`text-sm font-semibold transition-colors duration-200 ${
                  !useAI
                    ? "text-gold"
                    : "text-gray-500/50 line-through"
                }`}
              >
                ${service.price.human}
                <span className="text-xs font-normal ml-0.5">
                  {global.humanMade}
                </span>
              </span>
              <span
                className={`text-sm font-semibold transition-colors duration-200 ${
                  useAI
                    ? "text-gold"
                    : "text-gray-500/50 line-through"
                }`}
              >
                ${service.price.ai}
                <span className="text-xs font-normal ml-0.5">
                  {global.aiAssisted}
                </span>
              </span>
            </div>
          ) : isQuote ? (
            <span className="text-lg font-bold text-turquoise">{global.custom}</span>
          ) : (
            <span className="text-2xl font-bold text-white">
              ${price as number}
              {service.isRecurring && (
                <span className="text-sm font-normal text-gray-500">
                  {global.perMonth}
                </span>
              )}
            </span>
          )}

          {/* Price note */}
          {service.priceNote && (
            <p className="text-xs text-gray-400 mt-1">{service.priceNote}</p>
          )}
        </div>

        {/* Delivery days */}
        {service.deliveryDays && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
            <Clock size={14} className="text-gold" />
            <span>
              {global.delivery}: {service.deliveryDays} {global.days}
            </span>
          </div>
        )}

        {/* CTA button */}
        {isQuote ? (
          <a
            href="/contact/"
            className="btn-primary text-center font-bold text-sm inline-flex items-center justify-center"
          >
            {global.getAQuote}
          </a>
        ) : service.stripeLinkVariants ? (
          <div className="flex flex-col gap-2">
            {service.stripeLinkVariants.map((variant) => (
              <a
                key={variant.link}
                href={variant.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center font-bold text-sm inline-flex items-center justify-center"
              >
                {lang === "es" ? variant.labelEs : variant.labelEn}
              </a>
            ))}
          </div>
        ) : (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-center font-bold text-sm inline-flex items-center justify-center"
          >
            {global.buyNow}
          </a>
        )}
      </div>
    </div>
  );
}
