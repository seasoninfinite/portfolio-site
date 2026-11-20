import { deviceFolder } from "@/data/projects";

/**
 * Pre-rendered, high-resolution device mockups (2x, made from 2–3x screenshots of the real site).
 * Laptop width and up: monitor + laptop + iPad + iPhone board (16:10).
 * Phones: a three-iPhone board (1:1), so the screens stay big enough to read.
 * Boards live in public/work/mockups/<folder>/ and are rebuilt with the mockup render script
 * (see docs/requests/2026-11-20-portfolio-rebuild.md, "Mockups").
 */
export function Devices({
  slug,
  name,
  priority = false,
  sizes = "(min-width: 820px) 50vw, 100vw",
}: {
  slug: string;
  name: string;
  priority?: boolean;
  sizes?: string;
}) {
  const base = `/work/mockups/${deviceFolder(slug)}`;
  return (
    <picture className="mockup">
      <source
        media="(max-width: 640px)"
        srcSet={`${base}/phones-900.webp 900w, ${base}/phones-1800.webp 1800w`}
        sizes="100vw"
        width={1800}
        height={1800}
      />
      <source
        srcSet={`${base}/devices-1200.webp 1200w, ${base}/devices-2400.webp 2400w`}
        sizes={sizes}
        width={2400}
        height={1500}
      />
      <img
        src={`${base}/devices-1200.webp`}
        alt={`${name} website shown on a desktop, laptop, iPad and iPhone`}
        width={2400}
        height={1500}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
