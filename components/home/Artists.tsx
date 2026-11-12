import Image from "next/image";
import { NeonTitle } from "@/components/shared/NeonTitle";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionGround } from "@/components/shared/SectionGround";
import { Sticker } from "@/components/shared/Sticker";
import { Burst, Cassette } from "@/components/shared/Stickers";
import { Tape } from "@/components/shared/Tape";
import { artists } from "@/data/artists";
import { festDays } from "@/data/content";
import type { Artist } from "@/data/types";
import { cn } from "@/lib/utils";

/** Each headliner is a poster pinned up by hand: its own tilt, shadow and drop. */
const POSTER_STYLE = [
  { tilt: -1.6, shadow: "shadow-[8px_9px_0_var(--rose)]", drop: "", tape: "rose", tapeTilt: -4 },
  { tilt: 1.4, shadow: "shadow-[8px_9px_0_var(--gold)]", drop: "md:mt-16", tape: "gold", tapeTilt: 3 },
] as const;

function dayLabel(artist: Artist): string {
  const day = festDays.find((d) => d.day === artist.day);
  return day ? `Day ${artist.day} · ${day.weekday} ${day.date}` : `Day ${artist.day}`;
}

function HeadlinerCard({ artist, index }: { artist: Artist; index: number }) {
  const style = POSTER_STYLE[index % POSTER_STYLE.length];
  return (
    <div className={cn("relative", style.drop)} style={{ rotate: `${style.tilt}deg` }}>
      <article
        className={cn(
          "relative isolate aspect-[4/5] overflow-hidden rounded-[6px] bg-maroon-deepest",
          style.shadow,
        )}
      >
        {artist.image ? (
          <Image
            src={artist.image}
            alt={artist.imageAlt ?? artist.name}
            fill
            sizes="(min-width: 768px) 30rem, 92vw"
            className="-z-10 object-cover"
          />
        ) : null}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-maroon-deepest via-maroon-deepest/25 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <p className="font-script text-2xl text-gold">headlining</p>
          <h3 className="font-title neon text-6xl leading-none lowercase sm:text-7xl">
            {artist.name}
          </h3>
          <p className="font-body mt-3 text-sm font-semibold text-cream/90">
            {artist.time} · {artist.venue}
          </p>
        </div>
      </article>
      <Tape
        tilt={style.tapeTilt}
        tone={style.tape}
        className="absolute -top-4 left-6 z-10 px-4 py-1"
      >
        <span className="font-body text-sm font-bold">{dayLabel(artist)}</span>
      </Tape>
    </div>
  );
}

function DjStrip({ artist }: { artist: Artist }) {
  return (
    <div className="relative mt-16 md:mx-auto md:w-4/5" style={{ rotate: "-0.8deg" }}>
      <article className="relative isolate flex flex-wrap items-center justify-between gap-x-6 gap-y-3 overflow-hidden rounded-[6px] bg-dupatta px-6 py-6 shadow-[7px_8px_0_var(--rose)] sm:px-10">
        <div aria-hidden className="polka-purple absolute inset-0 -z-10 opacity-60" />
        <div>
          <p className="font-script text-2xl text-gold">then the decks</p>
          <h3 className="font-title neon text-4xl leading-none lowercase sm:text-5xl">
            dj {artist.name}
          </h3>
        </div>
        <p className="font-body text-sm font-semibold text-cream/90">
          {dayLabel(artist)}
          <span className="block text-gold">
            {artist.time} · {artist.venue}
          </span>
        </p>
      </article>
      <Sticker tilt={14} className="absolute -top-6 right-6 z-10 size-14">
        <Cassette />
      </Sticker>
    </div>
  );
}

/** The evening lineup: the two headliners as pinned posters, then the DJ set. */
export function Artists() {
  const headliners = artists.filter((a) => a.role === "headliner");
  const djs = artists.filter((a) => a.role === "dj");
  return (
    <SectionGround ground="halftone">
      <div id="lineup" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
        <div className="relative">
          <RevealOnScroll variant="stamp">
            <NeonTitle script="after the competitions, the ground goes live">
              the lineup
            </NeonTitle>
          </RevealOnScroll>
          <Sticker
            tilt={-12}
            className="absolute -top-6 right-2 size-20 text-rose sm:right-10 sm:size-24"
          >
            <span className="relative block size-full">
              <Burst />
              <span className="font-display absolute inset-0 flex items-center justify-center text-sm leading-none text-maroon-deepest sm:text-base">
                live!
              </span>
            </span>
          </Sticker>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {headliners.map((artist, i) => (
            <HeadlinerCard key={artist.id} artist={artist} index={i} />
          ))}
        </div>

        {djs.map((artist) => (
          <DjStrip key={artist.id} artist={artist} />
        ))}
      </div>
    </SectionGround>
  );
}
