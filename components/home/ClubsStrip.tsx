import Image from "next/image";
import { TrimDivider } from "@/components/shared/TrimDivider";
import { clubList } from "@/data/clubs";

/** Tilts repeat in a pattern long enough not to read as one. */
const TILTS = [-6, 4, -2, 7, -4, 3, -7, 5, -3, 6];

/** Crown caps have 21 crimps; the points alternate between two radii. */
const CRIMPS = 21;
const OUTER_R = 49;
const INNER_R = 44.5;

const CRIMP_POINTS = Array.from({ length: CRIMPS * 2 }, (_, i) => {
  const angle = (i / (CRIMPS * 2)) * Math.PI * 2;
  const r = i % 2 === 0 ? OUTER_R : INNER_R;
  return `${(50 + Math.cos(angle) * r).toFixed(2)},${(50 + Math.sin(angle) * r).toFixed(2)}`;
}).join(" ");

/** Red crown bottle cap: crimped skirt, darker rim, and a glossy top. */
function BottleCap() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 size-full">
      <polygon points={CRIMP_POINTS} fill="#c8203f" stroke="#4a1017" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="40" fill="#a3172f" />
      <circle cx="50" cy="50" r="37.5" fill="none" stroke="#e8586f" strokeWidth="1.2" opacity="0.7" />
      <path d="M22 34a32 32 0 0 1 22-15" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

export function ClubsStrip() {
  return (
    <section className="relative bg-bandage text-maroon-deepest">
      <TrimDivider className="absolute inset-x-0 top-0 text-maroon/60" />
      <div className="mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6">
        <h2 className="font-script -rotate-1 text-center text-4xl text-maroon sm:text-5xl">
          clubs of Plaksha University
        </h2>
        <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap items-start justify-center gap-x-8 gap-y-10">
          {clubList.map((club, i) => (
            <li
              key={club.id}
              className={`group flex w-28 flex-col items-center gap-3 text-center ${i % 3 === 1 ? "sm:mt-6" : ""}`}
            >
              <span
                className="relative block size-24 drop-shadow-[3px_4px_0_rgb(28_4_7/0.35)] transition-transform duration-200 group-hover:-translate-y-1 group-hover:rotate-12"
                style={{ rotate: `${TILTS[i % TILTS.length]}deg` }}
              >
                <BottleCap />
                <Image
                  quality={90}
                  src={`/clubs/caps/${club.id}.webp`}
                  alt=""
                  width={160}
                  height={160}
                  className="absolute inset-[17%] size-[66%] rounded-full object-cover ring-2 ring-[#4a1017]/70"
                />
              </span>
              <span className="font-body text-xs leading-tight font-semibold text-maroon-deepest">
                {club.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
