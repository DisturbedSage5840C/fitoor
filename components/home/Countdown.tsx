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
  { key: "hours", label: "hours" },
  { key: "minutes", label: "minutes" },
] as const;

/** Days, hours and minutes until gates open on Day 1. */
export function Countdown() {
  // null until mounted so server HTML and first client render agree.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft());
    tick();
    const interval = setInterval(tick, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      role="timer"
      aria-label={
        timeLeft
          ? `${timeLeft.days} days, ${timeLeft.hours} hours and ${timeLeft.minutes} minutes until Fitoor`
          : "Countdown to Fitoor"
      }
      className="flex items-baseline gap-6"
    >
      {UNITS.map(({ key, label }) => (
        <p key={key} className="flex items-baseline gap-2">
          <span className="font-display text-4xl text-gold tabular-nums sm:text-5xl">
            {timeLeft ? String(timeLeft[key]).padStart(2, "0") : "00"}
          </span>
          <span className="font-body text-sm text-cream/75">{label}</span>
        </p>
      ))}
    </div>
  );
}
