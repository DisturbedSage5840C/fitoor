import Image from "next/image";
import { clubs } from "@/data/clubs";
import type { EventItem } from "@/data/types";
import { cn } from "@/lib/utils";

/** One event, set out like the brochure page: title, subtitle, pitch, logistics. */
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
    { label: "Date and time", value: event.dateTime },
  ];

  return (
    <article
      id={event.id}
      className={cn(
        "scroll-mt-24 border-t border-cream/20 py-12 md:grid md:grid-cols-[1fr_16rem] md:gap-12",
        className,
      )}
    >
      <div>
        <h2 className="font-display text-4xl text-category-light sm:text-5xl">
          {event.title}
        </h2>
        <p className="font-script mt-2 text-2xl text-cream">{event.subtitle}</p>

        <p className="font-body prose-copy mt-6 text-cream/90">
          {event.description}
        </p>

        {event.facts?.length ? (
          <p className="font-body mt-4 text-cream/90">
            {event.facts.join(", ")}
          </p>
        ) : null}

        {event.rules.length > 0 ? (
          <details className="group mt-6">
            <summary className="font-body flex min-h-12 cursor-pointer list-none items-center font-semibold text-category-light underline underline-offset-4 [&::-webkit-details-marker]:hidden">
              Rules and judging
            </summary>
            <ol className="font-body prose-copy list-decimal space-y-3 pt-2 pl-5 text-cream/85 marker:text-category-light">
              {event.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ol>
          </details>
        ) : null}
      </div>

      <aside className="mt-8 md:mt-0">
        <dl className="space-y-4">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="font-body text-sm text-cream/85">{item.label}</dt>
              <dd className="font-body font-semibold text-cream">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        {club ? (
          <div className="mt-6 flex items-center gap-3">
            <Image
              src={club.logo}
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-full bg-cream object-contain p-0.5"
            />
            <p className="font-body text-sm text-cream/90">
              {club.name}, {club.description}
            </p>
          </div>
        ) : null}
      </aside>
    </article>
  );
}
