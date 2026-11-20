import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand, Faq, JsonLd, PageHead } from "@/components/site/blocks";
import { ArrowUpRight, Check } from "@/components/site/icons";
import { PreviewOffer } from "@/components/site/offer";
import { PayNote, PriceCards } from "@/components/site/pricing";
import { ProjectCard } from "@/components/site/project-card";
import { projects } from "@/data/projects";
import { abs, breadcrumbLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Web Design Solihull from £199.99",
  description:
    "Web designer in Solihull building fast, modern websites for Solihull, Knowle, Dorridge, Shirley and Birmingham businesses. Fixed prices from £199.99, no VAT.",
  alternates: { canonical: "/web-design-solihull" },
};

const areas = ["Solihull town centre", "Shirley", "Olton", "Knowle", "Dorridge", "Hockley Heath", "Balsall Common", "Meriden", "Castle Bromwich", "Chelmsley Wood", "Birmingham", "Coventry"];

const faqs = [
  {
    q: "How much does a website cost in Solihull?",
    a: "With me, a professional small-business website costs from £199.99 for up to 3 pages, £349.99 for up to 6 pages and £499.99 for a premium 10-page site. Many agencies in the West Midlands charge £1,000 or more for a similar site.",
  },
  {
    q: "Do you only work with Solihull businesses?",
    a: "No. I'm based in Solihull and love working with local businesses, but I build websites for clients all over the UK, from Swansea to London to Essex. Everything works by email, phone and video call.",
  },
  {
    q: "Can you help my business show up on Google Maps?",
    a: "Yes. Growth and Premium websites include local SEO setup, and I offer a Google Business Profile setup add-on so you appear when people nearby search for what you do.",
  },
  {
    q: "I already have a website. Can you redesign it?",
    a: "Absolutely. I regularly rebuild old WordPress, Wix and page-builder sites into fast, modern code, keeping your content and making it look and work far better.",
  },
];

export default function SolihullPage() {
  const examples = ["fernbrook-landscapes", "alder-finch-dental"].map((s) => projects.find((p) => p.slug === s)!);
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Web design Solihull", path: "/web-design-solihull" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Web design in Solihull",
          serviceType: "Website design",
          provider: { "@id": `${abs("/")}#business` },
          areaServed: areas.map((name) => ({ "@type": "Place", name })),
          url: abs("/web-design-solihull"),
        }}
      />
      <PageHead
        crumbs={[{ name: "Web design Solihull" }]}
        eyebrow="Local web designer · Solihull"
        title="Web design in Solihull that brings in local customers."
        lead="I'm Ben, a Solihull web designer building fast, modern websites for local businesses, from trades and clinics to cafés and consultants. Fixed prices from £199.99, no VAT, and a site you'll be proud to send people to."
      >
        <div className="hero__actions">
          <Link href="/contact" className="btn btn--accent">
            Get my free quote <ArrowUpRight />
          </Link>
          <Link href="/work" className="btn btn--ghost">
            See my work
          </Link>
        </div>
      </PageHead>

      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="work-grid">
            {examples.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="wrap cs-grid">
          <div>
            <p className="eyebrow">Why local businesses choose me</p>
            <h2 className="h2" style={{ marginTop: 18 }}>
              When someone in Solihull searches for what you do, be the one they call.
            </h2>
          </div>
          <div className="prose">
            <p>
              Your customers are searching right now: &ldquo;plumber near me&rdquo;, &ldquo;dentist in Shirley&rdquo;,
              &ldquo;landscaper Knowle&rdquo;. If your website is slow, dated or missing, they&apos;re calling your
              competitor instead.
            </p>
            <p>I build websites that fix that:</p>
            <ul className="check-list">
              {[
                "Built to rank: fast loading, proper page titles, local keywords and a sitemap Google can read",
                "Built to convert: click-to-call, quote forms and booking right where customers need them",
                "Built for phones: most local searches happen on a mobile, often on the move",
                "Built to last: hand-written code with no plugins to break or update",
              ].map((t) => (
                <li key={t}>
                  <Check />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <h3>Areas I cover</h3>
            <p>{areas.join(" · ")}, plus the rest of the West Midlands and anywhere in the UK by video call.</p>
          </div>
        </div>
      </section>

      <section className="section section--paper2">
        <div className="wrap">
          <div className="sec-head center" style={{ justifyItems: "center" }}>
            <p className="eyebrow">Solihull web design prices</p>
            <h2 className="h2">Clear prices for local businesses.</h2>
          </div>
          <PriceCards />
          <PayNote />
        </div>
      </section>

      <PreviewOffer title="See your new Solihull business website, free." />

      <section className="section">
        <div className="wrap wrap--narrow">
          <h2 className="h2" style={{ marginBottom: 32 }}>
            Questions from Solihull businesses
          </h2>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand title="Let's get your Solihull business found." />
    </>
  );
}
