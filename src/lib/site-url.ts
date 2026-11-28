/** The one real domain. Canonicals, sitemap, robots and JSON-LD must always point here in production. */
export const PRODUCTION_SITE_ORIGIN = "https://bggwebsitedesign.com";

/**
 * Canonical site origin for metadata, sitemap, JSON-LD (no trailing slash).
 *
 * Netlify's own `URL` variable is NOT trusted: when the site was moved to a new Netlify project
 * (28 Nov 2026) it reported the *.netlify.app address, and every canonical tag told Google the
 * real copy lived there. Production builds therefore always use PRODUCTION_SITE_ORIGIN unless
 * NEXT_PUBLIC_SITE_URL is set on purpose.
 */
export function getSiteOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  // Netlify deploy previews / branch deploys: point at themselves so they never claim the real domain's pages.
  const context = process.env.CONTEXT;
  if (context && context !== "production") {
    const prime = process.env.DEPLOY_PRIME_URL?.trim();
    if (prime) return prime.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "production") return PRODUCTION_SITE_ORIGIN;

  return "http://localhost:3000";
}
