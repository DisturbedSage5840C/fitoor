"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

type Reveal = "rise" | "stamp" | "slide";

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** rise: the old fade-up. stamp: lands with a small slam. slide: comes in from the side. */
  variant?: Reveal;
}

const FROM = {
  rise: { opacity: 0, y: 24 },
  stamp: { opacity: 0, scale: 1.25, rotate: -4 },
  slide: { opacity: 0, x: -48 },
} as const;

const TO = {
  rise: { opacity: 1, y: 0 },
  stamp: { opacity: 1, scale: 1, rotate: 0 },
  slide: { opacity: 1, x: 0 },
} as const;

export function RevealOnScroll({
  children,
  delay = 0,
  className,
  variant = "rise",
}: RevealOnScrollProps) {
  return (
    <motion.div
      className={className}
      initial={FROM[variant]}
      whileInView={TO[variant]}
      viewport={{ once: true, margin: "-80px" }}
      transition={
        variant === "stamp"
          ? { type: "spring", stiffness: 420, damping: 22, delay }
          : { duration: 0.5, delay, ease: "easeOut" }
      }
    >
      {children}
    </motion.div>
  );
}
