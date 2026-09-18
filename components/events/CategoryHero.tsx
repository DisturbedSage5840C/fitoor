import { categoryIcons } from "@/data/categories";
import type { Category } from "@/data/types";

export function CategoryHero({ category }: { category: Category }) {
  const Icon = categoryIcons[category.slug];

  return (
    <div data-category={category.slug} className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, var(--category), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6 sm:py-20">
        <span className="glow-category flex size-16 items-center justify-center rounded-full border border-category bg-maroon-deepest/60 text-category-light sm:size-20">
          <Icon className="size-8 sm:size-10" aria-hidden />
        </span>

        <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
          <h1 className="font-display text-4xl text-cream sm:text-5xl">{category.name}</h1>
          <span className="font-serif-dev text-xl text-category-light sm:text-2xl">
            {category.hindiName}
          </span>
        </div>

        <p className="font-body text-lg text-category-light">{category.tagline}</p>
        <p className="font-body max-w-2xl text-sm text-cream/70 text-pretty sm:text-base">
          {category.description}
        </p>
      </div>
    </div>
  );
}
