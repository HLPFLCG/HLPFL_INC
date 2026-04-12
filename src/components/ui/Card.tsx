"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";

type CardVariant = "default" | "bordered" | "elevated" | "glass";

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  variant?: CardVariant;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variants = {
  default: "bg-cream",
  bordered: "bg-cream border border-sea/15",
  elevated: "bg-cream shadow-card",
  glass: "bg-mist/50 backdrop-blur-lg border border-sea/15",
};

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      hover = false,
      padding = "md",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        whileHover={
          hover
            ? {
                y: -4,
                boxShadow: "0 20px 40px rgba(11, 122, 122, 0.12)",
              }
            : undefined
        }
        className={clsx(
          "rounded-2xl transition-all duration-300",
          variants[variant],
          paddings[padding],
          hover && "cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export default Card;
