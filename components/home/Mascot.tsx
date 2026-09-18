"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

export function Mascot({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 120, damping: 16 });
  const springY = useSpring(my, { stiffness: 120, damping: 16 });

  const rotateX = useTransform(springY, [-1, 1], [9, -9]);
  const rotateY = useTransform(springX, [-1, 1], [-9, 9]);
  const shineX = useTransform(springX, [-1, 1], [15, 85]);
  const shineY = useTransform(springY, [-1, 1], [15, 85]);
  const shineBackground = useTransform(
    [shineX, shineY],
    ([sx, sy]) => `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.5), transparent 45%)`,
  );

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || event.pointerType === "touch") return;
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;
    mx.set(px * 2 - 1);
    my.set(py * 2 - 1);
  }

  function handlePointerLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={{ perspective: 900 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        className="relative"
      >
        <div className="glow-category relative overflow-hidden rounded-[2.5rem] bg-bg-deep">
          <Image
            src="/mascot/mascot-color.png"
            alt="Fitoor mascot — a retro line-art illustration of a woman's face with big curly hair and oversized round sunglasses"
            width={243}
            height={237}
            priority
            className="h-auto w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
          />
          {!prefersReducedMotion ? (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{ background: shineBackground }}
            />
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}
