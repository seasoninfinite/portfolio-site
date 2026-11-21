import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaBand, JsonLd, PageHead } from "@/components/site/blocks";
import { ArrowUpRight } from "@/components/site/icons";
import { projects } from "@/data/projects";
import { abs, breadcrumbLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Ben, Web Designer in Solihull",
  description:
    "Meet Ben, the 15-year-old web designer behind BGG Website Design in Solihull. Hand-coded websites, agency quality, without the agency price.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Built from scratch, every time",
    body: "No templates and no page builders. Every site is designed around your business and written by hand, which is why they look sharper and load faster.",
  },
  {
    title: "Your phone first",
    body: "Most of your customers will meet you on a phone, so that's where I start. Every page is tested on real phone, tablet and laptop sizes before you see it.",
  },
  {
    title: "Words that sell",
    body: "A beautiful site that says nothing doesn't bring in work. I shape every page around what your customers want to know and the one thing you want them to do next.",
  },
  {
    title: "Straight talking",
    body: "Fixed prices, clear timelines and honest advice, even when that advice is 'you don't need that'. You'll always know where your project stands.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "About", path: "/about" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: abs("/about"),
          mainEntity: { "@id": `${abs("/")}#ben` },
        }}
      />
      <PageHead
        crumbs={[{ name: "About" }]}
        eyebrow="About"
        title="Hi, I'm Ben. I build websites that win work."
        lead="I'm a 15-year-old web designer and developer from Solihull. I started coding over two years ago, and now I design and build websites for businesses and practitioners across the UK."
      />

      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap about">
          <div className="about__photo">
            <Image src="/about/ben.png" alt="Ben, founder of BGG Website Design" fill priority sizes="(min-width: 900px) 440px, 100vw" />
          </div>
          <div className="prose">
            <h2 style={{ marginTop: 0 }}>Why I do this</h2>
            <p>
              I&apos;ve always been fascinated by how a good design can change the way people feel about a business.
              Two websites can sell the exact same service, and one gets the phone ringing while the other gets
              ignored. Building the first kind is what I love doing.
            </p>
            <p>
              Starting young means I&apos;m fluent in modern web technology, I live on my phone like your customers
              do, and I have the time and energy to sweat every detail. It also means no office, no staff and no
              overheads, so I can charge far less than an agency without cutting a single corner.
            </p>
            <h2>Who I work with</h2>
            <p>
              Small businesses, sole traders and health practitioners, especially{" "}
              <Link href="/work">dietitians and health practitioners</Link>. I&apos;m based in{" "}
              <Link href="/web-design-solihull">Solihull</Link>{" "}and work with clients all over the UK, by email and
              video call.
            </p>
            <div className="facts">
              <div>
                <b>{projects.length}</b>
                <span>websites designed &amp; built</span>
              </div>
              <div>
                <b>10+</b>
                <span>industries</span>
              </div>
              <div>
                <b>2+</b>
                <span>years coding</span>
              </div>
              <div>
                <b>100%</b>
                <span>hand-written code</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="wrap">
          <p className="eyebrow">How I work</p>
          <h2 className="h2" style={{ margin: "18px 0 36px", maxWidth: "18ch" }}>
            Four promises on every project.
          </h2>
          <ol className="benefit-list">
            {principles.map((p) => (
              <li key={p.title} data-reveal>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
          <div style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/work" className="btn">
              See my work <ArrowUpRight />
            </Link>
            <Link href="/expertise" className="btn btn--ghost">
              My technical skills
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
