import type { MetadataRoute } from "next";
import { categoryList } from "@/data/categories";
import { siteUrl } from "@/lib/site";

const staticRoutes = [
  "",
  "/about",
  "/schedule",
  "/events",
  "/generalities",
  "/accommodation",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categoryList.map(
    (category) => ({
      url: `${siteUrl}/events/${category.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [...staticEntries, ...categoryEntries];
}
