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
    <span className={`font-display font-bold ${sizeMap[size]} ${className}`}>
      Caribe Sur <span className="text-turquoise">CR</span>
    </span>
  );
}
