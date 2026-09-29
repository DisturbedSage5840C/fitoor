import { Hero } from "@/components/home/Hero";
import { AboutBlock } from "@/components/home/AboutBlock";
import { Lineup } from "@/components/home/Lineup";
import { BeforeYouCome } from "@/components/home/BeforeYouCome";
import { ContactBlock } from "@/components/home/ContactBlock";
import { ClubsStrip } from "@/components/home/ClubsStrip";
import { Marquee } from "@/components/shared/Marquee";
import { events } from "@/data/events";

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
      <AboutBlock />
      <Lineup />
      <BeforeYouCome />
      <ContactBlock />
      <ClubsStrip />
    </>
  );
}
