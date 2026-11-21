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
  title: "Web Design Birmingham from £199.99",
  description:
    "Birmingham web designer for small businesses. Fast, modern websites from £199.99 with no VAT, live in as little as 3 days. Free homepage preview before you pay.",
  alternates: { canonical: "/web-design-birmingham" },
};

const areas = ["Birmingham city centre", "Jewellery Quarter", "Digbeth", "Edgbaston", "Harborne", "Moseley", "Kings Heath", "Sutton Coldfield", "Erdington", "Selly Oak", "Hall Green", "Acocks Green", "Yardley", "Solihull"];

const faqs = [
  {
    q: "How much does a website cost in Birmingham?",
    a: "Birmingham agencies commonly charge £1,500 or more for a small-business website. My fixed packages start at £199.99 for up to 3 pages, £349.99 for up to 6 pages and £499.99 for a premium 10-page site, with no VAT to add.",
  },
  {
    q: "Are you based in Birmingham?",
    a: "I'm based just down the road in Solihull (B91), and I work with businesses right across Birmingham. Everything is done by email, phone and video call, so you never have to take time out to travel.",
  },
  {
    q: "How quickly can my Birmingham business be online?",
    a: "Starter sites can go live in as little as 3 days, Growth in about 5 days and Premium in 10 days or less, from the day I have your content. Need it faster? Ask about rush delivery.",
  },
  {
    q: "Will my website help me show up in Birmingham searches?",
    a: "Every site is built to be found: fast loading, proper page titles, local keywords and a sitemap. Growth and Premium add local SEO setup and structured data so Google understands exactly where you work and what you do.",
  },
];

export default function BirminghamPage() {
  const examples = ["alder-finch-dental", "cafe-zero"].map((s) => projects.find((p) => p.slug === s)!);
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Web design Birmingham", path: "/web-design-birmingham" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Web design in Birmingham",
          serviceType: "Website design",
          provider: { "@id": `${abs("/")}#business` },
          areaServed: areas.map((name) => ({ "@type": "Place", name })),
          url: abs("/web-design-birmingham"),
        }}
      />
      <PageHead
        crumbs={[{ name: "Web design Birmingham" }]}
        eyebrow="Web designer · Birmingham & West Midlands"
        title="Birmingham web design that wins you customers."
        lead="Birmingham is packed with competition. Your website is how you stand out. I build fast, modern, hand-coded websites for Birmingham businesses from £199.99, with no VAT, no agency mark-up and a free homepage preview before you spend a penny."
      >
        <div className="hero__actions">
          <Link href="/contact" className="btn btn--accent">
            Get my free quote <ArrowUpRight />
          </Link>
          <Link href="/contact?plan=Free%20Design%20Preview" className="btn btn--ghost">
            Free homepage preview
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
            <p className="eyebrow">Why Birmingham businesses choose me</p>
            <h2 className="h2" style={{ marginTop: 18 }}>
              Agency-quality websites without the Colmore Row price tag.
            </h2>
          </div>
          <div className="prose">
            <p>
              In a city the size of Birmingham, customers compare you with a dozen competitors in seconds. A slow,
              dated or confusing website sends them straight to the next result. A sharp, fast one gets the call.
            </p>
            <ul className="check-list">
              {[
                "One designer from first message to launch: no account managers, no hand-offs",
                "Fixed prices published up front, and a 50% deposit with the rest only when you're happy",
                "Built for local search, so people nearby find you on Google",
                "Fast on every phone, on 4G as well as office Wi-Fi",
                "Care plans from £10 a month, so your site never goes stale",
              ].map((t) => (
                <li key={t}>
                  <Check />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <h3>Birmingham areas I cover</h3>
            <p>{areas.join(" · ")}, plus the rest of the West Midlands and anywhere in the UK by video call.</p>
            <p>
              Closer to Solihull? See <Link href="/web-design-solihull">web design in Solihull</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--paper2">
        <div className="wrap">
          <div className="sec-head center" style={{ justifyItems: "center" }}>
            <p className="eyebrow">Birmingham web design prices</p>
            <h2 className="h2">Fixed prices. No VAT. No surprises.</h2>
          </div>
          <PriceCards />
          <PayNote />
        </div>
      </section>

      <PreviewOffer title="See your new Birmingham business website, free." />

      <section className="section">
        <div className="wrap wrap--narrow">
          <h2 className="h2" style={{ marginBottom: 32 }}>
            Questions from Birmingham businesses
          </h2>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand title="Let's get your Birmingham business found." />
    </>
  );
}
