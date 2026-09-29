import { Hero } from "@/components/home/Hero";
import { AboutBlock } from "@/components/home/AboutBlock";
import { Lineup } from "@/components/home/Lineup";
import { BeforeYouCome } from "@/components/home/BeforeYouCome";
import { ContactBlock } from "@/components/home/ContactBlock";
import { ClubsStrip } from "@/components/home/ClubsStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutBlock />
      <Lineup />
      <BeforeYouCome />
      <ContactBlock />
      <ClubsStrip />
    </>
  );
}
