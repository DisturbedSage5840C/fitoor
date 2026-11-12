"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { Tape } from "@/components/shared/Tape";
import type { Artist } from "@/data/types";
import { cn } from "@/lib/utils";
import { useSongPreview, type PreviewState } from "./useSongPreview";

export interface PosterLook {
  tilt: number;
  shadow: string;
  drop: string;
  tape: "rose" | "gold" | "bandage";
  tapeTilt: number;
}

interface ArtistPosterProps {
  artist: Artist;
  dayLabel: string;
  look: PosterLook;
}

const EQ_DELAYS = ["0s", "-0.3s", "-0.6s", "-0.15s"];

function Equaliser() {
  return (
    <span aria-hidden className="flex h-4 items-end gap-[3px]">
      {EQ_DELAYS.map((delay) => (
        <span key={delay} className="eq-bar block h-full w-[3px] bg-gold" style={{ animationDelay: delay }} />
      ))}
    </span>
  );
}

function hintFor(state: PreviewState): string {
  if (state === "playing") return "now playing";
  if (state === "loading") return "cueing up…";
  if (state === "blocked") return "tap to play";
  return "hover or tap to listen";
}

/** One act's official poster, pinned up by hand. Posters with a song preview it on hover or tap. */
export function ArtistPoster({ artist, dayLabel, look }: ArtistPosterProps) {
  const { song } = artist;
  const { state, onHoverStart, onHoverEnd, toggle } = useSongPreview(song?.previewUrl);
  const playing = state === "playing";

  const poster = artist.image ? (
    <Image
      src={artist.image}
      alt={artist.imageAlt ?? artist.name}
      fill
      sizes="(min-width: 768px) 22rem, 92vw"
      className="object-cover"
    />
  ) : null;

  const frame = cn(
    "relative block aspect-[4/5] w-full overflow-hidden rounded-[6px] bg-maroon-deepest transition-transform duration-200",
    look.shadow,
    playing && "scale-[1.02]",
  );

  return (
    <div className={cn("relative", look.drop)} style={{ rotate: `${look.tilt}deg` }}>
      {song ? (
        <button
          type="button"
          onClick={toggle}
          onPointerEnter={(e) => onHoverStart(e.pointerType)}
          onPointerLeave={onHoverEnd}
          aria-pressed={playing}
          aria-label={`${playing ? "Pause" : "Play"} a preview of ${song.title} by ${song.credit}`}
          className={cn(frame, "group cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold")}
        >
          {poster}
          <span
            aria-hidden
            className={cn(
              "absolute right-3 bottom-3 flex size-12 items-center justify-center rounded-full bg-gold text-maroon-deepest shadow-[3px_3px_0_var(--maroon-deepest)] transition-transform group-hover:scale-110",
              playing && "bg-rose",
            )}
          >
            {playing ? <Pause className="size-5" /> : <Play className="size-5 translate-x-px" />}
          </span>
        </button>
      ) : (
        <div className={frame}>{poster}</div>
      )}

      <Tape tilt={look.tapeTilt} tone={look.tape} className="absolute -top-4 left-5 z-10 px-4 py-1">
        <span className="font-body text-sm font-bold">{dayLabel}</span>
      </Tape>

      <div className="mt-5 px-1">
        <p className="font-script text-xl text-gold">
          {artist.role === "dj" ? "on the decks" : "headlining"}
        </p>
        <h3 className="font-title neon text-4xl leading-none lowercase sm:text-5xl">
          {artist.role === "dj" ? `dj ${artist.name}` : artist.name}
        </h3>
        <p className="font-body mt-2 text-sm font-semibold text-cream/90">
          {artist.time} · {artist.venue}
        </p>
        {song ? (
          <p className="font-body mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-cream/70" aria-live="polite">
            {playing ? <Equaliser /> : null}
            <span className="font-semibold text-gold">{hintFor(state)}:</span>
            <span>
              {song.title} · {song.credit}
            </span>
            <a
              href={song.link}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-dotted underline-offset-2 hover:text-gold"
            >
              preview via Apple Music
            </a>
          </p>
        ) : null}
      </div>
    </div>
  );
}
