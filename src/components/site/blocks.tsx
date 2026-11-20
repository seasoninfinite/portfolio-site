import Link from "next/link";

import { ArrowUpRight } from "@/components/site/icons";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function PageHead({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
}: {
  crumbs: { name: string; href?: string }[];
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="page-head wrap">
      <nav aria-label="Breadcrumb">
        <ol className="crumbs">
          <li>
            <Link href="/">Home</Link>
          </li>
          {crumbs.map((c) => (
            <li key={c.name}>{c.href ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}</li>
          ))}
        </ol>
      </nav>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="h1" style={{ marginTop: eyebrow ? 18 : 0, maxWidth: "16ch" }}>
        {title}
      </h1>
      {lead ? (
        <p className="lead" style={{ marginTop: 22 }}>
          {lead}
        </p>
      ) : null}
      {children}
    </header>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({
  title = "Ready for a website that actually brings in work?",
  lead = "Tell me about your business and I'll come back within one working day with a fixed price and a plan. Not sure yet? Grab a free 1-page preview and see your new homepage before you pay a penny.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="section--tight">
      <div className="wrap">
        <div className="cta-band" data-reveal>
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 className="h2">{title}</h2>
            <p className="lead" style={{ marginTop: 18 }}>
              {lead}
            </p>
          </div>
          <div className="cta-band__actions">
            <Link href="/contact" className="btn btn--accent">
              Get my free quote <ArrowUpRight />
            </Link>
            <Link href="/contact?plan=Free%20Design%20Preview" className="btn btn--ghost">
              Free 1-page preview
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
