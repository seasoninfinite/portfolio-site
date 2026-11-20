import type { MetadataRoute } from "next";

import { getSiteOrigin } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteOrigin();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Concept demo sites (/showcase/) stay crawlable so Google sees their noindex tag.
      disallow: ["/api/", "/__forms.html"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
