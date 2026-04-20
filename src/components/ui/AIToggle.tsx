"use client";

import { Info } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AIToggleProps {
  useAI: boolean;
  setUseAI: (v: boolean) => void;
}

export default function AIToggle({ useAI, setUseAI }: AIToggleProps) {
  const { t } = useLanguage();
  const global = t("global");
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
        {global.aiToggleLabel}
      </span>

      <div className="flex items-center gap-3">
        {/* Human-Made label */}
        <span
          className={`text-sm font-bold transition-colors duration-200 ${
            !useAI ? "text-gold" : "text-gray-500"
          }`}
        >
          {global.humanMade}
        </span>

        {/* Toggle switch */}
        <button
          type="button"
          role="switch"
          aria-checked={useAI}
          aria-label={global.aiToggleLabel}
          onClick={() => setUseAI(!useAI)}
          className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-void ${
            useAI ? "bg-gold" : "bg-gold"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-[22px] w-[22px] rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ${
              useAI ? "translate-x-[22px]" : "translate-x-0"
            }`}
          />
        </button>

        {/* AI-Assisted label */}
        <span
          className={`text-sm font-bold transition-colors duration-200 ${
            useAI ? "text-gold" : "text-gray-500"
          }`}
        >
          {global.aiAssisted}
        </span>

        {/* Info icon with tooltip */}
        <div className="relative">
          <button
            type="button"
            aria-label={`${global.humanMade} vs ${global.aiAssisted} — info`}
            onClick={() => setShowTooltip(!showTooltip)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="text-gray-500 hover:text-turquoise transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full"
          >
            <Info size={16} />
          </button>

          {showTooltip && (
            <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 rounded-lg bg-void text-cream text-xs leading-relaxed p-3 shadow-lg">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-void" />
              {global.aiToggleNote}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
