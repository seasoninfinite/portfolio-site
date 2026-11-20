import Link from "next/link";

import { FooterEmailComposer } from "@/components/site/footer-email-composer";
import { featuredProjects } from "@/data/projects";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p className="footer-big">
          <Link href="/contact">Let&apos;s build yours →</Link>
        </p>

        <div className="footer-grid">
          <div className="footer-about">
            <h2>BGG Website Design</h2>
            <p>
              Fast, modern, hand-coded websites for small businesses and practitioners. Based in Solihull, working
              with clients across the West Midlands and the whole of the UK.
            </p>
            <p>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
            <FooterEmailComposer />
          </div>

          <div>
            <h2>Services</h2>
            <ul>
              <li>
                <Link href="/pricing">Website packages</Link>
              </li>
              <li>
                <Link href="/pricing#care">Website care plans</Link>
              </li>
              <li>
                <Link href="/web-design-solihull">Web design in Solihull</Link>
              </li>
              <li>
                <Link href="/work">Portfolio</Link>
              </li>
              <li>
                <Link href="/how-much-does-a-website-cost">How much does a website cost?</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2>Work</h2>
            <ul>
              {featuredProjects.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link href={`/work/${p.slug}`}>{p.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/work">All projects</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2>Studio</h2>
            <ul>
              <li>
                <Link href="/about">About Ben</Link>
              </li>
              <li>
                <Link href="/#process">How it works</Link>
              </li>
              <li>
                <Link href="/expertise">Expertise</Link>
              </li>
              <li>
                <Link href="/how-websites-work">How websites work</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <a href={SITE.termsUrl} target="_blank" rel="noopener noreferrer">
                  Terms &amp; conditions (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} BGG Website Design. All rights reserved.</span>
          <span>Web design in Solihull, Birmingham &amp; across the UK</span>
        </div>
      </div>
    </footer>
  );
}
