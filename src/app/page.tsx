import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Faq } from "@/components/site/blocks";
import { ContactWizard } from "@/components/site/contact-wizard";
import { ArrowUpRight, Check, CheckCircle } from "@/components/site/icons";
import { PayNote, PriceCards } from "@/components/site/pricing";
import { PREVIEW_HREF, PreviewOffer } from "@/components/site/offer";
import { PhoneRow } from "@/components/site/phone-row";
import { ProjectCard } from "@/components/site/project-card";
import { ProjectSteps } from "@/components/site/project-steps";
import { Showcase } from "@/components/site/showcase";
import { pricingFaqs } from "@/data/pricing";
import { featuredProjects, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: { absolute: "Web Designer Solihull | Websites Live in Days from £199.99" },
  description:
    "Websites that turn visitors into paying clients. ✓ Live in as little as 3 days ✓ From £199.99, no VAT ✓ Pay the rest when you're happy. Get a free quote →",
  alternates: { canonical: "/" },
};

const showcaseSlugs = ["gh-performance-nutrition", "family-wellbeing-dietitian", "alder-finch-dental", "ask-your-dietitian", "london-dietitian", "fernbrook-landscapes"];

const benefits = [
  {
    title: "Look like the best in your area",
    body: "People judge a website in a fraction of a second. Yours will look premium from the very first pixel, so visitors trust you before they've read a word.",
  },
  {
    title: "Get found on Google",
    body: "Every page is built for search: lightning-fast loading, the right titles and descriptions, a sitemap and Search Console set up on day one.",
  },
  {
    title: "Turn visitors into enquiries",
    body: "Every section leads somewhere: a call, a form, a booking or a payment. No dead ends, no confused visitors, no lost customers.",
  },
  {
    title: "Fast and flawless on every phone",
    body: "Most of your customers will find you on their phone. Hand-written code means no bloated page builders, so your site loads in a blink.",
  },
  {
    title: "Zero tech headaches",
    body: "I handle the hosting, the security, the updates and the changes. You get on with running your business; your website keeps working for you.",
  },
];

