import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd, PageHead } from "@/components/site/blocks";
import { LegalFoot, Sec, Summary, Toc } from "@/components/site/legal";
import { SITE, breadcrumbLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & Cookies Policy",
  description:
    "How BGG Website Design collects, uses and protects your personal data, the cookies and storage this website uses, and your rights under UK data protection law.",
  alternates: { canonical: "/privacy" },
};

const L = SITE.legal;
const E = SITE.email;

const TOC = [
  { id: "who", n: "1", title: "Who we are" },
  { id: "collect", n: "2", title: "What we collect" },
  { id: "why", n: "3", title: "Why we use it and our lawful basis" },
  { id: "share", n: "4", title: "Who we share it with" },
  { id: "transfers", n: "5", title: "International transfers" },
  { id: "keep", n: "6", title: "How long we keep it" },
  { id: "rights", n: "7", title: "Your rights" },
  { id: "cookies", n: "8", title: "Cookies and similar technologies" },
  { id: "security", n: "9", title: "Keeping your data safe" },
  { id: "clients", n: "10", title: "Data on our clients' websites" },
  { id: "children", n: "11", title: "Children" },
  { id: "marketing", n: "12", title: "Marketing" },
  { id: "changes", n: "13", title: "Changes to this policy" },
  { id: "contact", n: "14", title: "Contact and complaints" },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Privacy & cookies", path: "/privacy" }])} />
      <PageHead
        crumbs={[{ name: "Privacy & cookies" }]}
        eyebrow={`Last updated ${L.privacyUpdated}`}
        title="Privacy & cookies policy"
        lead="We only collect what we need to answer your enquiry and build your website, we never sell your data, and you're always in control of it."
      >
        <p className="legal-download">
          <a href="/legal/bgg-website-design-privacy-policy.pdf" className="btn btn--ghost btn--sm" download>
            Download PDF
          </a>
        </p>
      </PageHead>

      <div className="wrap legal">
        <Toc items={TOC} />

        <article className="prose legal-body">
          <Summary>
            <ul>
              <li>We collect what you send us (name, email, project details) so we can reply, quote and build your site.</li>
              <li>Payments are handled by Stripe. We never see your full card number.</li>
              <li>
                This website uses <strong>no advertising or tracking cookies</strong>, so there&apos;s no cookie banner.
              </li>
              <li>We never sell your data or share it for anyone else&apos;s marketing.</li>
              <li>
                You can ask to see, correct or delete your data at any time by emailing{" "}
                <a href={`mailto:${E}`}>{E}</a>.
              </li>
            </ul>
          </Summary>

          <Sec id="who" n="1" title="Who we are">
            <p>
              1.1 BGG Website Design is a trading name of {L.ownerName}, a sole trader based in Solihull, England
              (&ldquo;we&rdquo;, &ldquo;us&rdquo;). For the personal data described in this policy, we are the{" "}
              <strong>controller</strong>, which means we decide how and why it is used.
            </p>
            <p>
              1.2 Contact: <a href={`mailto:${E}`}>{E}</a>, or by post to {L.address}.
              {L.icoNumber ? ` We are registered with the Information Commissioner's Office (ICO), registration number ${L.icoNumber}.` : ""}
            </p>
            <p>
              1.3 This policy explains what personal data we collect when you use this website or work with us, how
              we use it, who we share it with, and your rights under the UK General Data Protection Regulation (UK
              GDPR) and the Data Protection Act 2018.
            </p>
          </Sec>

          <Sec id="collect" n="2" title="What we collect">
            <p>2.1 <strong>Information you give us:</strong></p>
            <ul>
              <li>
                <strong>Enquiries and free preview requests:</strong>{" "}your name, email address, business name, current
                website, what you need, and anything else you write in our contact form or emails.
              </li>
              <li>
                <strong>Orders:</strong>{" "}the package or plan you choose, your agreement to our{" "}
                <Link href="/terms">terms</Link>, and records of what you have paid.
              </li>
              <li>
                <strong>Project information:</strong>{" "}answers to our project questionnaire, and the content you send
                us for your website (text, photos, logos, and any personal data they contain).
              </li>
              <li>
                <strong>Account and access details:</strong>{" "}log-ins you choose to share with us so we can connect your
                domain or services. We only use these for your project and delete them when they are no longer needed.
              </li>
              <li>
                <strong>Communications:</strong>{" "}emails and messages between us, and any feedback or testimonials you
                give us.
              </li>
            </ul>
            <p>2.2 <strong>Information from payments:</strong></p>
            <ul>
              <li>
                When you pay, Stripe collects your card and billing details. Stripe tells us your name, email, the
                amount, the date, whether the payment succeeded and limited card details (such as the last four digits
                and card type). <strong>We never see or store your full card number.</strong>
              </li>
            </ul>
            <p>2.3 <strong>Information collected automatically:</strong></p>
            <ul>
              <li>
                Our hosting provider (Netlify) automatically records basic technical information when you visit, such
                as your IP address, browser type and the pages requested, in server logs used for security and to keep
                the website running.
              </li>
              <li>
                We do <strong>not</strong>{" "}use analytics tools, advertising pixels or tracking cookies on this website.
                See Part 8.
              </li>
            </ul>
            <p>
              2.4 We do not intentionally collect special category data (such as health information). Please don&apos;t
              send us any unless it is necessary for your website (for example, if you are a health practitioner, your
              website may describe your services, but it should not include patients&apos; details).
            </p>
          </Sec>

          <Sec id="why" n="3" title="Why we use it and our lawful basis">
            <p>The law requires a lawful basis for every use of personal data. Here is ours:</p>
            <table>
              <thead>
                <tr>
                  <th>What we do</th>
                  <th>Lawful basis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Reply to enquiries, send quotes and prepare free design previews</td>
                  <td>
                    Taking steps at your request before entering into a contract, and our legitimate interest in
                    responding to people who contact us
                  </td>
                </tr>
                <tr>
                  <td>Design, build, launch, host and support your website; manage care plans</td>
                  <td>Performance of our contract with you</td>
                </tr>
                <tr>
                  <td>Take payments, send invoices and receipts, recover money owed</td>
                  <td>Performance of our contract; our legitimate interest in getting paid</td>
                </tr>
                <tr>
                  <td>Keep financial and tax records</td>
                  <td>Legal obligation</td>
                </tr>
                <tr>
                  <td>Keep this website secure and prevent fraud and spam</td>
                  <td>Our legitimate interest in protecting our business and visitors</td>
                </tr>
                <tr>
                  <td>Show your launched website in our portfolio</td>
                  <td>Our legitimate interest in showing our work (you can object at any time, see Part 7)</td>
                </tr>
                <tr>
                  <td>Publish your testimonial with your name</td>
                  <td>Your consent, which you can withdraw at any time</td>
                </tr>
                <tr>
                  <td>Deal with complaints and legal claims</td>
                  <td>Our legitimate interest in defending our rights; legal obligation where applicable</td>
                </tr>
              </tbody>
            </table>
            <p>
              3.2 If you don&apos;t give us the information we need to deliver your project (for example your email
              address or content), we may not be able to provide our services.
            </p>
            <p>3.3 We do not use your data for automated decision-making or profiling.</p>
          </Sec>

          <Sec id="share" n="4" title="Who we share it with">
            <p>
              4.1 <strong>We never sell your personal data.</strong>{" "}We only share it with trusted providers who help
              us run our business, and only as much as they need:
            </p>
            <ul>
              <li>
                <strong>Stripe</strong>{" "}(payments). Stripe processes payments under its own{" "}
                <a href="https://stripe.com/gb/privacy" target="_blank" rel="noopener noreferrer">
                  privacy policy
                </a>
                .
              </li>
              <li>
                <strong>Netlify</strong>{" "}(website hosting and contact form submissions).{" "}
                <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">
                  Privacy policy
                </a>
                .
              </li>
              <li>
                <strong>Google</strong>{" "}(email through Gmail, and our project questionnaire through Google Forms).{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  Privacy policy
                </a>
                .
              </li>
              <li>
                <strong>Domain registrars, email and other service providers</strong>{" "}you ask us to set up for your
                website, when needed to do so.
              </li>
              <li>
                <strong>Professional advisers</strong>{" "}(such as accountants or lawyers), under a duty of
                confidentiality.
              </li>
              <li>
                <strong>Authorities</strong>{" "}such as HMRC, the police or a court, where the law requires it.
              </li>
              <li>
                <strong>A buyer of our business</strong>, if we sell or restructure it, who would have to use your data
                in line with this policy.
              </li>
            </ul>
            <p>
              4.2 We may occasionally use a trusted freelancer for specialist work on your project. They will only
              see the information they need and are bound by confidentiality.
            </p>
          </Sec>

          <Sec id="transfers" n="5" title="International transfers">
            <p>
              5.1 Some of our providers (Stripe, Netlify and Google) are based in, or store data in, the United States
              or other countries outside the UK. When this happens, the transfer is protected by safeguards permitted
              by UK data protection law, such as the UK&apos;s adequacy regulations (including the UK Extension to the
              EU-US Data Privacy Framework) or the International Data Transfer Addendum to the EU standard contractual
              clauses.
            </p>
            <p>5.2 You can ask us for more information about these safeguards.</p>
          </Sec>

          <Sec id="keep" n="6" title="How long we keep it">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>How long</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Enquiries and preview requests that don&apos;t lead to an order</td>
                  <td>Up to 12 months after our last contact, then deleted</td>
                </tr>
                <tr>
                  <td>Client project files and correspondence</td>
                  <td>For as long as we work together, then up to 2 years in case you need your files or support</td>
                </tr>
                <tr>
                  <td>Invoices, payment and tax records</td>
                  <td>6 years from the end of the tax year they relate to, as HMRC requires</td>
                </tr>
                <tr>
                  <td>Log-ins you shared with us</td>
                  <td>Deleted when no longer needed for your project or care plan</td>
                </tr>
                <tr>
                  <td>Testimonials</td>
                  <td>Until you ask us to remove them</td>
                </tr>
                <tr>
                  <td>Hosting server logs</td>
                  <td>As set by Netlify, typically a short period for security purposes</td>
                </tr>
              </tbody>
            </table>
            <p>
              6.2 We may keep data for longer if we need it to deal with a complaint or legal claim, and then only for
              as long as necessary.
            </p>
          </Sec>

          <Sec id="rights" n="7" title="Your rights">
            <p>Under UK data protection law you have the right to:</p>
            <ul>
              <li>
                <strong>access</strong>{" "}the personal data we hold about you and receive a copy;
              </li>
              <li>
                have inaccurate data <strong>corrected</strong>{" "}or incomplete data completed;
              </li>
              <li>
                have your data <strong>erased</strong>{" "}in certain circumstances;
              </li>
              <li>
                <strong>restrict</strong>{" "}how we use your data in certain circumstances;
              </li>
              <li>
                <strong>object</strong>{" "}to us using your data on the basis of legitimate interests (including portfolio
                use);
              </li>
              <li>
                <strong>data portability</strong>: receive data you gave us in a commonly used format, or have it sent to
                someone else; and
              </li>
              <li>
                <strong>withdraw your consent</strong>{" "}at any time where we rely on consent (for example testimonials).
              </li>
            </ul>
            <p>
              7.2 To use any of these rights, email <a href={`mailto:${E}`}>{E}</a>. There&apos;s no charge. We will reply
              within one month, and may ask you to confirm your identity first.
            </p>
          </Sec>

          <Sec id="cookies" n="8" title="Cookies and similar technologies">
            <p>
              8.1 Cookies and similar technologies (such as your browser&apos;s local or session storage) store small
              pieces of information on your device.
            </p>
            <p>
              8.2 <strong>This website does not use advertising, analytics or tracking cookies</strong>, and we do not
              use social media pixels. That&apos;s why you don&apos;t see a cookie banner.
            </p>
            <p>8.3 We only use storage that is strictly necessary for features you ask for:</p>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Purpose</th>
                  <th>How long</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>bgg-contact-draft</td>
                  <td>Session storage (your device only)</td>
                  <td>
                    Remembers what you typed in our contact form while you go to Stripe&apos;s checkout, so you don&apos;t
                    have to type it again. It is never sent to us or anyone else.
                  </td>
                  <td>Until you close the tab, or your payment is confirmed</td>
                </tr>
              </tbody>
            </table>
            <p>
              8.4 When you pay, you are taken to Stripe&apos;s secure checkout, which sets its own strictly necessary
              cookies to process your payment and prevent fraud. See Stripe&apos;s{" "}
              <a href="https://stripe.com/gb/legal/cookies-policy" target="_blank" rel="noopener noreferrer">
                cookie policy
              </a>
              .
            </p>
            <p>
              8.5 If we ever add analytics or other non-essential cookies, we will update this policy and ask for your
              consent first.
            </p>
            <p>
              8.6 You can block or delete cookies and storage in your browser settings. Blocking strictly necessary
              storage may stop some features working.
            </p>
          </Sec>

          <Sec id="security" n="9" title="Keeping your data safe">
            <p>
              9.1 We use appropriate measures to protect your data, including encrypted connections (HTTPS), secure
              and reputable providers, strong unique passwords and two-factor authentication on our accounts, and
              limiting access to the people who need it.
            </p>
            <p>
              9.2 No method of sending or storing data is completely secure. If a breach affecting your data happens,
              we will deal with it promptly and, where the law requires, tell you and the ICO.
            </p>
          </Sec>

          <Sec id="clients" n="10" title="Data on our clients' websites">
            <p>
              10.1 If you are a visitor to a website we built or host for one of our clients, that client is the
              controller of your data (for example messages you send through their contact form) and their own
              privacy policy applies. We act as their processor under written terms (see Schedule 2 of our{" "}
              <Link href="/terms#dpa">terms</Link>). Please contact the business directly about your data.
            </p>
          </Sec>

          <Sec id="children" n="11" title="Children">
            <p>
              11.1 Our services are for adults and businesses. We do not knowingly collect personal data from
              children. If you think a child has sent us their data, please contact us and we will delete it.
            </p>
          </Sec>

          <Sec id="marketing" n="12" title="Marketing">
            <p>
              12.1 We don&apos;t send marketing newsletters. We may email clients and people who have enquired about
              things directly related to their project or website (such as care plan updates). If we ever start a
              newsletter, we will only send it to people who have opted in, and every email will include a way to
              unsubscribe.
            </p>
          </Sec>

          <Sec id="changes" n="13" title="Changes to this policy">
            <p>
              13.1 We may update this policy from time to time. The date at the top shows when it last changed. If we
              make significant changes that affect how we use your data, we will tell clients by email.
            </p>
          </Sec>

          <Sec id="contact" n="14" title="Contact and complaints">
            <p>
              14.1 If you have any questions or concerns about your data, please email <a href={`mailto:${E}`}>{E}</a>{" "}
              and we will do our best to help.
            </p>
            <p>
              14.2 You also have the right to complain to the Information Commissioner&apos;s Office (ICO), the UK
              regulator for data protection:{" "}
              <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">
                ico.org.uk/make-a-complaint
              </a>
              , telephone 0303 123 1113. We would appreciate the chance to deal with your concern first.
            </p>
          </Sec>

          <LegalFoot other={{ href: "/terms", label: "Terms & conditions" }} />
        </article>
      </div>
    </>
  );
}
