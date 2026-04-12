"use client";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

export default function Logo({ size = "md", className = "" }: LogoProps) {
  return (
    <span className={`font-display font-bold tracking-widest ${sizeMap[size]} ${className}`}>
      HLPFL<span className="inline-block w-1.5 h-1.5 rounded-full bg-gold ml-0.5 mb-0.5" />
    </span>
  );
}
