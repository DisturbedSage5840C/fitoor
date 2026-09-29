import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { fest, festDays } from "@/data/content";

export const metadata: Metadata = {
  title: "Schedule",
  description: `Fitoor 2026 runs on ${fest.dates}. See the timetable for both days.`,
};

export default function SchedulePage() {
  return (
    <>
      <PageHeader title="schedule" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-4 pb-24 sm:px-6 md:grid-cols-2">
        {festDays.map((day) => (
          <section key={day.day} aria-labelledby={`day-${day.day}`}>
            <h2
              id={`day-${day.day}`}
              className="font-display text-4xl text-gold sm:text-5xl"
            >
              Day {day.day}
            </h2>
            <p className="font-body mt-2 text-cream">
              {day.weekday}, {day.date}. Concludes at {day.concludes}.
            </p>
            <ul className="mt-6 divide-y divide-cream/15 border-y border-cream/15">
              {day.schedule.map((slot) => (
                <li
                  key={`${slot.title}-${slot.time}`}
                  className="font-body flex items-baseline justify-between gap-4 py-3"
                >
                  <span className="text-cream">
                    {slot.id ? (
                      <Link
                        href={`/events#${slot.id}`}
                        className="hover:text-gold hover:underline"
                      >
                        {slot.title}
                      </Link>
                    ) : (
                      slot.title
                    )}
                  </span>
                  <span className="shrink-0 text-right text-cream/75 tabular-nums">
                    {slot.time}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
