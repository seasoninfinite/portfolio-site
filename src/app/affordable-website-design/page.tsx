import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand, Faq, JsonLd, PageHead } from "@/components/site/blocks";
import { ArrowUpRight, Check } from "@/components/site/icons";
import { PreviewOffer } from "@/components/site/offer";
import { PayNote, PriceCards } from "@/components/site/pricing";
import { abs, breadcrumbLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affordable Website Design UK from £199.99",
  description:
    "Affordable website design for UK small businesses: custom, hand-coded sites from £199.99 with no VAT. Cheap price, premium look. Free homepage preview first.",
  alternates: { canonical: "/affordable-website-design" },
};

const faqs = [
  {
    q: "How can your websites be so cheap?",
    a: "I'm an independent designer with no office, no staff and no agency overheads, so I don't have to charge agency prices. The work itself is the same: custom design, hand-written code and proper search setup.",
  },
  {
    q: "Is a cheap website worse than an expensive one?",
    a: "Not when it's built properly. Many expensive sites run on slow page builders and paid plugins. Mine are hand-coded, which means they load faster, rank better and cost less to keep running.",
  },
  {
    q: "Are there hidden costs?",
    a: "No. The price is fixed, there's no VAT to add, and you pay a 50% deposit with the rest only when you're happy. Your domain (about £10–£15 a year) is in your own name, and hosting is from £10 a month on a care plan.",
  },
  {
    q: "Can I see what I'd get before paying?",
    a: "Yes. Ask for a free 1-page preview and I'll design your new homepage at no cost and with no obligation.",
  },
];

export default function AffordablePage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Affordable website design", path: "/affordable-website-design" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Affordable website design",
          serviceType: "Website design",
          provider: { "@id": `${abs("/")}#business` },
          areaServed: { "@type": "Country", name: "United Kingdom" },
          url: abs("/affordable-website-design"),
        }}
      />
      <PageHead
        crumbs={[{ name: "Affordable website design" }]}
        eyebrow="Affordable website design · UK"
        title="Cheap websites that don't look cheap."
        lead="A professional website shouldn't cost a month's takings. Get a custom, hand-coded website from £199.99, with no VAT, no templates and no hidden extras, that looks like you paid ten times more."
      >
        <div className="hero__actions">
          <Link href="/pricing" className="btn btn--accent">
            See the prices <ArrowUpRight />
          </Link>
          <Link href="/contact?plan=Free%20Design%20Preview" className="btn btn--ghost">
            Free homepage preview
          </Link>
        </div>
      </PageHead>

      <section className="section section--white">
        <div className="wrap cs-grid">
          <div>
            <p className="eyebrow">Low price, high standard</p>
            <h2 className="h2" style={{ marginTop: 18 }}>
              Where the money you save comes from.
            </h2>
          </div>
          <div className="prose">
            <p>Agencies charge up to £5,000 for a small-business website. Most of that pays for offices, account managers and layers of sign-off. You get none of that with me, and you don&apos;t miss it:</p>
            <ul className="check-list">
              {[
                "You deal directly with the designer who builds your site",
                "Custom design for your business, never a reused template",
                "Hand-written code: faster, more secure and cheaper to run than page builders",
                "Google-ready from day one: titles, descriptions, sitemap and Search Console",
                "Fixed price, no VAT, 50% deposit and the rest only when you're happy",
                "Your domain stays in your name, so you're never locked in",
              ].map((t) => (
                <li key={t}>
                  <Check />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p>
              Want to compare? Read <Link href="/how-much-does-a-website-cost">how much a website costs in the UK</Link>{" "}
              or <Link href="/work">see the websites I&apos;ve built</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--paper2">
        <div className="wrap">
          <div className="sec-head center" style={{ justifyItems: "center" }}>
            <p className="eyebrow">Affordable packages</p>
            <h2 className="h2">Pick a package. Know the price.</h2>
          </div>
          <PriceCards />
          <PayNote />
        </div>
      </section>

      <PreviewOffer />

      <section className="section">
        <div className="wrap wrap--narrow">
          <h2 className="h2" style={{ marginBottom: 32 }}>
            Questions about affordable websites
          </h2>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand title="Get a premium website at a price that makes sense." />
    </>
  );
}
