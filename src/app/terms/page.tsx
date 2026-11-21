import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd, PageHead } from "@/components/site/blocks";
import { LegalFoot, Sec, Summary, Toc } from "@/components/site/legal";
import { buildPlans, carePlans, formatGBP } from "@/data/pricing";
import { SITE, breadcrumbLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms for BGG Website Design's website design, build, hosting and care plan services, and for using this website. Plain English, UK law.",
  alternates: { canonical: "/terms" },
};

const L = SITE.legal;
const E = SITE.email;

const TOC = [
  { id: "about", n: "1", title: "About us and these terms" },
  { id: "definitions", n: "2", title: "Words we use" },
  { id: "who", n: "3", title: "Who can buy from us" },
  { id: "contract", n: "4", title: "How our contract is formed" },
  { id: "services", n: "5", title: "Our services and packages" },
  { id: "payment", n: "6", title: "Prices and payment" },
  { id: "process", n: "7", title: "The project process and timescales" },
  { id: "your-part", n: "8", title: "Your responsibilities" },
  { id: "content-rules", n: "9", title: "Content we won't publish" },
  { id: "revisions", n: "10", title: "Revisions" },
  { id: "scope", n: "11", title: "Extra work and change requests" },
  { id: "approval", n: "12", title: "Approval, launch and snagging" },
  { id: "domains", n: "13", title: "Domains, hosting and email" },
  { id: "care", n: "14", title: "Care plans" },
  { id: "preview", n: "15", title: "The free design preview" },
  { id: "third-party", n: "16", title: "Third-party services" },
  { id: "ip", n: "17", title: "Who owns what (intellectual property)" },
  { id: "portfolio", n: "18", title: "Portfolio, credits and testimonials" },
  { id: "results", n: "19", title: "SEO, performance and results" },
  { id: "security", n: "20", title: "Security, backups and availability" },
  { id: "compliance", n: "21", title: "Your website's legal compliance" },
  { id: "ecommerce", n: "22", title: "Shops, bookings and payments on your site" },
  { id: "data", n: "23", title: "Data protection" },
  { id: "confidentiality", n: "24", title: "Confidentiality" },
  { id: "cancel-consumer", n: "25", title: "Your right to cancel (consumers)" },
  { id: "ending", n: "26", title: "Ending the contract" },
  { id: "refunds", n: "27", title: "Refunds" },
  { id: "liability-consumer", n: "28", title: "Our responsibility to consumers" },
  { id: "liability-business", n: "29", title: "Our responsibility to businesses" },
  { id: "indemnity", n: "30", title: "Your indemnity (businesses)" },
  { id: "force-majeure", n: "31", title: "Events outside our control" },
  { id: "complaints", n: "32", title: "Complaints" },
  { id: "changes", n: "33", title: "Changes to these terms" },
  { id: "who-works", n: "34", title: "Who does the work" },
  { id: "general", n: "35", title: "General legal terms" },
  { id: "law", n: "36", title: "Governing law and courts" },
  { id: "website-use", n: "37", title: "Using this website" },
  { id: "cancellation-form", n: "S1", title: "Schedule 1: Model cancellation form" },
  { id: "dpa", n: "S2", title: "Schedule 2: Data processing terms" },
];

