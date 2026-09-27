import Link from "next/link";
import type { Metadata } from "next";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { PageHeader } from "@/components/shared/PageHeader";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { socials } from "@/data/contacts";
import { fest, festDays } from "@/data/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Schedule",
  description: `Fitoor 2026 runs over two days, ${fest.datesLong}. See the full event-by-event timetable.`,
};

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        title="schedule"
        script="two days, one timetable"
        intro={
          <>
            Timings are as printed in the brochure and can shift slightly as
            clubs lock in venues. Overlapping events run in parallel, so plan
            your day around what you&apos;ve registered for.
          </>
        }
        art={{
          src: "/art/finger-gun.webp",
          alt: "A ringed hand making a finger-gun",
          width: 993,
          height: 722,
        }}
      />

      <section className="mx-auto grid grid-cols-1 max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 lg:py-24">
        {festDays.map((day, i) => (
          <RevealOnScroll key={day.day} delay={i * 0.08}>
            <article className="relative h-full overflow-hidden rounded-2xl border border-gold/25 bg-maroon p-8">
              <span
                aria-hidden
                className="font-display pointer-events-none absolute -top-6 -right-2 text-[11rem] leading-none text-gold/[0.07]"
              >
                0{day.day}
              </span>
              <p className="font-body text-xs font-semibold tracking-[0.25em] text-rose uppercase">
                Day {day.day}
              </p>
              <h2 className="font-title mt-2 text-5xl text-cream lowercase">
                {day.weekday}
              </h2>
              <p className="font-display mt-1 text-3xl text-gold">{day.date}</p>

              <dl className="mt-8 grid grid-cols-1 border-t border-dashed border-gold/25 pt-6">
                <div>
                  <dt className="font-body text-[10px] font-semibold tracking-[0.2em] text-cream/50 uppercase">
                    Wraps at
                  </dt>
                  <dd className="font-body mt-0.5 font-semibold text-cream">
                    {day.wrapsAt}
                  </dd>
                </div>
              </dl>
              <ol className="font-body mt-6 space-y-2 border-t border-dashed border-gold/25 pt-6 text-sm">
                {day.schedule.map((slot) => (
                  <li
                    key={slot.title}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <span className="text-cream/85">{slot.title}</span>
                    <span
                      className={cn(
                        "shrink-0 font-semibold tabular-nums",
                        slot.time === "TBA" ? "text-cream/45" : "text-gold",
                      )}
                    >
                      {slot.time}
                    </span>
                  </li>
                ))}
              </ol>
              <ul className="font-body mt-6 space-y-2 text-sm text-cream/70">
                {day.notes.map((note) => (
                  <li key={note} className="flex gap-2">
                    <span className="text-gold" aria-hidden>
                      ✦
                    </span>
                    {note}
                  </li>
                ))}
              </ul>
            </article>
          </RevealOnScroll>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-rose p-8 sm:flex-row sm:items-center">
          <p className="font-title text-3xl text-white lowercase">
            want the timetable the minute it drops?
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="font-body inline-flex items-center gap-2 rounded-full bg-maroon-deepest px-5 py-2.5 text-sm font-bold text-cream hover:bg-maroon"
            >
              <InstagramIcon className="size-4" />@{socials.instagramHandle}
            </a>
            <Link
              href="/events"
              className="font-body inline-flex items-center rounded-full border border-white/60 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/10"
            >
              Browse events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
