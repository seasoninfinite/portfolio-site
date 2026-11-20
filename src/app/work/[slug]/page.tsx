import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBand, JsonLd, PageHead } from "@/components/site/blocks";
import { Devices } from "@/components/site/devices";
import { ArrowUpRight, Check } from "@/components/site/icons";
import { ProjectCard } from "@/components/site/project-card";
import { deviceSrc, getProject, projects } from "@/data/projects";
import { abs, breadcrumbLd } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const kind = "Website Design";
  return {
    title: `${p.name}: ${kind}`,
    description: `${p.summary} See it on laptop, tablet and phone.`.slice(0, 160),
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { images: [{ url: deviceSrc(p.slug, "desktop"), width: 1600, height: 1000, alt: `${p.name} website` }] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const sameCat = projects.filter((x) => x.slug !== p.slug && x.category === p.category);
  const related = (sameCat.length >= 2 ? sameCat : projects.filter((x) => x.slug !== p.slug)).slice(0, 2);
  const linkHref = p.liveUrl ?? p.currentUrl;
  const linkLabel = p.liveUrl
    ? p.kind === "concept"
      ? "View the website"
      : "Visit the live site"
    : p.currentUrl
      ? "See their current site"
      : null;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Work", path: "/work" }, { name: p.name, path: `/work/${p.slug}` }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: `${p.name} website`,
          description: p.summary,
          url: abs(`/work/${p.slug}`),
          image: abs(deviceSrc(p.slug, "desktop")),
          creator: { "@type": "Organization", name: "BGG Website Design", url: abs("/") },
        }}
      />
      <PageHead
        crumbs={[{ name: "Work", href: "/work" }, { name: p.name }]}
        eyebrow={`Website design · ${p.sector}`}
        title={p.name}
        lead={p.summary}
      >
        <div className="hero__actions">
          {linkHref && linkLabel ? (
            <a href={linkHref} className="btn btn--accent" target={p.liveUrl?.startsWith("/") ? undefined : "_blank"} rel="noopener noreferrer">
              {linkLabel} <ArrowUpRight />
            </a>
          ) : null}
          <Link href="/contact" className="btn btn--ghost">
            I want one like this
          </Link>
        </div>
        {p.status ? (
          <p className="muted" style={{ fontSize: 15, marginTop: 14 }}>
            <span className="tag" style={{ marginRight: 8 }}>
              {p.status}
            </span>
            The design shown here is the new one; the link opens the site as it is today.
          </p>
        ) : null}
      </PageHead>

      <section className="wrap">
        <div className="cs-hero-tile" style={{ background: p.tile }}>
          <Devices slug={p.slug} name={p.name} priority sizes="(min-width: 1240px) 1160px, 100vw" />
        </div>
      </section>

      <section className="section">
        <div className="wrap cs-grid">
          <div>
            <dl className="cs-facts">
              {p.client ? (
                <div>
                  <dt>Client</dt>
                  <dd>{p.client}</dd>
                </div>
              ) : null}
              <div>
                <dt>Sector</dt>
                <dd>{p.sector}</dd>
              </div>
              {p.location ? (
                <div>
                  <dt>Location</dt>
                  <dd>{p.location}</dd>
                </div>
              ) : null}
              <div>
                <dt>Built with</dt>
                <dd>Hand-written HTML, CSS &amp; JavaScript. No page builder.</dd>
              </div>
            </dl>
          </div>
          <div className="prose">
            <h2 style={{ marginTop: 0 }}>The brief</h2>
            <p>{p.brief}</p>
            <h2>What I built</h2>
            <ul className="check-list" style={{ margin: "12px 0 0" }}>
              {p.built.map((b) => (
                <li key={b}>
                  <Check />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <h2>The result</h2>
            <p>{p.outcome}</p>
          </div>
        </div>
      </section>

      <section className="section--tight section--white">
        <div className="wrap">
          <p className="eyebrow">Up close</p>
          <h2 className="h3" style={{ margin: "14px 0 26px" }}>
            Desktop and phone, side by side
          </h2>
          <div className="screens">
            <figure className="screen-shot">
              <div className="screen-shot__bar" aria-hidden>
                <i />
                <i />
                <i />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={deviceSrc(p.slug, "desktop")} alt={`${p.name} homepage on a desktop screen`} width={1600} height={1000} loading="lazy" />
            </figure>
            <figure className="screen-shot screen-shot--phone">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={deviceSrc(p.slug, "phone")} alt={`${p.name} homepage on a phone`} width={600} height={1298} loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="section">
          <div className="wrap">
            <div className="sec-head sec-head--split">
              <h2 className="h2">More projects like this</h2>
              <p className="lead">
                <Link href={`/work/${next.slug}`} className="text-link">
                  Next project: {next.name} <ArrowUpRight className="size-4" />
                </Link>
              </p>
            </div>
            <div className="work-grid">
              {related.map((r) => (
                <ProjectCard key={r.slug} project={r} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand title={`Want a website like ${p.name}?`} />
    </>
  );
}
