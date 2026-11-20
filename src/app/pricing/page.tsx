import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand, Faq, JsonLd, PageHead } from "@/components/site/blocks";
import { ArrowUpRight } from "@/components/site/icons";
import { PreviewOffer } from "@/components/site/offer";
import { AddOnList, CareCards, PayNote, PriceCards } from "@/components/site/pricing";
import { buildPlans, carePlans, formatGBP, pricingFaqs } from "@/data/pricing";
import { abs, breadcrumbLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Website Design Prices UK from £199.99",
  description:
    "Fixed website prices: Starter £199.99, Growth £349.99, Premium £499.99. Care plans from £10 a month. No VAT, 50% deposit, the rest when you're happy.",
  alternates: { canonical: "/pricing" },
};

const compareRows: { label: string; values: [string, string, string] }[] = [
  { label: "Pages", values: ["Up to 3", "Up to 6", "Up to 10"] },
  { label: "Custom design, no templates", values: ["✓", "✓", "✓"] },
  { label: "Phone, tablet & desktop ready", values: ["✓", "✓", "✓"] },
  { label: "Contact form", values: ["✓", "✓", "✓"] },
  { label: "Google setup (titles, sitemap, Search Console)", values: ["✓", "✓", "✓"] },
  { label: "Modern animations", values: ["–", "✓", "Signature"] },
  { label: "Enquiry or booking form", values: ["–", "✓", "✓"] },
  { label: "Local SEO setup", values: ["–", "✓", "Advanced"] },
  { label: "Reviews section", values: ["–", "✓", "✓"] },
  { label: "Blog / guides / resources", values: ["–", "–", "✓"] },
  { label: "Take payments online", values: ["–", "–", "✓"] },
  { label: "Structured data for Google", values: ["–", "–", "✓"] },
  { label: "Rounds of changes", values: ["2", "3", "5"] },
  { label: "Time to launch", values: ["3 days", "5 days", "10 days max"] },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Pricing", path: "/pricing" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Website design",
          provider: { "@id": `${abs("/")}#business` },
          areaServed: { "@type": "Country", name: "United Kingdom" },
          offers: [...buildPlans, ...carePlans].map((p) => ({
            "@type": "Offer",
            name: p.name,
            price: (p.pricePence / 100).toFixed(2),
            priceCurrency: "GBP",
            description: p.tagline,
          })),
        }}
      />
      <PageHead
        crumbs={[{ name: "Pricing" }]}
        eyebrow="Pricing"
        title="Fixed prices. Agency quality. No nasty surprises."
        lead={`Pick a package, pay a 50% deposit and I start straight away. You only pay the rest when you've seen your finished site and you love it. Websites from ${formatGBP(buildPlans[0].pricePence)}, with no VAT to add.`}
      />

      <section className="section--tight" style={{ paddingTop: 12 }}>
        <div className="wrap">
          <PriceCards />
          <PayNote />
        </div>
      </section>

      <PreviewOffer title="Not ready to commit? See your homepage first, free." />

      <section className="section section--white" aria-labelledby="compare">
        <div className="wrap">
          <h2 className="h2" id="compare" style={{ marginBottom: 28 }}>
            Compare packages
          </h2>
          <div className="prose" style={{ overflowX: "auto" }}>
            <table style={{ minWidth: 560 }}>
              <thead>
                <tr>
                  <th scope="col">What you get</th>
                  {buildPlans.map((p) => (
                    <th scope="col" key={p.id}>
                      {p.name}
                      <br />
                      <span style={{ color: "var(--ink)", fontSize: 15, textTransform: "none", letterSpacing: 0 }}>
                        {formatGBP(p.pricePence)}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" style={{ fontFamily: "var(--font-body)", fontSize: 16, textTransform: "none", letterSpacing: 0, color: "var(--ink)" }}>
                      {r.label}
                    </th>
                    {r.values.map((v, n) => (
                      <td key={n} aria-label={v === "–" ? "Not included" : v === "✓" ? "Included" : undefined}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" id="care">
        <div className="wrap">
          <div className="sec-head sec-head--split">
            <div>
              <p className="eyebrow">Care plans</p>
              <h2 className="h2" style={{ marginTop: 18 }}>
                Keep your site fast, safe and fresh, without lifting a finger.
              </h2>
            </div>
            <p className="lead">
              Every website needs hosting to stay online. Pick the level of care you want; you can switch or cancel
              any time with 30 days&apos; notice.
            </p>
          </div>
          <CareCards />
        </div>
      </section>

      <section className="section section--paper2" id="add-ons">
        <div className="wrap cs-grid">
          <div>
            <p className="eyebrow">Add-ons</p>
            <h2 className="h2" style={{ marginTop: 18 }}>
              Need a little extra?
            </h2>
            <p className="lead" style={{ marginTop: 18 }}>
              Bolt any of these onto a package. Not sure what you need? Tell me what you&apos;re trying to achieve and
              I&apos;ll recommend the cheapest way to get there.
            </p>
            <Link href="/contact" className="btn" style={{ marginTop: 24 }}>
              Ask for a custom quote <ArrowUpRight />
            </Link>
          </div>
          <AddOnList />
        </div>
      </section>

      <section className="section" id="faq">
        <div className="wrap wrap--narrow">
          <p className="eyebrow">Pricing FAQ</p>
          <h2 className="h2" style={{ margin: "18px 0 32px" }}>
            Everything you might be wondering.
          </h2>
          <Faq items={pricingFaqs} />
          <p style={{ marginTop: 24 }}>
            <Link href="/how-much-does-a-website-cost" className="text-link">
              Read: how much does a website cost in the UK? <ArrowUpRight className="size-4" />
            </Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
