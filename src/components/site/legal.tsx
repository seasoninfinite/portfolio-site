import Link from "next/link";

/** Shared layout pieces for the Terms and Privacy pages. */

export function Sec({ id, n, title, children }: { id: string; n: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="legal-sec" aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`}>
        <span className="legal-sec__n">{n}</span> {title}
      </h2>
      {children}
    </section>
  );
}

export function Toc({ items }: { items: { id: string; n: string; title: string }[] }) {
  return (
    <nav className="legal-toc" aria-label="Contents">
      <p className="eyebrow">Contents</p>
      <ol>
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`}>
              <span>{i.n}</span> {i.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Summary({ children }: { children: React.ReactNode }) {
  return (
    <aside className="legal-summary">
      <p className="eyebrow">The short version</p>
      {children}
      <p className="legal-summary__note">
        This summary is here to help. The numbered terms below are what legally apply. If anything is unclear, email
        me before you buy and I&apos;ll explain it in plain English.
      </p>
    </aside>
  );
}

export function LegalFoot({ other }: { other: { href: string; label: string } }) {
  return (
    <p className="legal-foot">
      See also: <Link href={other.href}>{other.label}</Link>. You can print or save this page as a PDF from your
      browser for your records.
    </p>
  );
}
