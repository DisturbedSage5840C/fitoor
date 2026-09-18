import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryHero } from "@/components/events/CategoryHero";
import { EventCard } from "@/components/events/EventCard";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { categories, categoryList } from "@/data/categories";
import { getEventsByCategory } from "@/data/events";
import type { CategorySlug } from "@/data/types";

export function generateStaticParams() {
  return categoryList.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/events/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categories[slug as CategorySlug];
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps<"/events/[category]">) {
  const { category: slug } = await params;
  const category = categories[slug as CategorySlug];
  if (!category) notFound();

  const events = getEventsByCategory(category.slug);

  return (
    <div data-category={category.slug} className="flex flex-col gap-12 pb-20">
      <CategoryHero category={category} />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2">
        {events.map((event, i) => (
          <RevealOnScroll key={event.id} delay={i * 0.04}>
            <EventCard event={event} />
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
