import { Tape } from "@/components/shared/Tape";
import { stats } from "@/data/content";
import { cn } from "@/lib/utils";

/** Each figure is stuck on by hand: its own size, tilt, tape colour and drop. */
const PLACEMENT = [
  { tilt: -4, tone: "bandage", size: "text-3xl sm:text-6xl", drop: "mt-0" },
  { tilt: 3, tone: "rose", size: "text-3xl sm:text-5xl", drop: "mt-4 sm:mt-10" },
  { tilt: -2, tone: "gold", size: "text-4xl sm:text-7xl", drop: "mt-1 sm:mt-2" },
  { tilt: 5, tone: "bandage", size: "text-3xl sm:text-5xl", drop: "mt-5 sm:mt-4" },
] as const;

export function StatTapes({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-start gap-x-2 gap-y-6 sm:gap-x-3", className)}>
      {stats.map((stat, i) => {
        const p = PLACEMENT[i % PLACEMENT.length];
        return (
          <li key={stat.label} className={p.drop}>
            <Tape tilt={p.tilt} tone={p.tone} className="px-3 py-2 text-center sm:px-4">
              <span className={`font-display block leading-none ${p.size}`}>{stat.value}</span>
              <span className="font-script -mt-1 block text-xl leading-none sm:text-2xl">
                {stat.label}
              </span>
            </Tape>
          </li>
        );
      })}
    </ul>
  );
}
