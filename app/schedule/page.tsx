import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Burst } from "@/components/shared/Stickers";
import { Tape } from "@/components/shared/Tape";
import { events } from "@/data/events";
import { fest, festDays } from "@/data/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Schedule",
  description: `Fitoor 2026 runs over two days, ${fest.datesLong}. See the full event-by-event timetable.`,
};

const categoryOf = new Map(events.map((e) => [e.id, e.category]));

/** Day 1 and Day 2 are different posters: different ground, tilt, shadow and offset. */
const POSTERS = [
  {
    ground: "bg-maroon halftone",
    shadow: "shadow-[9px_10px_0_var(--rose)]",
    tilt: -0.8,
    offset: "",
    tape: "rose",
    tapeTilt: -3,
  },
  {
    ground: "bg-dupatta polka-purple",
    shadow: "shadow-[9px_10px_0_var(--gold)]",
    tilt: 0.8,
    offset: "md:mt-20",
    tape: "gold",
    tapeTilt: 2.5,
  },
] as const;

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        title="schedule"
        ground="polka"
        artTilt={6}
        sticker={
          <span className="relative block size-full text-rose">
            <Burst />
            <span className="font-display absolute inset-0 flex flex-col items-center justify-center leading-[0.85] text-maroon-deepest">
              <span className="text-2xl sm:text-3xl">2</span>
              <span className="text-xs sm:text-sm">days</span>
            </span>
          </span>
        }
        stickerTilt={-14}
        art={{
          src: "/art/finger-gun.webp",
          alt: "A ringed hand making a finger-gun",
          width: 993,
          height: 722,
        }}
      />

      <section className="bg-maroon-deepest">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-4 pt-24 pb-20 sm:px-6 md:grid-cols-2 md:gap-10 lg:pb-28">
          {festDays.map((day, i) => {
            const poster = POSTERS[i];
            return (
              <div key={day.day} className={poster.offset}>
                <article
                  className={cn(
                    "relative isolate overflow-hidden rounded-[6px] px-5 pt-8 pb-6 sm:px-8",
                    poster.ground,
                    poster.shadow,
                  )}
                  style={{ rotate: `${poster.tilt}deg` }}
                >
                  <span
                    aria-hidden
                    className="font-display pointer-events-none absolute -top-4 right-3 -z-10 text-[9rem] leading-none text-transparent sm:text-[12rem]"
                    style={{ WebkitTextStroke: "2px var(--gold)", opacity: 0.35 }}
                  >
                    0{day.day}
                  </span>

                  <Tape tilt={poster.tapeTilt} tone={poster.tape} className="px-5 py-1">
                    <span className="font-body text-sm font-bold">Day {day.day}</span>
                  </Tape>
                  <h2 className="font-title neon mt-4 text-5xl lowercase sm:text-6xl">
                    {day.weekday}
                  </h2>
                  <p className="font-display mt-1 text-3xl text-gold">{day.date}</p>

                  <ol className="font-body mt-8">
                    {day.schedule.map((slot, r) => {
                      const category = categoryOf.get(slot.id ?? "");
                      const last = r === day.schedule.length - 1;
                      const [start, end] = slot.time.split(" to ");
                      const row = (
                        <>
                          <span className="text-sm leading-tight font-semibold text-gold tabular-nums">
                            {start}
                            {end ? (
                              <span className="block text-xs font-medium text-gold/70">to {end}</span>
                            ) : null}
                          </span>
                          <span aria-hidden className="relative self-stretch">
                            <span
                              className={cn(
                                "absolute left-1/2 -translate-x-1/2 border-l-2 border-dashed border-gold/60",
                                r === 0 ? "top-1/2 bottom-0" : last ? "top-0 bottom-1/2" : "inset-y-0",
                              )}
                            />
                            <span className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose ring-2 ring-maroon-deepest" />
                          </span>
                          <span className="flex items-center justify-between gap-2 text-cream">
                            <span className="font-title text-xl leading-tight lowercase sm:text-2xl">
                              {slot.title}
                            </span>
                            {category ? (
                              <ArrowUpRight className="size-4 shrink-0 text-gold/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            ) : null}
                          </span>
                        </>
                      );
                      const grid =
                        "grid min-h-11 grid-cols-[4.75rem_1.25rem_1fr] items-center gap-x-3 py-2 sm:grid-cols-[6rem_1.5rem_1fr]";
                      return (
                        <li key={`${slot.id}-${slot.time}`}>
                          {category ? (
                            <Link
                              href={`/events/${category}#${slot.id}`}
                              className={cn(grid, "group hover:bg-cream/5")}
                            >
                              {row}
                            </Link>
                          ) : (
                            <div className={grid}>{row}</div>
                          )}
                        </li>
                      );
                    })}
                  </ol>

                  <div className="mt-6 flex items-center gap-3">
                    <Tape tilt={-1.5} tone="bandage" className="px-4 py-1">
                      <span className="font-body text-sm font-bold">
                        Concludes at {day.concludes}
                      </span>
                    </Tape>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
