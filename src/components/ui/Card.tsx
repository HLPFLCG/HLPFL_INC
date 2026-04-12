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
  default: "bg-white",
  bordered: "bg-white border border-gray-100",
  elevated: "bg-white shadow-lg shadow-black/10",
  glass: "bg-white/80 backdrop-blur-lg border border-turquoise/10",
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
                boxShadow: "0 20px 40px rgba(14, 154, 167, 0.12)",
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
