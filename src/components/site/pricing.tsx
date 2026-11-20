import Link from "next/link";

import { ArrowUpRight, Check, CheckCircle } from "@/components/site/icons";
import { addOns, buildPlans, carePlans, formatGBP } from "@/data/pricing";

export function contactHref(queryLabel: string) {
  return `/contact?plan=${encodeURIComponent(queryLabel)}`;
}

export function PriceCards() {
  return (
    <div className="price-grid">
      {buildPlans.map((p) => (
        <article key={p.id} className={`price-card${p.highlight ? " price-card--hl" : ""}`} data-reveal>
          {p.badge ? <span className={`tag price-card__badge${p.highlight ? " tag--accent" : " tag--client"}`}>{p.badge}</span> : null}
          <h3 className="price-card__name">{p.name}</h3>
          <p className="price-card__tagline">{p.tagline}</p>
          <p className="price-card__price">
            {formatGBP(p.pricePence)} <small>one-off</small>
          </p>
          <p className="price-card__anchor">Agencies charge up to {p.agencyUpTo}</p>
          <p className="price-card__small">
            {`${formatGBP(p.depositPence)} deposit to start · the rest when you're happy`}
          </p>
          <div className="price-card__facts">
            <span className="tag">{p.pages}</span>
            <span className="tag">{p.turnaround}</span>
            <span className="tag">{p.revisions}</span>
          </div>
          <ul className="check-list">
            {p.features.map((f) => (
              <li key={f}>
                <Check />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <p className="price-card__small" style={{ marginBottom: 18 }}>
            <strong style={{ fontWeight: 600 }}>Best for:</strong> {p.bestFor}
          </p>
          <Link
            href={contactHref(p.queryLabel)}
            className={`btn btn--block price-card__cta${p.highlight ? " btn--accent" : ""}`}
          >
            Start my {p.name} site <ArrowUpRight />
          </Link>
        </article>
      ))}
    </div>
  );
}

export function PayNote() {
  return (
    <div className="pay-note">
      <span>
        <CheckCircle /> No VAT to add
      </span>
      <span>
        <CheckCircle /> 50% deposit, the rest only when you&apos;re happy
      </span>
      <span>
        <CheckCircle /> Fixed price, no surprises
      </span>
      <span>
        <CheckCircle /> Secure card payment by Stripe
      </span>
    </div>
  );
}

export function CareCards() {
  return (
    <div className="care-grid">
      {carePlans.map((c) => (
        <article key={c.id} className={`care-card${c.highlight ? " care-card--hl" : ""}`} data-reveal>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
            <h3 className="price-card__name">{c.name}</h3>
            {c.highlight ? <span className="tag tag--accent">Best value</span> : null}
          </div>
          <p className="price-card__tagline" style={{ minHeight: 0 }}>
            {c.tagline}
          </p>
          <p className="price-card__price">
            {formatGBP(c.pricePence)} <small>/ month</small>
          </p>
          <ul className="check-list">
            {c.features.map((f) => (
              <li key={f}>
                <Check />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <p className="price-card__small" style={{ marginTop: 0, marginBottom: 20 }}>
            {c.note}
          </p>
          <Link
            href={contactHref(c.queryLabel)}
            className={`btn btn--block price-card__cta${c.highlight ? " btn--accent" : " btn--ghost"}`}
          >
            Add {c.name} <ArrowUpRight />
          </Link>
        </article>
      ))}
    </div>
  );
}

export function AddOnList() {
  return (
    <div className="addon-list">
      {addOns.map((a) => (
        <div className="addon" key={a.name}>
          <strong>{a.name}</strong>
          <span className="price">{a.price}</span>
          <p>{a.detail}</p>
        </div>
      ))}
    </div>
  );
}
