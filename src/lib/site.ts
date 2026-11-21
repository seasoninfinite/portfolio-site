import { getSiteOrigin } from "@/lib/site-url";

export const SITE = {
  name: "BGG Website Design",
  shortName: "BGG",
  owner: "Ben",
  email: "bggwebsitedesign@gmail.com",
  town: "Solihull",
  region: "West Midlands",
  termsUrl: "/terms",
  projectFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSclJL3r-v-1n8z49bvHd8TXKg-ty9pu_nA5x2wvi1N0qpbnNA/viewform?usp=sharing&ouid=115643113121012243384",
  areas: ["Solihull", "Birmingham", "Knowle", "Dorridge", "Shirley", "Olton", "Coventry", "Warwickshire"],
  /**
   * Legal identity, shown in the Terms and Privacy policy.
   * FILL IN BEFORE GOING LIVE (Companies Act 2006 s1202 and the E-Commerce Regulations 2002 reg 6
   * require the owner's name and a postal address for a sole trader using a business name).
   * The owner should be an adult (a contract can be cancelled by someone under 18).
   */
  legal: {
    ownerName: "Ben Grobler",
    address: "Solihull, West Midlands, B91",
    icoNumber: "",
    termsUpdated: "21 November 2026",
    privacyUpdated: "20 November 2026",
  },
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
