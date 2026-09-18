"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { fest } from "@/data/content";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, new Date(fest.startDateISO).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

function DigitBlock({ value, label }: { value: number; label: string }) {
  const padded = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative overflow-hidden rounded-xl border border-gold/30 bg-maroon px-3 py-2.5 sm:px-4 sm:py-3">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={padded}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="font-pixel block text-xl text-gold sm:text-3xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            {padded}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-body text-[10px] uppercase tracking-[0.2em] text-cream/60 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex items-center gap-2.5 sm:gap-4"
      aria-live="polite"
      aria-label={
        mounted
          ? `${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds until Fitoor`
          : "Loading countdown"
      }
    >
      <DigitBlock value={mounted ? timeLeft.days : 0} label="Days" />
      <DigitBlock value={mounted ? timeLeft.hours : 0} label="Hrs" />
      <DigitBlock value={mounted ? timeLeft.minutes : 0} label="Min" />
      <DigitBlock value={mounted ? timeLeft.seconds : 0} label="Sec" />
    </div>
  );
}
