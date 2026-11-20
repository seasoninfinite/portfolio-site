import Link from "next/link";

import { ArrowUpRight } from "@/components/site/icons";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap wrap--narrow center">
        <p className="eyebrow">404</p>
        <h1 className="h1" style={{ margin: "18px auto 20px", maxWidth: "14ch" }}>
          This page has wandered off.
        </h1>
        <p className="lead" style={{ margin: "0 auto 28px" }}>
          The link might be old, or the page has moved. Everything you need is one click away.
        </p>
        <div className="hero__actions" style={{ justifyContent: "center" }}>
          <Link href="/" className="btn btn--accent">
            Back to home <ArrowUpRight />
          </Link>
          <Link href="/work" className="btn btn--ghost">
            See the work
          </Link>
        </div>
      </div>
    </section>
  );
}
