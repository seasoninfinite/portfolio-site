/** Production domain when no deploy env is set (metadata, sitemap, JSON-LD). */
export const PRODUCTION_SITE_ORIGIN = "https://bggwebsitedesign.com";

/** Canonical site origin for metadata, sitemap, JSON-LD (no trailing slash). */
export function getSiteOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const netlify = process.env.URL?.trim();
  if (netlify) return netlify.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`.replace(/\/$/, "");

  if (process.env.NODE_ENV === "production") {
    return PRODUCTION_SITE_ORIGIN;
  }

  return "http://localhost:3000";
}
