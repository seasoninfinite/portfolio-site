import type { Metadata } from "next";
import { Suspense } from "react";

import { JsonLd, PageHead } from "@/components/site/blocks";
import { ContactWizard } from "@/components/site/contact-wizard";
import { CheckCircle, Mail } from "@/components/site/icons";
import { SITE, breadcrumbLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Free Website Quote",
  description:
    "Get a free, fixed-price website quote. Tell me about your business and I'll reply within one working day, or book your build with a 50% deposit.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Contact", path: "/contact" }])} />
      <PageHead
        crumbs={[{ name: "Contact" }]}
        eyebrow="Free quote"
        title="Let's build your website."
        lead="Pick what you need and tell me a little about your business. I'll come back within one working day with a fixed price and a plan, with no obligation and no hard sell."
      />
      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap cs-grid" style={{ alignItems: "start" }}>
          <aside style={{ display: "grid", gap: 22 }}>
            <ul className="niche__list" style={{ margin: 0 }}>
              {[
                "A reply from me (not a bot) within one working day",
                "A fixed price before you commit to anything",
                "Free design preview available: see it before you pay",
                "50% deposit, the rest only when you're happy",
              ].map((t) => (
                <li key={t}>
                  <CheckCircle /> {t}
                </li>
              ))}
            </ul>
            <div className="summary-box">
              <p style={{ margin: 0, fontWeight: 600 }}>Prefer email?</p>
              <a href={`mailto:${SITE.email}`} className="text-link" style={{ marginTop: 6 }}>
                <Mail className="size-4" /> {SITE.email}
              </a>
            </div>
          </aside>
          <Suspense>
            <ContactWizard />
          </Suspense>
        </div>
      </section>
    </>
  );
}
