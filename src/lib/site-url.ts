/** Canonical site origin for metadata, sitemap, and JSON-LD (no trailing slash). */
export function getSiteOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const netlify = process.env.URL?.trim();
  if (netlify) return netlify.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`.replace(/\/$/, "");

  return "http://localhost:3000";
}
