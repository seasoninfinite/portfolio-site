import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand, JsonLd, PageHead } from "@/components/site/blocks";
import { abs, breadcrumbLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "How Much Does a Website Cost UK? (2026)",
  description:
    "What a small-business website really costs in the UK in 2026: DIY builders, freelancers and agencies compared, plus hosting, care plans and hidden costs.",
  alternates: { canonical: "/how-much-does-a-website-cost" },
  openGraph: { type: "article" },
};

const PUBLISHED = "2026-11-20";

export default function CostGuide() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "How much does a website cost?", path: "/how-much-does-a-website-cost" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How much does a website cost in the UK? (2026 guide)",
          datePublished: PUBLISHED,
          dateModified: PUBLISHED,
          author: { "@type": "Person", name: "Ben", url: abs("/about") },
          publisher: { "@type": "Organization", name: "BGG Website Design", url: abs("/") },
          mainEntityOfPage: abs("/how-much-does-a-website-cost"),
        }}
      />
      <PageHead
        crumbs={[{ name: "How much does a website cost?" }]}
        eyebrow="Guide · Updated November 2026"
        title="How much does a website cost in the UK?"
        lead="The honest answer is anywhere from £0 to £10,000+. Here's what you actually get at each price, what to watch out for, and how to work out what your business needs."
      />
      <article className="wrap wrap--narrow prose" style={{ paddingBottom: 40 }}>
        <p>
          <strong>Short answer:</strong> most UK small businesses pay between <strong>£400 and £1,500</strong> for a
          professionally built brochure website from a freelancer, and <strong>£1,500 to £5,000+</strong> from an
          agency. On top of that, expect to pay something every month to keep it online, from about £10 for hosting
          to £50–£100+ for a plan that includes regular changes.
        </p>

        <h2>Website costs at a glance</h2>
        <table>
          <thead>
            <tr>
              <th>Option</th>
              <th>Typical upfront cost</th>
              <th>Monthly cost</th>
              <th>Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DIY builder (Wix, Squarespace)</td>
              <td>£0, plus your time</td>
              <td>£10–£40</td>
              <td>Very tight budgets, if you&apos;re confident with design</td>
            </tr>
            <tr>
              <td>Budget freelancer / marketplace</td>
              <td>£80–£400</td>
              <td>Varies</td>
              <td>Simple one-page sites; quality is hit and miss</td>
            </tr>
            <tr>
              <td>Professional freelancer</td>
              <td>£400–£1,500</td>
              <td>£10–£65</td>
              <td>Most small businesses and practitioners</td>
            </tr>
            <tr>
              <td>Agency</td>
              <td>£1,500–£10,000+</td>
              <td>£50–£300+</td>
              <td>Larger firms, complex shops and custom systems</td>
            </tr>
          </tbody>
        </table>
        <p>
          These ranges come from comparing the published price lists of UK freelancers and agencies in 2026. Prices
          vary a lot by region and by how much is included, so always check what&apos;s in the package.
        </p>

        <h2>What pushes the price up?</h2>
        <ul>
          <li>
            <strong>Number of pages.</strong> A 3-page site is far quicker to design than a 10-page one. Extra pages
            typically cost £50–£225 each.
          </li>
          <li>
            <strong>Custom design vs templates.</strong> A template is cheaper up front, but your site will look like
            thousands of others. Custom design costs more and makes you stand out.
          </li>
          <li>
            <strong>Selling online.</strong> Shops, bookings and paid downloads add work: expect £150–£500+ on top.
          </li>
          <li>
            <strong>Copywriting.</strong> If someone writes your words for you, budget £40–£200 per page.
          </li>
          <li>
            <strong>SEO setup.</strong> Basic search setup should be included. Full local SEO campaigns are a
            separate, ongoing cost.
          </li>
        </ul>

        <h2>The hidden costs to watch for</h2>
        <ul>
          <li>
            <strong>VAT.</strong> Many agencies quote prices &ldquo;+VAT&rdquo;, adding 20% to the bill.
          </li>
          <li>
            <strong>Renting instead of owning.</strong> Some &ldquo;£0 upfront&rdquo; deals charge £50–£130 a month
            on a 12-month minimum, and you never own the site.
          </li>
          <li>
            <strong>Plugin and theme renewals.</strong> WordPress sites often rely on paid plugins that renew every
            year and need updating to stay secure.
          </li>
          <li>
            <strong>Your domain.</strong> Make sure it&apos;s registered in your name. It usually costs £10–£15 a
            year.
          </li>
          <li>
            <strong>Changes after launch.</strong> Ad-hoc edits are often charged at £25–£75 an hour. A care plan is
            usually cheaper if you update your site regularly.
          </li>
        </ul>

        <h2>How to pay: deposits and payment terms</h2>
        <p>
          A 50% deposit up front and 50% on completion is standard practice in the UK. Be wary of anyone asking for
          the full amount before they&apos;ve started, and make sure you see the finished site before the final
          payment.
        </p>

        <h2>What I charge</h2>
        <p>
          I&apos;m an independent designer with no agency overheads, so my prices sit at the very affordable end of
          the professional range, without the quality dropping:
        </p>
        <ul>
          <li>
            <strong>Starter: £199.99</strong> for up to 3 pages, live in 3 days
          </li>
          <li>
            <strong>Growth: £349.99</strong> for up to 6 pages with local SEO, booking or enquiry forms and
            animations
          </li>
          <li>
            <strong>Premium: £499.99</strong> for up to 10 pages with a blog, online payments and advanced SEO, live in 10 days or less
          </li>
          <li>
            <strong>Care plans</strong> from £10 a month (hosting, security, backups), or £25 a month with up to 5
            changes
          </li>
        </ul>
        <p>
          No VAT to add, a 50% deposit and the rest only when you&apos;re happy. <Link href="/pricing">See full
          pricing</Link> or <Link href="/contact">ask for a free quote</Link>.
        </p>
      </article>
      <CtaBand title="Get a fixed price for your website." />
    </>
  );
}
