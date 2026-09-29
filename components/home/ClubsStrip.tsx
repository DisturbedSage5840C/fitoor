import Image from "next/image";
import { clubList } from "@/data/clubs";

export function ClubsStrip() {
  return (
    <section className="border-t border-gold/15 bg-maroon">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-script text-center text-3xl text-gold [text-shadow:0_0_14px_rgba(232,199,126,0.45)]">
          clubs of Plaksha University
        </h2>
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
                className="size-14 rounded-full bg-cream object-contain p-1 ring-1 ring-gold/30"
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
