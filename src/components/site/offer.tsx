import Link from "next/link";

import { ArrowUpRight } from "@/components/site/icons";

export const PREVIEW_HREF = "/contact?plan=Free%20Design%20Preview";

/** The free 1-page design preview offer, used across the site. */
export function PreviewOffer({ title = "See your new homepage before you spend a penny." }: { title?: string }) {
  return (
    <section className="section--tight">
      <div className="wrap">
        <div className="offer" data-reveal>
          <div>
            <p className="eyebrow">Free 1-page preview</p>
            <h2>{title}</h2>
            <p>
              Tell me about your business and I&apos;ll design a preview of your new homepage, completely free. Love
              it? We build the rest. Don&apos;t? You&apos;ve lost nothing.
            </p>
            <ul className="offer__steps">
              <li>No card needed</li>
              <li>No obligation</li>
              <li>Ready in days</li>
            </ul>
          </div>
          <Link href={PREVIEW_HREF} className="btn">
            Claim my free preview <ArrowUpRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