export default function TermsPage() {
  const [starter, growth, premium] = buildPlans;
  const [essential, priority] = carePlans;
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Terms & conditions", path: "/terms" }])} />
      <PageHead
        crumbs={[{ name: "Terms & conditions" }]}
        eyebrow={`Last updated ${L.termsUpdated}`}
        title="Terms & conditions"
        lead="These terms cover every website, care plan, add-on and free preview from BGG Website Design, and your use of this website. They're written to be read, not to trip you up."
      />

      <div className="wrap legal">
        <Toc items={TOC} />

        <article className="prose legal-body">
          <Summary>
            <ul>
              <li>
                You pay a <strong>50% deposit</strong> to start and the <strong>rest before your site goes live</strong>
                , once you&apos;ve seen it and you&apos;re happy.
              </li>
              <li>
                Prices are fixed and there&apos;s <strong>no VAT</strong> to add. Anything extra is quoted and agreed in
                writing before I do it.
              </li>
              <li>
                Once you&apos;ve paid in full, <strong>you own your website&apos;s design and code</strong>. Your domain is
                always registered in <strong>your</strong> name.
              </li>
              <li>
                Timescales start when I have your content. If you go quiet for 14 days the project pauses; after 60
                days it may close.
              </li>
              <li>
                Care plans are monthly. <strong>Cancel any time with 30 days&apos; notice.</strong>
              </li>
              <li>
                If you&apos;re a consumer (buying for yourself, not a business) you have a{" "}
                <strong>14-day right to cancel</strong>. Your other legal rights are never affected by these terms.
              </li>
              <li>The free design preview is free. No card, no contract, no obligation.</li>
            </ul>
          </Summary>

          <Sec id="about" n="1" title="About us and these terms">
            <p>
              1.1 BGG Website Design (&ldquo;<strong>BGG</strong>&rdquo;, &ldquo;<strong>we</strong>&rdquo;, &ldquo;
              <strong>us</strong>&rdquo;, &ldquo;<strong>our</strong>&rdquo;) is a trading name of {L.ownerName}, a sole
              trader based in Solihull, West Midlands, England. Our address for legal notices is {L.address}.
            </p>
            <p>
              1.2 You can contact us by email at <a href={`mailto:${E}`}>{E}</a>. We aim to reply within one working
              day (Monday to Friday, excluding UK bank holidays).
            </p>
            <p>
              1.3 We are not registered for VAT, so no VAT is added to our prices. If that changes, we will tell you
              before it affects anything you have already agreed to.
            </p>
            <p>
              1.4 These terms apply to every service we provide: website design and build packages, add-ons, custom
              quotes, care plans, hosting, the free design preview and any other work we agree to do for you. Part 37
              also sets the rules for using this website. Please read them before you place an order. When you tick
              the box to accept these terms, pay a deposit or ask us to start work, you are agreeing to them.
            </p>
            <p>
              1.5 If anything in a written quote, proposal or email we send you for your specific project differs from
              these terms, the specific document wins for that project, as long as we have both agreed to it in
              writing.
            </p>
          </Sec>

          <Sec id="definitions" n="2" title="Words we use">
            <ul>
              <li>
                <strong>&ldquo;You&rdquo;</strong> means the person or business buying from us. If you are buying for a
                business, &ldquo;you&rdquo; includes that business.
              </li>
              <li>
                <strong>&ldquo;Consumer&rdquo;</strong> means an individual buying wholly or mainly for purposes outside
                their trade, business, craft or profession. <strong>&ldquo;Business customer&rdquo;</strong> means
                anyone who is not a consumer, including sole traders buying for their business.
              </li>
              <li>
                <strong>&ldquo;Project&rdquo;</strong> means the website design and build work described in the package
                or quote you buy.
              </li>
              <li>
                <strong>&ldquo;Website&rdquo;</strong> means the website we design and build for you, including its
                design, code, layout and any files we create for it.
              </li>
              <li>
                <strong>&ldquo;Your Content&rdquo;</strong> means anything you give us or ask us to use: text, photos,
                logos, videos, documents, data, product details, prices and log-ins.
              </li>
              <li>
                <strong>&ldquo;Working day&rdquo;</strong> means Monday to Friday, excluding bank holidays in England.
              </li>
              <li>
                <strong>&ldquo;In writing&rdquo;</strong> includes email.
              </li>
            </ul>
          </Sec>

          <Sec id="who" n="3" title="Who can buy from us">
            <p>
              3.1 You must be at least 18 years old and able to enter into a binding contract. If you are buying for a
              business or organisation, you confirm that you are authorised to agree to these terms on its behalf.
            </p>
            <p>
              3.2 We may decline any order or enquiry without giving a reason, for example if we don&apos;t have
              capacity, the project is outside what we do, or the content would break Part 9.
            </p>
          </Sec>

          <Sec id="contract" n="4" title="How our contract is formed">
            <p>
              4.1 Prices, packages and timescales on our website are an invitation for you to order, not a binding
              offer. A contract between us is formed when either: (a) you pay a deposit or subscription through our
              secure checkout and we confirm your order by email; or (b) you accept a written quote from us and we
              confirm in writing that we will go ahead.
            </p>
            <p>
              4.2 If you contact us through the enquiry form, ask for a quote or request a free design preview, no
              contract is formed and you are under no obligation to buy.
            </p>
            <p>
              4.3 If we spot an obvious error in a price or description before we confirm your order, we will contact
              you. You can then go ahead at the correct price or cancel and receive a full refund.
            </p>
            <p>
              4.4 Our contract with you is made up of: these terms, the package or add-on description on our website
              (or our written quote) at the time you order, and anything else we both agree in writing.
            </p>
          </Sec>

          <Sec id="services" n="5" title="Our services and packages">
            <p>
              5.1 <strong>Website packages.</strong> We offer the following one-off packages. What&apos;s included in
              each is exactly what is listed on our <Link href="/pricing">pricing page</Link> on the date you order:
            </p>
            <table>
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Price</th>
                  <th>Pages</th>
                  <th>Rounds of changes</th>
                  <th>Typical time to launch</th>
                </tr>
              </thead>
              <tbody>
                {[starter, growth, premium].map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{formatGBP(p.pricePence)}</td>
                    <td>{p.pages.replace("Up to", "up to")}</td>
                    <td>{p.revisions.replace(" rounds of changes", "")}</td>
                    <td>{p.turnaround.replace("Live in ", "")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              5.2 <strong>Pages.</strong> A &ldquo;page&rdquo; is one unique page layout reachable by its own web
              address (for example Home, About, Services, Contact). Individual blog posts, product pages generated
              from the same template, and legal pages using a standard template count as one page between them unless
              we agree otherwise.
            </p>
            <p>
              5.3 <strong>Care plans</strong> ({essential.name} at {formatGBP(essential.pricePence)} a month and{" "}
              {priority.name} at {formatGBP(priority.pricePence)} a month) are described in Part 14.
            </p>
            <p>
              5.4 <strong>Add-ons and custom work</strong> (for example extra pages, online shops, booking systems,
              copywriting, logo design, Google Business Profile setup and rush delivery) are charged at the prices on
              our pricing page or in our written quote.
            </p>
            <p>
              5.5 Anything not listed in your package, add-on or quote is not included. If you are unsure whether
              something is included, ask us before you order and we will confirm in writing.
            </p>
            <p>
              5.6 We will provide our services with reasonable care and skill, using up-to-date techniques, and build
              your website to work on current versions of the major browsers (Chrome, Safari, Edge and Firefox) on
              phones, tablets and computers. We do not guarantee the website will work on outdated or unsupported
              browsers or devices.
            </p>
          </Sec>

          <Sec id="payment" n="6" title="Prices and payment">
            <p>
              6.1 All prices are in pounds sterling (GBP). No VAT is charged (see 1.3).
            </p>
            <p>
              6.2 <strong>Website packages:</strong> you pay a <strong>50% deposit</strong> when you order. We start
              work once the deposit has cleared. The <strong>remaining 50%</strong> is due once we have shown you the
              finished website for approval and <strong>before it is launched</strong> on your domain or handed over to
              you.
            </p>
            <p>
              6.3 <strong>Custom quotes and add-ons</strong> are paid on the terms in the quote. If the quote
              doesn&apos;t say, the same 50% / 50% split applies. Work over £1,000 may be split into stages.
            </p>
            <p>
              6.4 <strong>Care plans</strong> are paid monthly in advance by card through Stripe, starting on the day
              you subscribe (or on the launch date if we agree that), and on the same date each month after that.
            </p>
            <p>
              6.5 Card payments are processed securely by Stripe. We never see or store your full card details.
              Invoices we send are payable within 14 days of the invoice date unless the invoice says otherwise.
            </p>
            <p>
              6.6 <strong>Late payment (business customers).</strong> If a business customer pays late, we may charge
              statutory interest and fixed compensation under the Late Payment of Commercial Debts (Interest) Act 1998
              (currently 8% a year above the Bank of England base rate, plus £40, £70 or £100 depending on the size of
              the debt), and recover reasonable costs of collecting the debt.
            </p>
            <p>
              6.7 <strong>Late payment (all customers).</strong> If any payment is more than 14 days overdue, we will
              remind you in writing. If it is still unpaid 7 days after that reminder, we may pause work, delay the
              launch, or (for care plans) suspend hosting and services until the account is paid. We will always warn
              you before taking a website offline.
            </p>
            <p>
              6.8 <strong>Chargebacks.</strong> If you have a problem with a payment, please contact us first and we
              will put it right. If you raise a chargeback or payment dispute for a charge that was properly due, we
              may suspend services and recover the amount owed, plus any fees the card provider charges us. This does
              not affect your rights if a payment was taken in error or without authority.
            </p>
            <p>
              6.9 We may change our published prices at any time, but price changes will not affect any project you
              have already paid a deposit for. Care plan price changes are covered in 14.11.
            </p>
          </Sec>

          <Sec id="process" n="7" title="The project process and timescales">
            <p>7.1 A typical project runs like this:</p>
            <ol>
              <li>You fill in our short project form telling us about your business, the pages you need and the style you like.</li>
              <li>We design and build the first version of your website and send you a private preview link.</li>
              <li>You send us your content (text, photos, logo and anything else) and your feedback.</li>
              <li>We add your content, polish the design and make the rounds of changes included in your package.</li>
              <li>You approve the website and pay the balance.</li>
              <li>We connect your domain and launch your website.</li>
            </ol>
            <p>
              7.2 <strong>Timescales.</strong> The launch times on our website (for example &ldquo;Live in 3
              days&rdquo;) are good-faith estimates for a typical project. They run from the date we have received
              your deposit <strong>and</strong> all the content and information we need. They do not include time
              spent waiting for your feedback, approvals, content, log-ins or payments, or for third parties (such as
              domain registrars). Time is not of the essence unless we agree a fixed deadline in writing.
            </p>
            <p>
              7.3 If you need your website by a particular date, tell us before you order. We will only commit to a
              fixed deadline if we confirm it in writing. Rush delivery is available as a paid add-on.
            </p>
            <p>
              7.4 <strong>If you go quiet.</strong> Projects need your input. If we don&apos;t hear from you for 14
              days after we have asked for content, feedback or approval, we may pause your project and move on to
              other work. We will tell you when this happens. Restarting a paused project depends on our availability
              and may move your launch date.
            </p>
            <p>
              7.5 If a project has been paused for 60 days and you haven&apos;t responded to at least two reminders, we
              may close it. If we do, we will keep the part of your deposit that reflects the work done so far and
              refund any balance of the deposit that relates to work not done. If you want to restart a closed
              project later, we may charge a reasonable restart fee, which we will agree with you first.
            </p>
          </Sec>

          <Sec id="your-part" n="8" title="Your responsibilities">
            <p>To keep your project on track, you agree to:</p>
            <ul>
              <li>give us accurate, complete information and supply your content in a usable format, on time;</li>
              <li>
                make sure you own, or have permission to use, all of Your Content (including photos, logos, fonts,
                music, videos, reviews and testimonials), and that it doesn&apos;t infringe anyone else&apos;s rights;
              </li>
              <li>
                make sure Your Content is true, lawful and not misleading, including any claims about your products,
                services, qualifications, prices and results;
              </li>
              <li>review previews and reply to our questions within a reasonable time;</li>
              <li>
                give us any log-ins we need (for example your domain registrar) and keep your own passwords secure;
              </li>
              <li>keep your own copies of Your Content. We are not a backup service for your original files;</li>
              <li>name one person who can give us instructions and approvals for your business; and</li>
              <li>treat us courteously. We may end the contract if you or your staff are abusive or threatening.</li>
            </ul>
            <p>
              8.2 We will rely on Your Content as you supply it. We will fix obvious typing errors if we spot them, but
              we are not responsible for checking that Your Content is accurate, legal or complete.
            </p>
            <p>
              8.3 If we use stock photos, icons or fonts for your website, we will only use ones licensed for
              commercial use. If you ask us to use an image you found online, you must confirm you have the right to
              use it.
            </p>
          </Sec>

          <Sec id="content-rules" n="9" title="Content we won't publish">
            <p>
              9.1 We will not design, build, host or maintain any website or content that, in our reasonable opinion:
            </p>
            <ul>
              <li>is illegal, or promotes or helps illegal activity;</li>
              <li>infringes anyone&apos;s copyright, trade marks or other rights;</li>
              <li>is defamatory, hateful, discriminatory, harassing or threatening;</li>
              <li>is pornographic or sexually explicit, or exploits or endangers children;</li>
              <li>is fraudulent, deceptive or misleading, including fake reviews or testimonials;</li>
              <li>contains malware, phishing, or anything designed to harm devices or collect data without consent;</li>
              <li>promotes unlicensed gambling, weapons, illegal drugs or other restricted goods; or</li>
              <li>breaches advertising rules (such as the CAP Code) or rules set by your professional regulator.</li>
            </ul>
            <p>
              9.2 If we become aware that a website we host or maintain breaks this Part, we may remove the content or
              suspend the website, and we will tell you why. If the breach is serious or illegal, we may do this
              without notice and may report it to the relevant authorities.
            </p>
          </Sec>

          <Sec id="revisions" n="10" title="Revisions">
            <p>
              10.1 Each package includes a set number of <strong>rounds of changes</strong> ({starter.name}: 2,{" "}
              {growth.name}: 3, {premium.name}: 5).
            </p>
            <p>
              10.2 A <strong>round</strong> is one consolidated list of changes sent to us in one go (one email or one
              document). Please collect everyone&apos;s feedback before you send it. Changes sent in several separate
              messages may count as several rounds.
            </p>
            <p>
              10.3 A <strong>revision</strong> is a reasonable change to the agreed design and content, for example
              changing text, swapping photos, adjusting colours, reordering sections or tweaking spacing. A complete
              redesign, a new page, a new feature or a change of direction after you have approved the design is not
              a revision; it is extra work under Part 11.
            </p>
            <p>
              10.4 Fixing our own mistakes never uses up a round of changes.
            </p>
            <p>
              10.5 Extra rounds of changes beyond your package can be added for a fee, which we will quote before we
              start.
            </p>
          </Sec>

          <Sec id="scope" n="11" title="Extra work and change requests">
            <p>
              11.1 If you ask for something not included in your package or quote (for example extra pages, features,
              integrations, copywriting or a redesign), we will tell you it&apos;s extra and give you a price and any
              effect on timescales <strong>before</strong> doing it. We will only do the extra work once you have
              agreed in writing.
            </p>
            <p>
              11.2 Agreed extra work is added to your balance or invoiced separately, and is covered by these terms.
            </p>
          </Sec>

          <Sec id="approval" n="12" title="Approval, launch and snagging">
            <p>
              12.1 When your website is ready, we will send you a preview link and ask you to check it. Please check
              everything carefully, including spelling, prices, contact details, opening hours and links, as you know
              your business best.
            </p>
            <p>
              12.2 Your website is <strong>approved</strong> when you tell us in writing that you are happy for it to
              go live, or when you pay the balance, or when it goes live at your request.
            </p>
            <p>
              12.3 If you don&apos;t reply to an approval request within 14 days, we will remind you. If we still
              don&apos;t hear back within a further 14 days, the website will be treated as approved and the balance
              becomes due, unless you have told us about something that doesn&apos;t match what we agreed.
            </p>
            <p>
              12.4 <strong>Snagging.</strong> For 30 days after launch we will fix, free of charge, any bug or error
              caused by our work that you report to us. This doesn&apos;t cover changes to content or design you
              approved, problems caused by someone else changing the website, or problems with third-party services.
            </p>
            <p>
              12.5 This doesn&apos;t limit your legal rights. If you are a consumer, see Part 28.
            </p>
          </Sec>

          <Sec id="domains" n="13" title="Domains, hosting and email">
            <p>
              13.1 <strong>Your domain is yours.</strong> Domain names (for example yourbusiness.co.uk) are registered
              in your name and paid for by you directly with a registrar of your choice. Domains are not included in
              any package or care plan. If you ask us to register a domain on your behalf, we will register it in your
              name and pass on the cost with no mark-up.
            </p>
            <p>
              13.2 You are responsible for keeping your domain renewed and your registrar details up to date. We are
              not responsible if a domain expires or is lost because it wasn&apos;t renewed.
            </p>
            <p>
              13.3 <strong>Hosting.</strong> Websites we host are hosted on reputable third-party platforms such as
              Netlify. Hosting is included in our care plans. If you don&apos;t take a care plan, we will either hand
              your website over to you (see 17.4) or, if you prefer, help you set up hosting in your own name.
            </p>
            <p>
              13.4 <strong>Email.</strong> We do not provide email accounts. We can help you connect your domain to an
              email provider such as Google Workspace or Microsoft 365, which you pay for directly.
            </p>
            <p>
              13.5 When you give us access to your domain or DNS settings, we will only make the changes needed to
              connect your website and will not change anything else (such as your email records) without asking.
            </p>
          </Sec>

          <Sec id="care" n="14" title="Care plans">
            <p>
              14.1 Care plans are available for websites we have built, and for other code-based websites we agree to
              look after. We do not provide care plans for website builders such as Wix or Squarespace.
            </p>
            <p>
              14.2 <strong>{essential.name} ({formatGBP(essential.pricePence)} a month)</strong> includes: hosting
              with an SSL certificate on our hosting platform; uptime and security monitoring; backups of your
              website&apos;s code and content; one small change a month; and fixing bugs in our work.
            </p>
            <p>
              14.3 <strong>{priority.name} ({formatGBP(priority.pricePence)} a month)</strong> includes everything in{" "}
              {essential.name}, plus: up to five changes a month; priority support with replies within one working
              day; a monthly health check of speed, security and search basics; help keeping your Google Business
              Profile up to date; and larger redesign work at a discounted rate.
            </p>
            <p>
              14.4 <strong>What counts as a change.</strong> A change is a small update that takes us up to about 30
              minutes, for example updating text, prices or opening hours, swapping or adding images, adding a
              testimonial, or making a small layout tweak. A new page, a new feature, a redesign of a section or a
              large batch of edits may count as several changes or be quoted as extra work. We will always tell you
              first.
            </p>
            <p>
              14.5 Unused changes do not roll over to the next month and have no cash value.
            </p>
            <p>
              14.6 We aim to make requested changes within 3 working days ({priority.name}: start within 1 working
              day). Urgent problems, such as your website being down, are prioritised.
            </p>
            <p>
              14.7 <strong>Not included</strong> in any care plan unless agreed: domain names, email accounts, paid
              third-party software or subscriptions, copywriting, photography, new websites, full redesigns, and
              support for changes made to the website by anyone other than us.
            </p>
            <p>
              14.8 <strong>Fair use.</strong> Care plans are for reasonable use by one business. If requests are
              persistently far beyond what&apos;s included, we will talk to you about moving to a higher plan or quoting
              the extra work, rather than refusing without explanation.
            </p>
            <p>
              14.9 <strong>Cancelling a care plan.</strong> Care plans have no minimum term. You can cancel at any time
              by emailing us with 30 days&apos; notice. Your plan ends at the end of the notice period and you
              won&apos;t be charged after that. Payments already made for the current month are not refunded, except
              where the law requires it (see Part 25).
            </p>
            <p>
              14.10 <strong>When a care plan ends,</strong> we will (once all payments are up to date) give you a copy
              of your website&apos;s files and reasonable help moving it to a new host. If you would like us to keep it
              online, you need to start a new plan. We may take the website off our hosting 30 days after the plan
              ends. Your domain stays yours throughout.
            </p>
            <p>
              14.11 <strong>Price changes.</strong> We may change care plan prices or what&apos;s included by giving
              you at least 30 days&apos; notice in writing. If you don&apos;t want to continue, you can cancel before the
              change takes effect.
            </p>
            <p>
              14.12 We may end a care plan by giving you 30 days&apos; written notice, or immediately if you seriously
              or repeatedly break these terms (see Part 26). We will always give you a copy of your website files when
              a plan ends, as long as your account is paid up.
            </p>
          </Sec>

          <Sec id="preview" n="15" title="The free design preview">
            <p>
              15.1 We may offer to design a free preview of one page of your new website (usually the homepage) before
              you decide whether to buy. The preview is free, needs no payment details and creates no contract and no
              obligation to buy.
            </p>
            <p>
              15.2 We decide whether to offer a preview, and its format (for example images or a private link). We may
              use placeholder text and stock images in it.
            </p>
            <p>
              15.3 We own the preview and its design. You may look at it and share it privately to help you decide,
              but you may not use it, copy it or have someone else build from it unless you buy a package from us.
            </p>
            <p>
              15.4 If you buy a package, the preview becomes part of your Project and the normal ownership rules in
              Part 17 apply. If you don&apos;t, we may reuse the design elements (but never your logo, photos or
              business details) in other work.
            </p>
          </Sec>

          <Sec id="third-party" n="16" title="Third-party services">
            <p>
              16.1 Your website may rely on services provided by other companies, for example hosting (Netlify),
              payments (Stripe), domain registrars, Google services, fonts, maps, booking tools and email providers.
              Those services have their own terms and privacy policies, which apply to your use of them.
            </p>
            <p>
              16.2 We choose reputable providers, but we don&apos;t control them. We are not responsible for their
              outages, price changes, policy changes or for them withdrawing a service, although we will help you deal
              with any problem as part of your care plan or for a reasonable fee.
            </p>
            <p>
              16.3 Where a third-party service needs an account (for example a Stripe account to take payments), the
              account should be in your name and you are responsible for its fees and for complying with its terms.
            </p>
          </Sec>

          <Sec id="ip" n="17" title="Who owns what (intellectual property)">
            <p>
              17.1 <strong>Your Content stays yours.</strong> You give us a non-exclusive licence to use, copy, edit
              and adapt Your Content only as needed to deliver our services to you (and, under Part 18, to show your
              website in our portfolio).
            </p>
            <p>
              17.2 <strong>Your website becomes yours when you&apos;ve paid in full.</strong> Once we have received
              full payment for the Project, we assign to you all copyright and other intellectual property rights we
              own in the bespoke design and code we created specifically for your website. The assignment takes effect
              when we email you to confirm payment in full, and that email (together with these terms) is our signed
              written assignment for the purposes of section 90(3) of the Copyright, Designs and Patents Act 1988. We
              will sign a separate assignment document if you ask.
            </p>
            <p>
              17.3 <strong>Until you&apos;ve paid in full</strong>, we own the design and code, and you have a licence
              to view and review it for the Project only.
            </p>
            <p>
              17.4 <strong>Handover.</strong> Once you have paid in full, you can ask for a copy of your website&apos;s
              files at any time. We will provide them within 14 days in a standard format.
            </p>
            <p>
              17.5 <strong>Our background tools.</strong> We keep ownership of our general know-how, techniques, code
              libraries, components, templates and tools that we developed before or separately from your Project, and
              that we use across many websites. We give you a permanent, royalty-free, non-exclusive licence to use any
              of these that are built into your website, for the purpose of running, changing and maintaining that
              website.
            </p>
            <p>
              17.6 <strong>Third-party materials</strong> (such as open-source code, fonts, icons and stock photos)
              remain owned by their creators and are used under their own licences, which we will choose to be
              suitable for commercial use. You must keep to those licences.
            </p>
            <p>
              17.7 We waive any moral rights we have in the bespoke design, so you can change it as you wish after
              handover. If someone else changes your website, we are not responsible for those changes.
            </p>
          </Sec>

          <Sec id="portfolio" n="18" title="Portfolio, credits and testimonials">
            <p>
              18.1 We may show your website (including screenshots and device mockups), your business name and a short
              description of the work in our portfolio, on our website and on social media, after it has launched. If
              you would rather we didn&apos;t, just tell us in writing and we will remove it within a reasonable time.
            </p>
            <p>
              18.2 We may include a small &ldquo;Website by BGG Website Design&rdquo; credit and link in your
              website&apos;s footer. You can ask us to remove it at any time.
            </p>
            <p>
              18.3 We will only publish a testimonial or review from you if you have given it to us and agreed to us
              using it. We will not change its meaning, and you can ask us to remove it at any time. We never publish
              fake or paid-for reviews.
            </p>
            <p>
              18.4 We will not show any confidential information, private client data or unlaunched work without your
              permission.
            </p>
          </Sec>

          <Sec id="results" n="19" title="SEO, performance and results">
            <p>
              19.1 We build every website following search engine best practice, as described in your package. But
              search rankings, traffic, enquiries and sales depend on many things outside our control, including
              Google&apos;s algorithms, your competitors, your reviews and your content.
            </p>
            <p>
              19.2 So, while we design every website to help you win more business,{" "}
              <strong>we do not guarantee any particular ranking, amount of traffic, number of enquiries or level of
              sales</strong>. Any examples of results on our website are illustrations, not promises.
            </p>
            <p>
              19.3 Speed and performance scores depend partly on your content (such as large images and videos you
              add later) and on third-party services. We will build your website to load quickly as supplied.
            </p>
          </Sec>

          <Sec id="security" n="20" title="Security, backups and availability">
            <p>
              20.1 We take reasonable steps to keep the websites we build and host secure, including using HTTPS,
              keeping our code up to date and using reputable hosting.
            </p>
            <p>
              20.2 No website can be guaranteed to be completely secure or available all the time. Hosting platforms
              have occasional outages and maintenance. We do not promise uninterrupted availability, but we will work
              to restore service as quickly as we reasonably can when a problem is within our control.
            </p>
            <p>
              20.3 Websites on our care plans are backed up. You should still keep your own copies of Your Content
              (see Part 8).
            </p>
            <p>
              20.4 You must keep any passwords or log-ins we give you secure and tell us straight away if you think
              someone else has accessed them.
            </p>
          </Sec>

          <Sec id="compliance" n="21" title="Your website's legal compliance">
            <p>
              21.1 You are responsible for making sure your business and website comply with the laws and rules that
              apply to you, including data protection law, consumer law, advertising rules, and any rules set by your
              professional body or regulator (for example the HCPC, GDC, CQC or FCA).
            </p>
            <p>
              21.2 We can add a privacy policy, cookie notice, terms of sale or similar pages based on information you
              give us, or using wording you supply. We are web designers, not lawyers, and{" "}
              <strong>nothing we provide is legal advice</strong>. You should have your legal documents checked by a
              qualified professional.
            </p>
            <p>
              21.3 We build to good accessibility practice (aiming for WCAG 2.2 AA where practical), but full
              accessibility also depends on your content (for example image descriptions and video captions), so we
              cannot guarantee full compliance.
            </p>
            <p>
              21.4 If your website uses analytics, marketing cookies or similar tracking, you are responsible for
              getting any consent the law requires. We can build a cookie consent banner as an add-on.
            </p>
          </Sec>

          <Sec id="ecommerce" n="22" title="Shops, bookings and payments on your site">
            <p>
              22.1 If your website sells products, services, bookings or downloads, <strong>you</strong> are the
              seller. You are responsible for your own terms of sale, prices, taxes (including VAT if you are
              registered), refunds, delivery, customer service and compliance with consumer law towards your
              customers.
            </p>
            <p>
              22.2 Payments on your website are processed through your own account with a payment provider such as
              Stripe or SumUp. We never hold your customers&apos; money.
            </p>
            <p>
              22.3 You must check your products, prices and settings before launch and test a real purchase. We are
              not responsible for losses caused by incorrect prices, stock or settings you supplied or approved.
            </p>
          </Sec>

          <Sec id="data" n="23" title="Data protection">
            <p>
              23.1 We handle personal data about you (for example your name, email and project details) as a
              controller, in line with UK data protection law. Our <Link href="/privacy">privacy policy</Link> explains
              how.
            </p>
            <p>
              23.2 If we host or maintain your website, or set up forms that collect your customers&apos; details, we
              may process personal data on your behalf. In that case you are the controller and we are your processor,
              and the data processing terms in <a href="#dpa">Schedule 2</a> apply.
            </p>
            <p>
              23.3 You are responsible for having a lawful basis to collect and use your customers&apos; data and for
              telling them how you use it, usually in your own privacy policy.
            </p>
          </Sec>

          <Sec id="confidentiality" n="24" title="Confidentiality">
            <p>
              24.1 We each agree to keep the other&apos;s confidential information private and to use it only for the
              Project. This includes log-ins, business plans, unpublished prices and anything marked or obviously
              confidential.
            </p>
            <p>
              24.2 This doesn&apos;t apply to information that is already public (other than through a breach of this
              Part), or that the law, a court or a regulator requires to be disclosed.
            </p>
          </Sec>

          <Sec id="cancel-consumer" n="25" title="Your right to cancel (consumers)">
            <p>
              25.1 This Part applies only if you are a consumer and we made our contract at a distance (for example
              online or by email), as set out in the Consumer Contracts (Information, Cancellation and Additional
              Charges) Regulations 2013.
            </p>
            <p>
              25.2 <strong>You have the right to cancel this contract within 14 days without giving any reason.</strong>{" "}
              The cancellation period ends 14 days after the day the contract is entered into (see Part 4). For a care
              plan, the same applies from the day you subscribe.
            </p>
            <p>
              25.3 To cancel, tell us of your decision by a clear statement, for example an email to{" "}
              <a href={`mailto:${E}`}>{E}</a> or a letter to {L.address}. You may use the{" "}
              <a href="#cancellation-form">model cancellation form</a> in Schedule 1, but you don&apos;t have to. To meet
              the deadline, you only need to send your message before the 14 days end.
            </p>
            <p>
              25.4 <strong>Starting work within the 14 days.</strong> Most clients want us to start straight away.
              If you ask us to start work during the cancellation period (for example by paying your deposit and
              ticking the box that asks us to begin), and you then cancel, you will have to pay us an amount in
              proportion to the work we have done up to the time you tell us you are cancelling, compared with the
              full service.
            </p>
            <p>
              25.5 If the service has been <strong>fully performed</strong> within the 14 days at your express request,
              and you acknowledged that you would lose your right to cancel once it was fully performed, you will no
              longer have the right to cancel.
            </p>
            <p>
              25.6 <strong>Effects of cancellation.</strong> If you cancel, we will refund all payments received from
              you, less any amount due under 25.4, without undue delay and no later than 14 days after the day we are
              informed of your decision to cancel. We will use the same payment method you used, unless you have
              expressly agreed otherwise, and you will not pay any fees for the refund.
            </p>
            <p>
              25.7 After the 14-day period, you can still end the contract under Part 26.
            </p>
          </Sec>

          <Sec id="ending" n="26" title="Ending the contract">
            <p>
              26.1 <strong>You can end a Project</strong> at any time by telling us in writing. We will stop work and
              you will pay for the work done up to that point (calculated as a fair proportion of the price, based on
              the stage the Project has reached), plus any costs we have already committed to on your behalf. If you
              have paid more than that, we will refund the difference. Consumers also have the rights in Part 25 and
              Part 28.
            </p>
            <p>26.2 As a guide, we use these stages to work out a fair proportion of the package price:</p>
            <table>
              <thead>
                <tr>
                  <th>Stage reached</th>
                  <th>Proportion of the price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Order confirmed, project form received, no design started</td>
                  <td>10%</td>
                </tr>
                <tr>
                  <td>First version of the design or homepage shared</td>
                  <td>50%</td>
                </tr>
                <tr>
                  <td>All pages built and shared for review</td>
                  <td>80%</td>
                </tr>
                <tr>
                  <td>Website approved or ready to launch</td>
                  <td>100%</td>
                </tr>
              </tbody>
            </table>
            <p>
              26.3 <strong>We can end a Project or care plan</strong> by telling you in writing if: (a) you
              don&apos;t pay an amount due within 14 days of a written reminder; (b) you seriously or repeatedly break
              these terms and (if it can be fixed) don&apos;t fix it within 14 days of us asking; (c) you ask us to
              publish content that breaks Part 9; (d) you or your staff are abusive or threatening; or (e) you become
              insolvent or stop trading.
            </p>
            <p>
              26.4 If we end a Project for a reason in 26.3, you pay for the work done to that point under 26.1–26.2.
              If we have to end a Project for any other reason (for example illness or events outside our control), we
              will refund everything you have paid for work not yet done and give you the files completed so far.
            </p>
            <p>
              26.5 When the contract ends, anything you owe becomes due immediately, and the parts of these terms
              meant to continue (including Parts 17, 24, 28–30 and 35–36) still apply.
            </p>
          </Sec>

          <Sec id="refunds" n="27" title="Refunds">
            <p>
              27.1 Because our work is custom-made for you and starts as soon as you pay your deposit, we don&apos;t
              offer refunds simply because you change your mind once work has begun, except as the law requires (see
              Parts 25 and 28) or as set out in Part 26.
            </p>
            <p>
              27.2 If we are unable to complete your Project for reasons on our side, we will refund the payments you
              have made for the work not delivered.
            </p>
            <p>
              27.3 Refunds are made to the payment method you used, within 14 days of us agreeing the refund (or the
              timescale in Part 25 if you cancel as a consumer).
            </p>
          </Sec>

          <Sec id="liability-consumer" n="28" title="Our responsibility to consumers">
            <p>
              28.1 If you are a consumer, you have legal rights under the Consumer Rights Act 2015. We must provide our
              services with reasonable care and skill, as described, and within a reasonable time. If we don&apos;t, you
              can ask us to redo the work or fix it, and if that&apos;s not possible or we can&apos;t do it within a
              reasonable time, you may be entitled to a price reduction or refund. Nothing in these terms affects these
              rights. For more information, contact Citizens Advice.
            </p>
            <p>
              28.2 We are responsible for loss or damage you suffer that is a foreseeable result of us breaking these
              terms or failing to use reasonable care and skill. Loss or damage is foreseeable if it was obvious it
              would happen, or if we both knew it might happen when we made the contract.
            </p>
            <p>
              28.3 We do not exclude or limit our liability for death or personal injury caused by our negligence,
              for fraud or fraudulent misrepresentation, or for anything else that cannot legally be excluded or
              limited.
            </p>
            <p>
              28.4 If our services are for a website you use in a business, trade or profession (even if you are
              buying as an individual), we are not responsible for any loss of profit, loss of business, business
              interruption or loss of business opportunity.
            </p>
          </Sec>

          <Sec id="liability-business" n="29" title="Our responsibility to businesses">
            <p>29.1 This Part applies if you are a business customer.</p>
            <p>
              29.2 Nothing in these terms limits or excludes our liability for death or personal injury caused by our
              negligence, for fraud or fraudulent misrepresentation, or for any other liability that cannot be limited
              or excluded by law.
            </p>
            <p>
              29.3 Subject to 29.2, we are not liable, whether in contract, tort (including negligence), breach of
              statutory duty or otherwise, for any: loss of profits; loss of sales, business or revenue; loss of
              anticipated savings; business interruption; loss of opportunity, goodwill or reputation; loss or
              corruption of data (except where caused by our failure to keep the backups included in your care plan);
              or any indirect or consequential loss.
            </p>
            <p>
              29.4 Subject to 29.2, our total liability to you for all claims arising out of or in connection with a
              Project or care plan is limited to the total amount you have paid us under that Project or, for a care
              plan, in the 12 months before the event giving rise to the claim.
            </p>
            <p>
              29.5 We are not responsible for: problems caused by Your Content or instructions; changes made to the
              website by you or anyone else; third-party services (Part 16); hacking or attacks that happen despite our
              reasonable security measures; or your failure to keep your domain, accounts or passwords in order.
            </p>
            <p>
              29.6 The terms implied by sections 3 to 5 of the Supply of Goods and Services Act 1982 are, to the
              extent the law allows, excluded, apart from the duty to use reasonable care and skill.
            </p>
            <p>
              29.7 Any claim must be brought within two years of the date you became aware (or should reasonably have
              become aware) of the facts giving rise to it.
            </p>
          </Sec>

          <Sec id="indemnity" n="30" title="Your indemnity (businesses)">
            <p>
              30.1 If you are a business customer, you will compensate us for any reasonable losses, damages, costs
              (including reasonable legal fees) and expenses we suffer as a result of a claim by a third party that
              Your Content, or our use of it in line with your instructions, infringes their rights or breaks the law.
              We will tell you promptly about any such claim and give you reasonable help in dealing with it.
            </p>
          </Sec>

          <Sec id="force-majeure" n="31" title="Events outside our control">
            <p>
              31.1 We are not responsible for delays or failures caused by events outside our reasonable control, for
              example failures of hosting providers, internet outages, cyber-attacks, power cuts, extreme weather,
              pandemics, serious illness, or changes in law.
            </p>
            <p>
              31.2 If such an event happens, we will tell you as soon as possible and do what we reasonably can to
              limit its effect. If it delays your Project by more than 30 days, either of us can end the contract and
              we will refund anything you have paid for work not done.
            </p>
          </Sec>

          <Sec id="complaints" n="32" title="Complaints">
            <p>
              32.1 If you&apos;re unhappy with anything, please tell us straight away by emailing{" "}
              <a href={`mailto:${E}`}>{E}</a> with your name, what went wrong and what you would like us to do. We
              will acknowledge your complaint within 2 working days and aim to resolve it within 14 days.
            </p>
            <p>
              32.2 If we can&apos;t resolve your complaint, consumers can get free advice from Citizens Advice
              (citizensadvice.org.uk, 0808 223 1133). You can also bring a claim in the courts (see Part 36).
            </p>
          </Sec>

          <Sec id="changes" n="33" title="Changes to these terms">
            <p>
              33.1 We may update these terms from time to time, for example to reflect changes in the law, our
              services or our prices. The version on our website when you place an order applies to that order.
            </p>
            <p>
              33.2 For care plans, we will give you at least 30 days&apos; notice of any change that affects you. If
              you don&apos;t agree with the change, you can cancel your plan before it takes effect.
            </p>
            <p>33.3 The date at the top of this page shows when these terms were last updated.</p>
          </Sec>

          <Sec id="who-works" n="34" title="Who does the work">
            <p>
              34.1 Your website is designed and built by our in-house designer, Ben. We may occasionally use trusted
              freelancers for specialist tasks. If we do, they will be bound by confidentiality, and we remain
              responsible for their work.
            </p>
          </Sec>

          <Sec id="general" n="35" title="General legal terms">
            <p>
              35.1 <strong>Entire agreement.</strong> For business customers, these terms and the documents in 4.4 are
              the whole agreement between us and replace any earlier discussions. Neither of us relies on anything not
              written in them. This doesn&apos;t limit liability for fraud.
            </p>
            <p>
              35.2 <strong>Transfer.</strong> We may transfer our rights and obligations to another business (for
              example if BGG Website Design becomes a limited company). We will tell you in writing, and it won&apos;t
              reduce your rights. You may only transfer your rights to someone else with our written agreement, which
              we won&apos;t unreasonably refuse.
            </p>
            <p>
              35.3 <strong>No third-party rights.</strong> This contract is between you and us. No one else has any
              right to enforce any of its terms under the Contracts (Rights of Third Parties) Act 1999.
            </p>
            <p>
              35.4 <strong>Severance.</strong> If a court decides that part of these terms is unlawful or unenforceable,
              the rest will continue in full force.
            </p>
            <p>
              35.5 <strong>No waiver.</strong> If we don&apos;t insist straight away that you do something you are
              required to do, or delay taking action, that doesn&apos;t mean we have given up our rights.
            </p>
            <p>
              35.6 <strong>Notices.</strong> Notices under these terms may be sent by email to the address you gave us
              (or, for us, to <a href={`mailto:${E}`}>{E}</a>). An email is treated as received on the next working
              day after it is sent, unless the sender gets a delivery failure message.
            </p>
            <p>
              35.7 <strong>We are independent.</strong> Nothing in these terms creates a partnership, employment or
              agency relationship between us.
            </p>
          </Sec>

          <Sec id="law" n="36" title="Governing law and courts">
            <p>
              36.1 These terms and any dispute or claim arising from them are governed by the law of England and
              Wales.
            </p>
            <p>
              36.2 If you are a consumer, you can bring legal proceedings in the courts of England and Wales; if you
              live in Scotland or Northern Ireland, you can also bring proceedings in your local courts. If you are a
              business customer, the courts of England and Wales have exclusive jurisdiction.
            </p>
          </Sec>

          <Sec id="website-use" n="37" title="Using this website">
            <p>
              37.1 These rules apply to anyone using bggwebsitedesign.com (&ldquo;this website&rdquo;). By using it, you
              agree to them.
            </p>
            <p>
              37.2 <strong>Information.</strong> We keep this website accurate and up to date, but the content is for
              general information and isn&apos;t advice. Prices, packages and timescales may change; the version shown
              when you order applies (see Part 4).
            </p>
            <p>
              37.3 <strong>Our content.</strong> The design, text, graphics, code and mockups on this website belong to
              us or our licensors. Websites shown in our portfolio belong to the businesses concerned and are shown
              with their permission or as examples of our work. You may view and print pages for your personal use,
              but you may not copy, reproduce or reuse our content or designs for commercial purposes without our
              written permission.
            </p>
            <p>
              37.4 <strong>Acceptable use.</strong> You must not misuse this website, including by: trying to gain
              unauthorised access; introducing viruses or harmful code; scraping or copying content in bulk; sending
              spam or abusive messages through our forms; or using it for anything unlawful.
            </p>
            <p>
              37.5 <strong>Links.</strong> This website links to client websites and other sites we don&apos;t control.
              We aren&apos;t responsible for their content, availability or privacy practices.
            </p>
            <p>
              37.6 <strong>Availability.</strong> We don&apos;t guarantee this website will always be available or free
              from errors or viruses. Please use your own virus protection.
            </p>
            <p>
              37.7 <strong>Liability.</strong> We are not liable for any loss arising from use of, or reliance on, this
              website, except where the law does not allow us to exclude it (for example for death or personal injury
              caused by negligence, or fraud).
            </p>
            <p>
              37.8 <strong>Privacy.</strong> How we use information collected through this website is explained in our{" "}
              <Link href="/privacy">privacy policy</Link>.
            </p>
          </Sec>

          <Sec id="cancellation-form" n="S1" title="Schedule 1: Model cancellation form">
            <p>
              (Complete and return this form only if you are a consumer and wish to cancel the contract within the
              cancellation period.)
            </p>
            <div className="legal-form">
              <p>
                To: BGG Website Design ({L.ownerName}), {L.address}, <a href={`mailto:${E}`}>{E}</a>
              </p>
              <p>
                I/We [*] hereby give notice that I/We [*] cancel my/our [*] contract for the supply of the following
                service [*],
              </p>
              <p>Ordered on [*] / received on [*],</p>
              <p>Name of consumer(s),</p>
              <p>Address of consumer(s),</p>
              <p>Signature of consumer(s) (only if this form is notified on paper),</p>
              <p>Date</p>
              <p>[*] Delete as appropriate.</p>
            </div>
          </Sec>

          <Sec id="dpa" n="S2" title="Schedule 2: Data processing terms">
            <p>
              These terms apply where we process personal data on your behalf as your processor (see 23.2), and are
              intended to meet Article 28(3) of the UK GDPR.
            </p>
            <ol>
              <li>
                <strong>Subject matter and duration:</strong> hosting, maintaining and supporting your website and any
                forms on it, for as long as we provide those services.
              </li>
              <li>
                <strong>Nature and purpose:</strong> storing, transmitting and, where needed, viewing personal data
                submitted through your website (for example enquiry form submissions) so your website works and we can
                support it.
              </li>
              <li>
                <strong>Types of personal data and data subjects:</strong> contact details and messages submitted by
                your website&apos;s visitors and customers, and any other personal data you choose to put on your
                website.
              </li>
              <li>We will only process the personal data on your documented instructions, including these terms.</li>
              <li>
                Anyone we authorise to process the personal data will be bound by a duty of confidentiality.
              </li>
              <li>We will take appropriate technical and organisational measures to keep the personal data secure.</li>
              <li>
                You authorise us to use our hosting and infrastructure providers (currently Netlify, Inc. and, where
                used, Google LLC) as sub-processors. We will tell you before adding or replacing a sub-processor, so you
                can object, and we will put a written contract in place with each one giving the same level of
                protection.
              </li>
              <li>
                Where sub-processors transfer data outside the UK, we will rely only on transfers permitted by UK data
                protection law (for example UK adequacy regulations or the UK International Data Transfer
                Addendum).
              </li>
              <li>
                We will help you, as far as reasonably possible, to respond to requests from people exercising their
                data protection rights, and to meet your obligations on security, breach notification and data
                protection impact assessments.
              </li>
              <li>
                We will tell you without undue delay after becoming aware of a personal data breach affecting your
                data.
              </li>
              <li>
                When our services end, we will delete or return the personal data (at your choice), unless the law
                requires us to keep it.
              </li>
              <li>
                We will give you the information reasonably needed to show we are meeting these obligations, and allow
                for reasonable audits on reasonable notice.
              </li>
              <li>We will tell you immediately if we think an instruction from you breaks data protection law.</li>
            </ol>
          </Sec>

          <LegalFoot other={{ href: "/privacy", label: "Privacy & cookies policy" }} />
        </article>
      </div>
    </>
  );
}
