import Image from "next/image";
import { TrimDivider } from "@/components/shared/TrimDivider";
import { clubList } from "@/data/clubs";

/** Badge sizes and tilts repeat in a pattern that is long enough not to read as one. */
const SIZES = ["size-24", "size-20", "size-28", "size-20", "size-24", "size-28", "size-20"];
const TILTS = [-6, 4, -2, 7, -4, 3, -7, 5, -3, 6];

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
              className={`flex w-28 flex-col items-center gap-3 text-center ${i % 3 === 1 ? "sm:mt-6" : ""}`}
            >
              <span
                className="sticker-edge block"
                style={{ rotate: `${TILTS[i % TILTS.length]}deg` }}
              >
                <Image
                  quality={90}
                  src={club.logo}
                  alt=""
                  width={128}
                  height={128}
                  className={`${SIZES[i % SIZES.length]} rounded-full bg-cream object-contain p-1`}
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
