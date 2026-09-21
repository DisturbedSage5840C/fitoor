"use client";

import type { ReactNode } from "react";
import { motion, type TargetAndTransition } from "motion/react";

type Variant = "fade" | "torn" | "flip" | "collage-in";

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Defaults to "fade" — the original animation, unchanged for every existing call site. */
  variant?: Variant;
}

const VARIANTS: Record<Variant, { initial: TargetAndTransition; whileInView: TargetAndTransition }> = {
  fade: {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
  },
  // Wipes up like a page being uncovered, echoing TornEdge's jagged reveal.
  torn: {
    initial: { opacity: 0, y: 32, clipPath: "inset(0% 0% 100% 0%)" },
    whileInView: { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
  },
  flip: {
    initial: { opacity: 0, rotateX: -14, y: 16 },
    whileInView: { opacity: 1, rotateX: 0, y: 0 },
  },
  "collage-in": {
    initial: { opacity: 0, scale: 0.92, rotate: -3 },
    whileInView: { opacity: 1, scale: 1, rotate: 0 },
  },
};

export function RevealOnScroll({
  children,
  delay = 0,
  className,
  variant = "fade",
}: RevealOnScrollProps) {
  const { initial, whileInView } = VARIANTS[variant];
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
