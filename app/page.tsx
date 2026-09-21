import { Hero } from "@/components/home/Hero";
import { MascotReveal } from "@/components/home/MascotReveal";
import { ColorRamps } from "@/components/home/ColorRamps";
import { TypeSpecimen } from "@/components/home/TypeSpecimen";
import { IconCluster } from "@/components/home/IconCluster";
import { CollageMoment } from "@/components/home/CollageMoment";
import { ContentsNav } from "@/components/home/ContentsNav";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SpacingDivider } from "@/components/zine/SpacingDivider";
import { PageTurnMoment } from "@/components/three/PageTurnMoment";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SpacingDivider label="PG. 02" seed={2} />
      </div>
      <MascotReveal />

      <PageTurnMoment label="PG. 03" seed={5} />
      <ColorRamps />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SpacingDivider label="PG. 04" seed={8} />
      </div>
      <TypeSpecimen />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SpacingDivider label="PG. 05" seed={11} />
      </div>
      <IconCluster />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SpacingDivider label="PG. 06" seed={14} />
      </div>
      <CollageMoment />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SpacingDivider label="PG. 07" seed={17} />
      </div>
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Contents"
          title="Find your way in"
          frame="zine"
          className="mb-10"
        />
        <ContentsNav />
      </section>
    </div>
  );
}
