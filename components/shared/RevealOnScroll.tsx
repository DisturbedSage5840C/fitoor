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
  rise: { opacity: 0, y: 32, rotate: -1.5 },
  stamp: { opacity: 0, scale: 1.25, rotate: -4 },
  slide: { opacity: 0, x: -48 },
} as const;

const TO = {
  rise: { opacity: 1, y: 0, rotate: 0 },
  stamp: { opacity: 1, scale: 1, rotate: 0 },
  slide: { opacity: 1, x: 0 },
} as const;

/** Springs, not eased tweens, so each block lands like a sticker slapped on
 *  the page: a quick arrival with a whisker of settle. Opacity rides along on
 *  a short tween so nothing ever overshoots past fully visible. */
const SPRINGS = {
  rise: { type: "spring", stiffness: 210, damping: 22, mass: 0.7 },
  stamp: { type: "spring", stiffness: 420, damping: 22 },
  slide: { type: "spring", stiffness: 190, damping: 24, mass: 0.7 },
} as const;
const FADE = { duration: 0.3, ease: "easeOut" } as const;

/** Share of a block on screen before it reveals. A ratio rather than a pixel
 *  margin, so tall blocks don't wait half a screen before they appear. */
const IN_VIEW = 0.2;

export function RevealOnScroll({
  children,
  delay = 0,
  className,
  variant = "rise",
}: RevealOnScrollProps) {
  return (
    <motion.div
      className={className}
      style={{ willChange: "transform, opacity" }}
      initial={FROM[variant]}
      whileInView={TO[variant]}
      viewport={{ once: true, amount: IN_VIEW }}
      transition={{ ...SPRINGS[variant], delay, opacity: { ...FADE, delay } }}
    >
      {children}
    </motion.div>
  );
}
