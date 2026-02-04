"use client";

import { forwardRef, HTMLAttributes } from "react";
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
  default: "bg-void-light",
  bordered: "bg-void-light border border-gold/20",
  elevated: "bg-void-light shadow-xl shadow-black/50",
  glass: "bg-void/50 backdrop-blur-lg border border-gold/10",
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
                boxShadow: "0 20px 40px rgba(200, 121, 65, 0.15)",
              }
            : undefined
        }
        className={clsx(
          "rounded-xl transition-all duration-300",
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
