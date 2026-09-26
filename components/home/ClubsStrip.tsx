import Image from "next/image";
import { clubList } from "@/data/clubs";

export function ClubsStrip() {
  return (
    <section className="border-t border-gold/15 bg-maroon">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="font-script text-center text-2xl text-cream/80">
          brought to you by
        </p>
        <p className="font-body mt-1 text-center text-xs font-semibold tracking-[0.25em] text-gold/70 uppercase">
          the clubs of Plaksha University
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-5">
          {clubList.map((club) => (
            <li
              key={club.id}
              className="flex w-20 flex-col items-center gap-2 text-center"
            >
              <Image
                src={club.logo}
                alt=""
                width={64}
                height={64}
                className="size-14 rounded-full bg-cream object-cover ring-1 ring-gold/30"
              />
              <span className="font-body text-[11px] leading-tight text-cream/70">
                {club.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
