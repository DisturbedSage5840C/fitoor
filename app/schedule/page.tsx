import type { Metadata } from "next";
import { Clock, MapPin, Sparkles, Utensils, Mic2, CalendarDays } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { categoryIcons } from "@/data/categories";
import { getScheduleByDay } from "@/data/schedule";
import type { ScheduleEntry, ScheduleEntryKind } from "@/data/types";

export const metadata: Metadata = {
  title: "Schedule",
  description: "The Fitoor 2026 day-by-day running order — Nov 14–15, 2026.",
};

const kindIcons: Record<ScheduleEntryKind, typeof Clock> = {
  ceremony: Sparkles,
  event: CalendarDays,
  performance: Mic2,
  break: Utensils,
};

function ScheduleRow({ entry, index }: { entry: ScheduleEntry; index: number }) {
  const Icon = entry.category ? categoryIcons[entry.category] : kindIcons[entry.kind];

  return (
    <div data-category={entry.category}>
      <RevealOnScroll delay={index * 0.03}>
        <div className="flex items-center gap-4 border-b border-cream/10 py-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-category/50 text-category-light">
            <Icon className="size-4" aria-hidden />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="font-display text-lg text-cream">{entry.title}</span>
            <span className="font-body flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-cream/60">
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" aria-hidden />
                {entry.time}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3" aria-hidden />
                {entry.venue}
              </span>
            </span>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}

export default function SchedulePage() {
  const day1 = getScheduleByDay(1);
  const day2 = getScheduleByDay(2);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading eyebrow="02 — Schedule" title="The running order" />

      <Tabs defaultValue="day1" className="gap-6">
        <TabsList className="h-auto w-full gap-1 bg-surface p-1 sm:w-fit">
          <TabsTrigger value="day1" className="flex-1 py-2 sm:flex-none sm:px-6">
            Day 1 · Nov 14
          </TabsTrigger>
          <TabsTrigger value="day2" className="flex-1 py-2 sm:flex-none sm:px-6">
            Day 2 · Nov 15
          </TabsTrigger>
        </TabsList>

        <TabsContent value="day1" className="flex flex-col">
          {day1.map((entry, i) => (
            <ScheduleRow key={entry.id} entry={entry} index={i} />
          ))}
        </TabsContent>

        <TabsContent value="day2" className="flex flex-col">
          {day2.map((entry, i) => (
            <ScheduleRow key={entry.id} entry={entry} index={i} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
