import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryHero } from "@/components/events/CategoryHero";
import { EventCard } from "@/components/events/EventCard";
import Link from "next/link";
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

export default async function CategoryPage({
  params,
}: PageProps<"/events/[category]">) {
  const { category: slug } = await params;
  const category = categories[slug as CategorySlug];
  if (!category) notFound();

  const events = getEventsByCategory(category.slug);
  const index = categoryList.findIndex((c) => c.slug === category.slug);
  const next = categoryList[(index + 1) % categoryList.length];

  return (
    <div data-category={category.slug}>
      <CategoryHero category={category} events={events} />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-14 sm:px-6">
        {events.map((event) => (
          <RevealOnScroll key={event.id}>
            <EventCard event={event} />
          </RevealOnScroll>
        ))}
      </div>

      <div data-category={next.slug} className="border-t border-cream/10">
        <Link
          href={`/events/${next.slug}`}
          className="group mx-auto flex max-w-5xl items-baseline justify-between gap-4 px-4 py-12 sm:px-6"
        >
          <span className="sr-only">Next category</span>
          <span className="font-title neon-soft text-5xl lowercase transition-transform group-hover:-translate-x-1 sm:text-6xl">
            {next.name}
          </span>
        </Link>
      </div>
    </div>
  );
}
