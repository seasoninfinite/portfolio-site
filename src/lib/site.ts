import { getSiteOrigin } from "@/lib/site-url";

export const SITE = {
  name: "BGG Website Design",
  shortName: "BGG",
  owner: "Ben",
  email: "bggwebsitedesign@gmail.com",
  town: "Solihull",
  region: "West Midlands",
  termsUrl:
    "https://1drv.ms/b/c/b7227f61a4ced3d4/IQDRGY0SW_bCRIAvsTa2NkqVAbTqaLe-HUi9bsYgeLLfe3A?e=3KN0Ze",
  projectFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSclJL3r-v-1n8z49bvHd8TXKg-ty9pu_nA5x2wvi1N0qpbnNA/viewform?usp=sharing&ouid=115643113121012243384",
  areas: ["Solihull", "Birmingham", "Knowle", "Dorridge", "Shirley", "Olton", "Coventry", "Warwickshire"],
};

export const NAV = [
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function abs(path: string): string {
  return `${getSiteOrigin()}${path}`;
}

/** BreadcrumbList JSON-LD for an inner page. */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}
