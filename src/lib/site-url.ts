/** Primary live domain for sitemap, JSON-LD, and metadata when `NEXT_PUBLIC_SITE_URL` is unset. */
const CANONICAL_ORIGIN = "https://bggwebsitedesign.com";

/** Canonical site origin for metadata, sitemap, and JSON-LD (no trailing slash). */
export function getSiteOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  // Netlify Deploy Previews / branch deploys — match the actual preview URL.
  const netlifyContext = process.env.CONTEXT?.trim();
  if (netlifyContext && netlifyContext !== "production") {
    const preview =
      process.env.DEPLOY_PRIME_URL?.trim() || process.env.URL?.trim();
    if (preview) return preview.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "production") {
    return CANONICAL_ORIGIN;
  }

  const netlify = process.env.URL?.trim();
  if (netlify) return netlify.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    return `https://${vercel.replace(/^https?:\/\//, "")}`.replace(/\/$/, "");
  }

  return "http://localhost:3000";
}
