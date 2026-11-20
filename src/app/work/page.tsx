import type { Metadata } from "next";

import { JsonLd, PageHead } from "@/components/site/blocks";
import { PreviewOffer } from "@/components/site/offer";
import { WorkFilter } from "@/components/site/work-filter";
import { projects } from "@/data/projects";
import { abs, breadcrumbLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Web Design Portfolio",
  description:
    "Websites designed and hand-coded by BGG Website Design for dietitians, clinics, dentists, landscapers, cafés and more, shown on laptop, tablet and phone.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Work", path: "/work" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Web design portfolio",
          url: abs("/work"),
          hasPart: projects.map((p) => ({ "@type": "CreativeWork", name: p.name, url: abs(`/work/${p.slug}`) })),
        }}
      />
      <PageHead
        crumbs={[{ name: "Work" }]}
        eyebrow="Portfolio"
        title="Websites that make businesses look their best."
        lead="Every project here was designed and hand-coded from a blank page. Tap any one to see the full story, on every screen size."
      />
      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <WorkFilter projects={projects} />
        </div>
      </section>
      <PreviewOffer title="Want your business to look this good? See it free first." />
    </>
  );
}
