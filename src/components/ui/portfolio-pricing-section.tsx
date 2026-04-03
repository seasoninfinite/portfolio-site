"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

function contactWithPlan(plan: string) {
  return `/?plan=${encodeURIComponent(plan)}#contact`;
}

type Plan = {
  name: string;
  badge: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  revisions: string;
  footer: string;
  cta: string;
  subject: string;
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    name: "Basic Website Design",
    badge: "Starter",
    price: "£75",
    description:
      "A simple, clean website ideal for personal projects, startups, or landing pages.",
    features: [
      "Simple & modern layout",
      "Up to 3 pages (Home, About, Contact)",
      "Mobile-responsive design",
      "Basic UI/UX structure",
      "Contact form integration",
      "Fast load speeds",
      "Basic SEO setup",
    ],
    revisions: "Up to 3 rounds of revisions",
    footer:
      "Best for clients who need an affordable online presence with a straightforward design and essential functionality.",
    cta: "Book now",
    subject: "Basic Website Design",
  },
  {
    name: "Standard Website Design",
    badge: "Popular",
    price: "£125",
    description:
      "A professional website with improved design, structure, and customization.",
    features: [
      "Custom UI/UX design",
      "Up to 5 pages",
      "Fully responsive across all devices",
      "Modern animations & transitions",
      "Performance optimization",
      "SEO best practices",
      "Cross-browser compatibility",
    ],
    revisions: "Up to 4 rounds of revisions",
    footer:
      "Ideal for small businesses or creators who want a polished, professional website that stands out.",
    cta: "Book now",
    subject: "Standard Website Design",
    highlight: true,
  },
  {
    name: "Advanced Website Design",
    badge: "Premium",
    price: "£200",
    description:
      "A premium, high-end website with advanced visuals, interactions, and performance.",
    features: [
      "High-end custom UI/UX design",
      "Up to 8 pages",
      "Advanced animations & interactions",
      "Custom sections & layouts",
      "Performance & speed optimization",
      "Accessibility standards",
      "Advanced SEO setup",
      "Clean, scalable code",
    ],
    revisions: "Up to 5 rounds of revisions",
    footer:
      "Perfect for brands that want a visually impressive, conversion-focused website. This option offers a significantly more refined design than Basic and Standard.",
    cta: "Book now",
    subject: "Advanced Website Design",
  },
];

const carePlan = {
  name: "Website Care Plan",
  badge: "Monthly",
  price: "£10",
  priceNote: "/month",
  description:
    "You don't need to do anything - I handle everything for you. I pay for your domain name, which costs a certain amount per month to keep your website running online. This monthly fee covers the domain registration and hosting needed for your site to stay live and accessible. Available only after you've purchased a Basic, Standard or Advanced website from me, or if you already have a code-based site (not a builder).",
  features: [
    "Domain name included",
    "Hosting & basic maintenance",
    "Up to 3 content or design changes per month",
    "Bug fixes & small improvements",
    "Performance monitoring",
    "Priority support",
  ],
  rework:
    "Minor edits included (text, images, layout tweaks). Larger redesigns available at a discounted rate.",
  footer:
    "Best for clients who want long-term support, regular updates, and peace of mind without extra costs. You must have a website built by me first before adding the Care Plan.",
  cta: "Add Care Plan",
  subject: "Website Care Plan",
};

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border p-5 md:p-6 ${
        plan.highlight
          ? "border-violet-500/40 bg-gradient-to-b from-violet-500/10 to-transparent"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <h3 className="text-base font-semibold text-white md:text-lg">
          {plan.name}
        </h3>
        <Badge variant="secondary" className="rounded-full text-[10px] font-normal">
          {plan.badge}
        </Badge>
      </div>
      <p className="mb-4 text-center text-2xl font-bold text-white md:text-3xl">
        {plan.price}
      </p>
      <p className="mb-4 text-sm leading-relaxed text-white/60">{plan.description}</p>
      <ul className="mb-4 flex flex-1 flex-col gap-2 text-sm text-white/75">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" aria-hidden />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/45">
        Revisions
      </p>
      <p className="mb-4 text-sm text-white/70">{plan.revisions}</p>
      <p className="mb-6 text-xs leading-relaxed text-white/50">{plan.footer}</p>
      <a
        href={contactWithPlan(plan.subject)}
        className={cn(
          buttonVariants({
            variant: plan.highlight ? "default" : "outline",
            size: "lg",
          }),
          "mt-auto w-full justify-center rounded-full",
          !plan.highlight &&
            "border-white/20 bg-transparent text-white hover:bg-white/10"
        )}
      >
        {plan.cta}
      </a>
    </div>
  );
}

export function PortfolioPricingSection() {
  return (
    <section
      id="pricing"
      className="border-t border-white/10 bg-black px-6 py-16 md:py-24"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="pricing-heading"
          className="mb-3 text-center text-2xl font-semibold tracking-tight text-white md:text-3xl"
        >
          Pricing
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-white/55 md:text-base">
          Straight numbers for website packages. Care Plan is only for clients who already have a site built with me, or for people who already have a code-based site (not a builder).
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <PlanCard key={p.name} plan={p} />
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-white md:text-xl">
              {carePlan.name}
            </h3>
            <Badge variant="secondary" className="rounded-full text-[10px] font-normal">
              {carePlan.badge}
            </Badge>
          </div>
          <p className="mb-4 text-2xl font-bold text-white md:text-3xl">
            {carePlan.price}
            <span className="text-base font-normal text-white/50">
              {carePlan.priceNote}
            </span>
          </p>
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-white/60">
            {carePlan.description}
          </p>
          <ul className="mb-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {carePlan.features.map((f) => (
              <li key={f} className="flex gap-2 text-sm text-white/75">
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" aria-hidden />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/45">
            Reworks / changes
          </p>
          <p className="mb-4 text-sm text-white/70">{carePlan.rework}</p>
          <p className="mb-6 text-xs leading-relaxed text-white/50">
            {carePlan.footer}
          </p>
          <a
            href={contactWithPlan(carePlan.subject)}
            className={cn(
              buttonVariants({ size: "lg" }),
              "inline-flex rounded-full"
            )}
          >
            {carePlan.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
