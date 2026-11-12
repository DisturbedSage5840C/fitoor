import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { AboutBlock } from "@/components/home/AboutBlock";
import { Artists } from "@/components/home/Artists";
import { Lineup } from "@/components/home/Lineup";
import { BeforeYouCome } from "@/components/home/BeforeYouCome";
import { ContactBlock } from "@/components/home/ContactBlock";
import { ClubsStrip } from "@/components/home/ClubsStrip";
import { Marquee } from "@/components/shared/Marquee";
import { Kulhad } from "@/components/shared/Stickers";
import { events } from "@/data/events";
import { artists } from "@/data/artists";
import { fest } from "@/data/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* The strip is tilted, so clip its overhang instead of letting it scroll the page. */}
      <div className="overflow-hidden py-3">
        <Marquee
          items={events.map((e) => e.title.toLowerCase())}
          className="font-title -mx-4 -rotate-1 border-y-2 border-maroon-deepest bg-gold py-3 text-2xl text-maroon-deepest sm:text-3xl"
        />
      </div>
      <div className="overflow-hidden pb-3">
        <Marquee
          reverse
          items={[
            fest.theme.toLowerCase(),
            `live: ${artists.map((a) => a.name.toLowerCase()).join(" · ")}`,
            fest.dates,
            `${fest.university}, ${fest.region}`,
          ]}
          separator={<span className="inline-block size-[1.6em]"><Kulhad /></span>}
          className="font-script -mx-4 rotate-[0.8deg] border-y-2 border-gold/60 bg-dupatta py-2 text-3xl text-gold sm:text-4xl"
        />
      </div>
      <AboutBlock />
      <Artists />
      <Lineup />
      <BeforeYouCome />
      <ContactBlock />
      <ClubsStrip />
    </>
  );
}