export default function Home() {
  const showcase = showcaseSlugs.map((s) => projects.find((p) => p.slug === s)!).filter(Boolean);
  const homeFaqs = pricingFaqs.filter((f) =>
    ["Why are your prices lower than other web designers?", "How do I pay?", "How long does it take?", "Will my website show up on Google?"].includes(f.q)
  );

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero__top">
            <div>
              <span className="pill">
                <span className="pill__dot" aria-hidden /> Taking on new clients now
              </span>
              <h1 className="display hero__title">
                Websites that turn visitors into <span className="underline-swash">paying clients.</span>
              </h1>
            </div>
            <div className="hero__sub">
              <p className="lead mt-0">
                I&apos;m Ben, a web designer in Solihull. I build fast, beautiful, hand-coded websites that make small
                businesses look like the best in town and keep their inbox full of enquiries.
              </p>
              <div>
              <div className="hero__actions">
                <Link href="/contact" className="btn btn--accent">
                  Get my free quote <ArrowUpRight />
                </Link>
                <Link href="/work" className="btn btn--ghost">
                  See the work
                </Link>
              </div>
              <ul className="trust-row">
                <li>
                  <CheckCircle /> From £199.99, no VAT
                </li>
                <li>
                  <CheckCircle /> Live in days, not months
                </li>
                <li>
                  <CheckCircle /> Pay the rest when you&apos;re happy
                </li>
              </ul>
              <p className="hero__nudge">
                Not sure yet?{" "}
                <Link href={PREVIEW_HREF} className="text-link">
                  Get a free 1-page preview of your new site
                </Link>
              </p>
              </div>
            </div>
          </div>
          <Showcase projects={showcase} />
        </div>
      </section>

      {/* CLIENTS */}
      <section className="client-strip" aria-label="Industries">
        <div className="wrap client-strip__inner">
          <span className="client-strip__label">{projects.length} websites built for</span>
          <ul>
            {["Dietitians", "Dentists", "Clinics", "Builders", "Landscapers", "Cafés", "Spas", "Fashion brands", "Logistics", "Tech startups"].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section">
        <div className="wrap benefits">
          <div className="benefits__head" data-reveal>
            <p className="eyebrow">Why it works</p>
            <h2 className="h2" style={{ marginTop: 18 }}>
              Your website should be your hardest-working employee.
            </h2>
            <p className="lead" style={{ marginTop: 20 }}>
              Most small-business websites are a digital business card that nobody sees. Mine are built to be found,
              trusted and acted on, every hour of every day.
            </p>
            <Link href="/pricing" className="btn btn--ghost" style={{ marginTop: 26 }}>
              See what&apos;s included
            </Link>
          </div>
          <ol className="benefit-list">
            {benefits.map((b) => (
              <li key={b.title} data-reveal>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WORK */}
      <section className="section section--white" id="work">
        <div className="wrap">
          <div className="sec-head sec-head--split">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="h2" style={{ marginTop: 18 }}>
                Built to win work. Every one designed from scratch.
              </h2>
            </div>
            <p className="lead">
              From dietitians and dentists to landscapers and cafés: every site is designed around the business and
              the people it needs to win over. No templates, ever.
            </p>
          </div>
          <div className="work-grid">
            {featuredProjects.slice(0, 6).map((p, n) => (
              <ProjectCard key={p.slug} project={p} wide={n === 0 || n === 5} />
            ))}
          </div>
          <div className="center" style={{ marginTop: 48 }}>
            <Link href="/work" className="btn">
              See all {projects.length} projects <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>

      <PreviewOffer />

      {/* NICHE */}
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="niche" data-reveal>
            <div>
              <p className="eyebrow">Health &amp; wellness</p>
              <h2 className="h2" style={{ marginTop: 18 }}>
                Websites that fill practitioners&apos; diaries.
              </h2>
              <p className="lead" style={{ marginTop: 18 }}>
                Dietitians, clinics, dentists and therapists: I know what your clients search for, the trust signals
                they look for and how to turn a nervous visitor into a booked consultation.
              </p>
              <ul className="niche__list">
                {[
                  "HCPC and BDA credentials shown where they build trust",
                  "Discovery-call booking on every page",
                  "Sell guides, webinars and meal plans with secure downloads",
                  "Articles that rank for the questions your clients Google",
                ].map((t) => (
                  <li key={t}>
                    <Check /> {t}
                  </li>
                ))}
              </ul>
              <Link href="/work" className="btn">
                See the health &amp; wellness work <ArrowUpRight />
              </Link>
            </div>
            <PhoneRow />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section section--paper2" id="pricing">
        <div className="wrap">
          <div className="sec-head center" style={{ justifyItems: "center" }}>
            <p className="eyebrow">Simple, fixed pricing</p>
            <h2 className="h2">Agency quality. A fraction of the agency price.</h2>
            <p className="lead">
              Many UK agencies charge £1,000+ for a small-business website. You get the same hand-coded quality,
              with a fixed price agreed up front.
            </p>
          </div>
          <PriceCards />
          <PayNote />
          <p className="center" style={{ marginTop: 24 }}>
            <Link href="/pricing" className="text-link">
              Compare packages, care plans and add-ons <ArrowUpRight className="size-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section" id="process">
        <div className="wrap steps">
          <div data-reveal>
            <p className="eyebrow">How it works</p>
            <h2 className="h2" style={{ marginTop: 18 }}>
              From your first answers to a site on your domain.
            </h2>
            <p className="lead" style={{ marginTop: 20 }}>
              No jargon, no endless meetings. Here&apos;s exactly what happens when you hire me, in plain English. Tap
              through each step.
            </p>
          </div>
          <ProjectSteps />
        </div>
      </section>

      {/* ABOUT */}
      <section className="section section--white">
        <div className="wrap about">
          <div className="about__photo" data-reveal>
            <Image src="/about/ben.png" alt="Ben, founder of BGG Website Design" fill sizes="(min-width: 900px) 440px, 100vw" />
            <div className="about__badge">
              <strong>Ben · BGG Website Design</strong>
              Web designer &amp; developer, Solihull
            </div>
          </div>
          <div data-reveal>
            <p className="eyebrow">Who you&apos;ll work with</p>
            <h2 className="h2" style={{ marginTop: 18 }}>
              One designer. Your whole website. No middlemen.
            </h2>
            <div className="stack" style={{ marginTop: 20 }}>
              <p className="lead">
                I&apos;m 15, and I&apos;ve been designing and coding websites for over two years. You deal with me
                directly, from the first message to launch day and beyond.
              </p>
              <p className="muted">
                No account managers, no offices, no agency overheads. That&apos;s why my prices are lower. The quality
                isn&apos;t: every site is hand-written, tested on real phones and built to bring in business.
              </p>
            </div>
            <div className="facts">
              <div>
                <b>{projects.length}</b>
                <span>websites designed &amp; built</span>
              </div>
              <div>
                <b>10+</b>
                <span>industries</span>
              </div>
              <div>
                <b>£0</b>
                <span>VAT to add</span>
              </div>
              <div>
                <b>1 day</b>
                <span>reply time</span>
              </div>
            </div>
            <Link href="/about" className="text-link" style={{ marginTop: 24 }}>
              More about me <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="section--tight">
        <div className="wrap">
          <figure className="quote" data-reveal>
            <blockquote>
              &ldquo;I am beyond chuffed with my new website. Not only is it modern and sleek but it also perfectly
              showcases what I can do for my clients. Ben took initiative and did some research to understand my
              requirements.&rdquo;
            </blockquote>
            <figcaption>
              <strong>CJ, CJG Medical Services</strong>
              Occupational health ·{" "}
              <Link href="/work/cjg-medical-services" style={{ textDecorationThickness: 2 }}>
                See the site
              </Link>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="wrap wrap--narrow">
          <p className="eyebrow">Questions</p>
          <h2 className="h2" style={{ margin: "18px 0 32px" }}>
            Good questions, straight answers.
          </h2>
          <Faq items={homeFaqs} />
          <p style={{ marginTop: 24 }}>
            <Link href="/pricing#faq" className="text-link">
              More answers on the pricing page <ArrowUpRight className="size-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section section--paper2" id="contact">
        <div className="wrap wrap--narrow">
          <div className="sec-head center" style={{ justifyItems: "center" }}>
            <p className="eyebrow">Let&apos;s start</p>
            <h2 className="h2">Let&apos;s build your website.</h2>
            <p className="lead">
              Pick what you need, tell me about your business and I&apos;ll reply within one working day. Ready to go?
              Pay your deposit and you&apos;re booked in.
            </p>
          </div>
          <ContactWizard />
        </div>
      </section>
    </>
  );
}
