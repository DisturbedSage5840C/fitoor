import Image from "next/image";
import { clubList } from "@/data/clubs";

export function ClubsStrip() {
  return (
    <section className="border-t border-cream/15 bg-maroon-deepest">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-body text-lg font-semibold text-cream">
          Clubs of Plaksha University
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-5">
          {clubList.map((club) => (
            <li key={club.id} className="flex items-center gap-3">
              <Image
                src={club.logo}
                alt=""
                width={64}
                height={64}
                className="size-12 shrink-0 rounded-full bg-cream object-contain p-1"
              />
              <span className="font-body text-sm text-cream/80">{club.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
