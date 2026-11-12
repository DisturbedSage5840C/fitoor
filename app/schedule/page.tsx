import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { FingerGun } from "@/components/art/FingerGun";
import { PageHeader } from "@/components/shared/PageHeader";
import { Burst } from "@/components/shared/Stickers";
import { Tape } from "@/components/shared/Tape";
import { events } from "@/data/events";
import { fest, festDays } from "@/data/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Schedule",
  alternates: { canonical: "/schedule" },
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

/** Rasterised from the organisers' Day 1 and Day 2 schedule PDFs. */
const CHART_W = 2400;
const CHART_H = 1356;
const CHARTS = [
  {
    day: 1,
    src: "/schedule/day-1-chart.webp",
    alt: "Fitoor Day 1 schedule chart: every event by venue from 10 AM, ending with Nanku live on the Ground from 8:30 PM.",
    tilt: -0.5,
    tape: "rose",
    tapeTilt: -3,
    shadow: "shadow-[9px_10px_0_var(--rose)]",
  },
  {
    day: 2,
    src: "/schedule/day-2-chart.webp",
    alt: "Fitoor Day 2 schedule chart: every event by venue from 10 AM, then RCR live on the Ground from 6 to 8 PM and the DJ from 8 to 10 PM.",
    tilt: 0.5,
    tape: "gold",
    tapeTilt: 2.5,
    shadow: "shadow-[9px_10px_0_var(--gold)]",
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
        artElement={<FingerGun />}
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
                      const isArtist = slot.kind === "artist";
                      const href = category
                        ? `/events/${category}#${slot.id}`
                        : isArtist
                          ? "/#lineup"
                          : null;
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
                            <span
                              className={cn(
                                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-maroon-deepest",
                                isArtist
                                  ? "size-4 bg-gold shadow-[0_0_12px_var(--rose)]"
                                  : "size-3 bg-rose",
                              )}
                            />
                          </span>
                          <span className="flex items-center justify-between gap-2 text-cream">
                            <span>
                              <span
                                className={cn(
                                  "font-title block text-xl leading-tight lowercase sm:text-2xl",
                                  isArtist && "neon",
                                )}
                              >
                                {slot.title}
                              </span>
                              <span className="block text-xs font-medium text-cream/60">
                                {isArtist ? `live · ${slot.venue}` : slot.venue}
                              </span>
                            </span>
                            {href ? (
                              <ArrowUpRight className="size-4 shrink-0 text-gold/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            ) : null}
                          </span>
                        </>
                      );
                      const grid =
                        "grid min-h-11 grid-cols-[4.75rem_1.25rem_1fr] items-center gap-x-3 py-2 sm:grid-cols-[6rem_1.5rem_1fr]";
                      return (
                        <li key={`${slot.id ?? slot.title}-${slot.time}`}>
                          {href ? (
                            <Link
                              href={href}
                              className={cn(
                                grid,
                                "group hover:bg-cream/5",
                                isArtist && "rounded-[4px] bg-rose/10",
                              )}
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

        <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:pb-32">
          <h2 className="font-title neon text-center text-5xl lowercase sm:text-6xl">
            the full charts
          </h2>
          <p className="font-body mt-3 text-center text-cream/75">
            The official day-wise charts. Tap one to open it full size.
          </p>
          <div className="mt-14 flex flex-col gap-20">
            {CHARTS.map((chart) => (
              <figure key={chart.day} className="relative" style={{ rotate: `${chart.tilt}deg` }}>
                <Tape
                  tilt={chart.tapeTilt}
                  tone={chart.tape}
                  className="absolute -top-4 left-6 z-10 px-5 py-1"
                >
                  <span className="font-body text-sm font-bold">Day {chart.day}</span>
                </Tape>
                <a
                  href={chart.src}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "block overflow-hidden rounded-[6px] border-2 border-gold/70 bg-black transition-transform hover:-translate-y-0.5",
                    chart.shadow,
                  )}
                >
                  <Image
                    src={chart.src}
                    alt={chart.alt}
                    width={CHART_W}
                    height={CHART_H}
                    quality={90}
                    sizes="(min-width: 1152px) 1104px, calc(100vw - 2rem)"
                    className="h-auto w-full"
                  />
                  <span className="sr-only"> (opens the full-size chart in a new tab)</span>
                </a>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
