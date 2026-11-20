import type { Metadata } from "next";

import { CtaBand, JsonLd, PageHead } from "@/components/site/blocks";
import { Skills } from "@/components/ui/skills-showcase";
import { breadcrumbLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Web Design Skills & Expertise",
  description:
    "The technical skills behind every BGG website: HTML, CSS, JavaScript, TypeScript, React and more, used to build fast, modern sites for small businesses.",
  alternates: { canonical: "/expertise" },
};

export default function ExpertisePage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Expertise", path: "/expertise" }])} />
      <PageHead
        crumbs={[{ name: "About", href: "/about" }, { name: "Expertise" }]}
        eyebrow="My expertise"
        title="Where I'm strongest."
        lead="A quick look at how comfortable I am with the code behind your website. Hover or tap each row to see the bar fill in."
      />
      <section className="dark section section--night" style={{ borderRadius: 0 }}>
        <div className="wrap">
          <Skills showHeader={false} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
