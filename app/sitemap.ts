import type { MetadataRoute } from "next";
import { bundles } from "@/data/bundles";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/bundles",
    "/how-it-works",
    "/grading",
    "/authenticity",
    "/custom-orders",
    "/shipping",
    "/faq",
    "/about",
    "/contact",
    "/quote",
    "/privacy",
  ];
  const now = new Date();
  return [
    ...pages.map((p) => ({
      url: `${site.url}${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
    ...bundles.map((b) => ({
      url: `${site.url}/bundles/${b.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
  ];
}
