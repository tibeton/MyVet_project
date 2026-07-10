import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const base = "https://myvet.uz";

// One entry per locale, cross-linked via hreflang alternates.
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${base}/${l}`]),
  );

  return locales.map((l) => ({
    url: `${base}/${l}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: l === "ru" ? 1 : 0.8,
    alternates: { languages },
  }));
}
