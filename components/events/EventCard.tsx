import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Tape } from "@/components/shared/Tape";
import { clubs } from "@/data/clubs";
import type { EventItem } from "@/data/types";
import { cn } from "@/lib/utils";

const FACT_TILTS = [-2, 1.5, -1, 2.5];

/**
 * One event, laid out like the brochure page: neon title + script subtitle,
 * the pitch, and a ticket-stub of logistics.
 */
export function EventCard({
  event,
  className,
}: {
  event: EventItem;
  className?: string;
}) {
  const club = event.club ? clubs[event.club] : undefined;
  const meta = [
    { label: "Format", value: event.format },
    { label: "Registration fee", value: event.fee },
    { label: "Prize pool", value: event.prizePool },
    { label: "Date & time", value: event.dateTime },
  ];

  return (
    <article
      id={event.id}
      className={cn(
        "relative isolate scroll-mt-24 overflow-hidden rounded-[6px] bg-maroon-deepest shadow-[6px_7px_0_var(--category)] md:grid md:grid-cols-[1fr_15rem]",
        className,
      )}
    >
      <div className="halftone-light pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden />
      <div className="p-6 sm:p-8">
        <h2 className="font-title neon-soft text-4xl lowercase sm:text-5xl">
          {event.title}
        </h2>
        <p className="font-script mt-1 text-xl text-category-light sm:text-2xl">
          {event.subtitle}
        </p>

        <p className="font-body mt-5 text-[15px] leading-relaxed text-cream/80 text-pretty">
          {event.description}
        </p>

        {event.facts?.length ? (
          <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-3">
            {event.facts.map((fact, i) => (
              <li key={fact}>
                <Tape
                  tilt={FACT_TILTS[i % FACT_TILTS.length]}
                  tone="gold"
                  className="font-body px-3 py-1 text-xs font-bold"
                >
                  {fact}
                </Tape>
              </li>
            ))}
          </ul>
        ) : null}

        {event.rules.length > 0 ? (
          <details className="group mt-6 rounded-[4px] border border-dashed border-category-light/40 open:bg-maroon/50">
            <summary className="font-body flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-cream hover:text-gold [&::-webkit-details-marker]:hidden">
              Rules and judging ({event.rules.length})
              <ChevronDown
                className="size-4 transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <ol className="font-body list-decimal space-y-2 px-4 pt-1 pb-4 pl-9 text-sm leading-relaxed text-cream/90 marker:text-category-light">
              {event.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ol>
          </details>
        ) : null}
      </div>

      {/* Ticket stub */}
      <aside className="relative flex flex-col justify-between gap-6 border-t border-dashed border-category/40 bg-category-bg/70 p-6 md:border-t-0 md:border-l">
        <span aria-hidden className="absolute -top-3 -left-3 size-6 rounded-full bg-background" />
        <span
          aria-hidden
          className="absolute -top-3 -right-3 size-6 rounded-full bg-background md:top-auto md:right-auto md:-bottom-3 md:-left-3"
        />
        <dl className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-1">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="font-body text-[10px] font-semibold tracking-[0.2em] text-cream/75 uppercase">
                {item.label}
              </dt>
              <dd
                className={cn(
                  "font-body mt-0.5 text-sm font-semibold",
                  item.value.includes("TBA") ? "text-cream/45" : "text-cream",
                )}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        {club ? (
          <div className="flex items-center gap-3 border-t border-cream/10 pt-4">
            <Image quality={90}
              src={club.logo}
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-full bg-cream object-contain p-0.5"
            />
            <p className="font-body text-xs leading-snug text-cream/80">
              By <span className="font-semibold text-cream">{club.name}</span>,{" "}
              {club.description}
            </p>
          </div>
        ) : null}
      </aside>
    </article>
  );
}
