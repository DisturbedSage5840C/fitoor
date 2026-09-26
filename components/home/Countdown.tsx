"use client";

import { useEffect, useState } from "react";
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

const UNITS = [
  { key: "days", label: "days" },
  { key: "hours", label: "hrs" },
  { key: "minutes", label: "min" },
  { key: "seconds", label: "sec" },
] as const;

/** Flight-board style countdown to gates opening on Day 1. */
export function Countdown() {
  // null until mounted so server HTML and first client render agree.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="inline-flex items-stretch divide-x divide-gold/20 rounded-xl border border-gold/25 bg-maroon-deepest/70 backdrop-blur-sm"
      role="timer"
      aria-label={
        timeLeft
          ? `${timeLeft.days} days, ${timeLeft.hours} hours and ${timeLeft.minutes} minutes until Fitoor`
          : "Countdown to Fitoor"
      }
    >
      {UNITS.map(({ key, label }) => (
        <div
          key={key}
          className="flex min-w-16 flex-col items-center px-3 py-2 sm:min-w-20 sm:px-4"
        >
          <span className="font-display text-3xl leading-none text-gold tabular-nums sm:text-4xl">
            {timeLeft ? String(timeLeft[key]).padStart(2, "0") : "--"}
          </span>
          <span className="font-body mt-1 text-[10px] font-semibold tracking-[0.2em] text-cream/55 uppercase">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
