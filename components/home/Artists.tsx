import { NeonTitle } from "@/components/shared/NeonTitle";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionGround } from "@/components/shared/SectionGround";
import { Sticker } from "@/components/shared/Sticker";
import { Burst, Cassette } from "@/components/shared/Stickers";
import { artists } from "@/data/artists";
import { festDays } from "@/data/content";
import type { Artist } from "@/data/types";
import { ArtistPoster, type PosterLook } from "./ArtistPoster";

/** Each poster is pinned up by hand: its own tilt, shadow and drop. */
const POSTER_LOOKS: readonly PosterLook[] = [
  { tilt: -1.6, shadow: "shadow-[8px_9px_0_var(--rose)]", drop: "", tape: "rose", tapeTilt: -4 },
  { tilt: 1.4, shadow: "shadow-[8px_9px_0_var(--gold)]", drop: "md:mt-14", tape: "gold", tapeTilt: 3 },
  { tilt: -0.9, shadow: "shadow-[8px_9px_0_var(--dupatta)]", drop: "md:mt-6", tape: "bandage", tapeTilt: -2 },
];

function dayLabel(artist: Artist): string {
  const day = festDays.find((d) => d.day === artist.day);
  return day ? `Day ${artist.day} · ${day.weekday} ${day.date}` : `Day ${artist.day}`;
}

/** The evening lineup: every act's official poster, in running order. */
export function Artists() {
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

        <div className="mx-auto mt-16 grid max-w-md grid-cols-1 gap-x-8 gap-y-16 md:max-w-none md:grid-cols-3">
          {artists.map((artist, i) => (
            <div key={artist.id} className="relative">
              <ArtistPoster
                artist={artist}
                dayLabel={dayLabel(artist)}
                look={POSTER_LOOKS[i % POSTER_LOOKS.length]}
              />
              {artist.role === "dj" ? (
                <Sticker tilt={14} className="absolute -top-7 right-2 z-10 size-14 md:top-0">
                  <Cassette />
                </Sticker>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </SectionGround>
  );
}
