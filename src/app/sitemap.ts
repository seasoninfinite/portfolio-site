import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { getSiteOrigin } from "@/lib/site-url";

const LAST_UPDATED = new Date("2026-11-20");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteOrigin();
  const pages: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/pricing", priority: 0.9, freq: "monthly" },
    { path: "/work", priority: 0.9, freq: "weekly" },
    { path: "/web-design-solihull", priority: 0.9, freq: "monthly" },
    { path: "/web-design-birmingham", priority: 0.9, freq: "monthly" },
    { path: "/affordable-website-design", priority: 0.8, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/how-much-does-a-website-cost", priority: 0.7, freq: "monthly" },
    { path: "/terms", priority: 0.3, freq: "monthly" },
    { path: "/privacy", priority: 0.3, freq: "monthly" },
    { path: "/expertise", priority: 0.4, freq: "monthly" },
    { path: "/how-websites-work", priority: 0.4, freq: "monthly" },
  ];
  return [
    ...pages.map((p) => ({
      url: `${base}${p.path === "/" ? "/" : p.path}`,
      lastModified: LAST_UPDATED,
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    ...projects.map((p) => ({
      url: `${base}/work/${p.slug}`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly" as const,
      priority: p.kind === "client" ? 0.7 : 0.5,
    })),
  ];
}
