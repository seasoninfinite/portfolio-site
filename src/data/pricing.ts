/**
 * The one place prices live. The pricing page, the contact wizard and the
 * Stripe checkout route all read from here, so a price is changed once.
 * Amounts are in pence. Researched against UK freelancer/studio price lists, 20 Nov 2026
 * (see docs/requests/2026-11-20-portfolio-rebuild.md).
 */

export type BuildPlanId = "onepage" | "basic" | "standard" | "premium";
export type CarePlanId = "care" | "priority";
export type PurchasePlan = BuildPlanId | CarePlanId;

export type BuildPlan = {
  id: BuildPlanId;
  name: string;
  /** Exact label used in ?plan= links; matched case-insensitively by the contact wizard. */
  queryLabel: string;
  tagline: string;
  pricePence: number;
  depositPence: number;
  pages: string;
  turnaround: string;
  bestFor: string;
  features: string[];
  revisions: string;
  /** What agencies typically charge for a comparable site (anchor shown on the card). */
  agencyUpTo: string;
  highlight?: boolean;
  badge?: string;
};

export type CarePlan = {
  id: CarePlanId;
  name: string;
  queryLabel: string;
  tagline: string;
  pricePence: number;
  features: string[];
  note: string;
  highlight?: boolean;
};

export const buildPlans: BuildPlan[] = [
  {
    id: "onepage",
    name: "One Page",
    queryLabel: "One Page Website",
    tagline: "Everything customers need, on one beautiful page.",
    pricePence: 12500,
    depositPence: 6250,
    pages: "1 page",
    turnaround: "Live in 2 days",
    bestFor: "Sole traders and new businesses that just need a professional presence and a way to get in touch.",
    features: [
      "One custom-designed page: who you are, what you do, prices and contact",
      "Looks perfect on every phone, tablet and laptop",
      "Contact form that lands straight in your inbox",
      "Click-to-call and map so customers reach you in one tap",
      "Google-ready basics: title, description and sitemap",
    ],
    revisions: "1 round of changes",
    agencyUpTo: "£800",
  },
  {
    id: "basic",
    name: "Starter",
    queryLabel: "Starter Website",
    tagline: "Get found online and start taking enquiries, fast.",
    pricePence: 19999,
    depositPence: 10000,
    pages: "Up to 3 pages",
    turnaround: "Live in 3 days",
    bestFor: "New businesses, side hustles and anyone still relying on a Facebook page.",
    features: [
      "Custom design, made for your brand (no templates)",
      "Looks perfect on every phone, tablet and laptop",
      "Contact form that lands straight in your inbox",
      "Click-to-call and map so customers reach you in one tap",
      "Google-ready setup: titles, descriptions, sitemap, Search Console",
      "Fast, secure hosting set up for you",
    ],
    revisions: "2 rounds of changes",
    agencyUpTo: "£1,500",
  },
  {
    id: "standard",
    name: "Growth",
    queryLabel: "Growth Website",
    tagline: "The website that wins you clients while you work.",
    pricePence: 34999,
    depositPence: 17500,
    pages: "Up to 6 pages",
    turnaround: "Live in 5 days",
    bestFor: "Established local businesses and practitioners who want a steady flow of enquiries.",
    features: [
      "Everything in Starter",
      "Premium design with smooth, modern animations",
      "Enquiry or booking form built around how you work",
      "Local SEO setup so nearby customers find you on Google",
      "Reviews and testimonials section that builds trust",
      "Speed tuned to load in a blink on 4G",
      "Google Business Profile tips to get you on the map",
    ],
    revisions: "3 rounds of changes",
    agencyUpTo: "£3,000",
    highlight: true,
    badge: "Most popular",
  },
  {
    id: "premium",
    name: "Premium",
    queryLabel: "Premium Website",
    tagline: "A flagship site that makes you the obvious choice.",
    pricePence: 49999,
    depositPence: 25000,
    pages: "Up to 10 pages",
    turnaround: "Live in 10 days max",
    bestFor: "Brands that want to look like the market leader, and charge like one.",
    features: [
      "Everything in Growth",
      "High-end, fully bespoke design with signature animations",
      "Blog, guides or resources section to win more searches",
      "Take payments online: deposits, bookings or a digital product",
      "Advanced SEO: structured data, page-by-page keywords",
      "Accessibility checked so every visitor can use it",
      "Launch-day speed and security checks",
      "Priority build slot and direct line to me throughout",
    ],
    revisions: "5 rounds of changes",
    agencyUpTo: "£5,000",
    badge: "Best value",
  },
];

