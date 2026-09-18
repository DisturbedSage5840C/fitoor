import { Hero } from "@/components/home/Hero";
import { ContentsNav } from "@/components/home/ContentsNav";
import { SectionHeading } from "@/components/shared/SectionHeading";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading eyebrow="Contents" title="Find your way in" className="mb-10" />
        <ContentsNav />
      </section>
    </div>
  );
}
