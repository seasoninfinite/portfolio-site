import type { Metadata } from "next";

import { CtaBand, JsonLd, PageHead } from "@/components/site/blocks";
import { DeveloperCodeShowcase } from "@/components/ui/developer-code-showcase";
import { breadcrumbLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "How Websites Work: HTML, CSS & JS",
  description:
    "What is your website actually made of? A plain-English look at HTML, CSS, JavaScript and TypeScript, the code behind every BGG website.",
  alternates: { canonical: "/how-websites-work" },
};

export default function HowWebsitesWorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "How websites work", path: "/how-websites-work" }])} />
      <PageHead
        crumbs={[{ name: "How websites work" }]}
        eyebrow="Behind the scenes"
        title="What is your website made of?"
        lead="Every site I build is hand-written code, not a page builder. Here's a plain-English look at the languages that make it fast, secure and easy to grow."
      />
      <div className="dark section--night">
        <DeveloperCodeShowcase />
      </div>
      <CtaBand />
    </>
  );
}
