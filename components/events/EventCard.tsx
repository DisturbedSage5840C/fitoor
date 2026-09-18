import { Clock, MapPin, Trophy, Users } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import type { EventItem } from "@/data/types";
import { cn } from "@/lib/utils";

function MetaRow({
  icon: Icon,
  label,
}: {
  icon: typeof Clock;
  label: string;
}) {
  return (
    <span className="font-body inline-flex items-center gap-1.5 text-xs text-cream/70 sm:text-sm">
      <Icon className="size-3.5 shrink-0 text-category-light" aria-hidden />
      {label}
    </span>
  );
}

export function EventCard({ event, className }: { event: EventItem; className?: string }) {
  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-category/40 bg-maroon/60 p-5 transition-all hover:border-category hover:bg-maroon sm:p-6",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-xl text-cream sm:text-2xl">{event.title}</h2>
          <p className="font-body text-sm text-category-light">{event.tagline}</p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          <Badge variant="outline" className="border-category text-category-light">
            {event.format}
            {event.teamSize ? ` · ${event.teamSize}` : ""}
          </Badge>
          {event.isPlaceholder ? (
            <span className="font-pixel rounded-full bg-maroon-deepest/80 px-2 py-1 text-[9px] tracking-wider text-gold/70 uppercase">
              Details TBD
            </span>
          ) : null}
        </div>
      </div>

      <p className="font-body text-sm text-cream/75 text-pretty">{event.description}</p>

      <div className="flex flex-wrap gap-x-4 gap-y-2">
        <MetaRow icon={Clock} label={`Day ${event.day} · ${event.time}`} />
        <MetaRow icon={MapPin} label={event.venue} />
        <MetaRow icon={Trophy} label={event.prize} />
        <MetaRow icon={Users} label={event.coordinators.map((c) => c.name).join(", ")} />
      </div>

      {event.rules.length > 0 ? (
        <Accordion>
          <AccordionItem value="rules" className="border-category/30">
            <AccordionTrigger className="font-body text-sm text-cream hover:text-gold">
              Rules & format
            </AccordionTrigger>
            <AccordionContent>
              <ul className="font-body flex flex-col gap-1.5 text-sm text-cream/70">
                {event.rules.map((rule) => (
                  <li key={rule} className="flex gap-2">
                    <span className="text-category-light" aria-hidden>
                      &bull;
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : null}
    </article>
  );
}