export const carePlans: CarePlan[] = [
  {
    id: "care",
    name: "Essential Care",
    queryLabel: "Essential Care Plan",
    tagline: "Your site stays fast, safe and online. You never think about it.",
    pricePence: 1000,
    features: [
      "Fast, secure hosting with SSL (the padlock)",
      "Uptime and security monitoring",
      "Backups of your whole site",
      "1 small change a month (text, image or price update)",
      "Bug fixes if anything ever breaks",
    ],
    note: "Domain name not included: you keep your domain in your own name (usually about £10–£15 a year).",
  },
  {
    id: "priority",
    name: "Priority Care",
    queryLabel: "Priority Care Plan",
    tagline: "Like having your own web person on call, for less than a takeaway.",
    pricePence: 2500,
    features: [
      "Everything in Essential Care",
      "Up to 5 changes a month: new offers, photos, pages, prices",
      "Priority support: replies within 1 working day",
      "Monthly health check: speed, security and search",
      "Help keeping your Google Business Profile fresh",
      "Larger redesigns at a discounted rate",
    ],
    note: "Domain name not included. Cancel any time with 30 days' notice.",
    highlight: true,
  },
];

export const addOns: { name: string; price: string; detail: string }[] = [
  { name: "Extra page", price: "£49.99", detail: "Another fully designed page, with its own SEO title and description." },
  { name: "Online shop", price: "from £249.99", detail: "Sell products or downloads with Stripe checkout and order emails." },
  { name: "Booking system", price: "£149.99", detail: "Customers book and pay a deposit online, with automatic reminders." },
  { name: "Copywriting", price: "£39.99 / page", detail: "I write your page words for you, written to sell and to rank." },
  { name: "Logo design", price: "£99.99", detail: "A clean, modern logo with 2 design options and every file you need." },
  { name: "Google Business Profile setup", price: "£59.99", detail: "Set up and optimised so you show up on Google Maps." },
  { name: "Rush delivery", price: "+30%", detail: "Jump the queue: your site goes live within 48 hours." },
];

export const PLAN_LABELS: Record<PurchasePlan, string> = {
  onepage: "One Page website",
  basic: "Starter website",
  standard: "Growth website",
  premium: "Premium website",
  care: "Essential Care Plan",
  priority: "Priority Care Plan",
};

export function formatGBP(pence: number): string {
  const pounds = pence / 100;
  return pence % 100 === 0 ? `£${pounds.toLocaleString("en-GB")}` : `£${pounds.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** What Stripe charges today for each plan (builds: deposit; care: monthly). */
export function checkoutAmount(plan: PurchasePlan): { pence: number; mode: "payment" | "subscription"; label: string } {
  const build = buildPlans.find((p) => p.id === plan);
  if (build) {
    return { pence: build.depositPence, mode: "payment", label: `${build.name} website: 50% deposit` };
  }
  const care = carePlans.find((p) => p.id === plan)!;
  return { pence: care.pricePence, mode: "subscription", label: care.name };
}

export const pricingFaqs: { q: string; a: string }[] = [
  {
    q: "Why are your prices lower than other web designers?",
    a: "I'm an independent designer with no office, no account managers and no agency overheads. You get the same hand-coded, modern website that agencies charge up to £5,000 for, and the saving goes straight to you.",
  },
  {
    q: "How do I pay?",
    a: "A 50% deposit books your slot and I start straight away. You pay the other 50% only when you've seen the finished site and you're happy with it, before it goes live. Care plans are a simple monthly card payment through Stripe.",
  },
  {
    q: "Do I have to pay VAT on top?",
    a: "No. The price you see is the price you pay. There's no VAT to add.",
  },
  {
    q: "How long does it take?",
    a: "One Page sites go live in 2 days, Starter sites in as little as 3 days, Growth in about 5 days and even Premium sites in 10 days or less. The only thing that slows it down is waiting for your words and photos, and I'll help you with those.",
  },
  {
    q: "Do I need a care plan?",
    a: "Every website needs hosting to stay online, and Essential Care covers that for £10 a month along with security, backups and a small change each month. If you'd like your site kept fresh with regular updates, Priority Care is the one to pick.",
  },
  {
    q: "Is the domain name included?",
    a: "No, and that's on purpose: your domain stays registered in your name, so you always own your web address. It usually costs about £10–£15 a year, and I'll set it up and connect it for you.",
  },
  {
    q: "Will my website show up on Google?",
    a: "Every site is built with search in mind: fast loading, proper titles and descriptions, a sitemap and a Search Console setup, so Google can find and understand every page. Growth and Premium add local SEO and structured data to give you a head start on your competitors.",
  },
  {
    q: "What if I don't like the design?",
    a: "You'll see your design early and we'll refine it together. Every package includes rounds of changes, and I don't ask for the final payment until you're happy.",
  },
];
