import type { MetadataRoute } from "next";

const base = "https://myvet.uz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
