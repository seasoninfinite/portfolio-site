"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ArrowRight, ArrowUpRight, CheckCircle, Lock } from "@/components/site/icons";
import { buildPlans, carePlans, formatGBP, PLAN_LABELS, type PurchasePlan } from "@/data/pricing";
import { SITE } from "@/lib/site";

type Intent = PurchasePlan | "preview" | "general";

const PAID: Intent[] = ["basic", "standard", "premium", "care", "priority"];
const isPaid = (i: Intent | ""): i is PurchasePlan => !!i && PAID.includes(i);
const isBuild = (i: Intent | "") => i === "basic" || i === "standard" || i === "premium";

const CHOICES: { id: Intent; title: string; note: string; price?: string }[] = [
  { id: "preview", title: "Free 1-page preview", note: "Your new homepage designed free. No card, no obligation", price: "Free" },
  ...buildPlans.map((p) => ({
    id: p.id as Intent,
    title: `${p.name} website`,
    note: `${p.pages} · ${p.turnaround.toLowerCase()}`,
    price: formatGBP(p.pricePence),
  })),
  ...carePlans.map((c) => ({
    id: c.id as Intent,
    title: c.name,
    note: c.id === "care" ? "Hosting, security & 1 change a month" : "Up to 5 changes a month + priority support",
    price: `${formatGBP(c.pricePence)}/mo`,
  })),
  { id: "general", title: "Something else", note: "A question, a custom project or a quote", price: "" },
];

const LABELS: Record<Intent, string> = {
  ...PLAN_LABELS,
  preview: "Free 1-page preview",
  general: "General enquiry",
};

/** ?plan= values from pricing links (current names plus the old site's names, so old links still work). */
const QUERY_TO_INTENT: Record<string, Intent> = {
  "starter website": "basic",
  "growth website": "standard",
  "premium website": "premium",
  "essential care plan": "care",
  "priority care plan": "priority",
  "free design preview": "preview",
  "basic website design": "basic",
  "standard website design": "standard",
  "advanced website design": "premium",
  "website care plan": "care",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const DRAFT_KEY = "bgg-contact-draft";

type Draft = { intent: Intent | ""; name: string; email: string; business: string; website: string; message: string; terms: boolean; startNow?: boolean };

function encodeForm(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

function readDraft(): Draft | null {
  try {
    const raw = window.sessionStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

export function ContactWizard({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [intent, setIntent] = useState<Intent | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");
  const [terms, setTerms] = useState(false);
  const [startNow, setStartNow] = useState(false);
  const [touched, setTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyNote, setVerifyNote] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const paid = isPaid(intent);
  const build = buildPlans.find((p) => p.id === intent);
  const care = carePlans.find((p) => p.id === intent);
  const validEmail = EMAIL_RE.test(email.trim());
  const detailsOk =
    !!intent && name.trim().length > 1 && validEmail && message.trim().length > 4 && (!paid || (terms && startNow));

  const H = (headingLevel === 2 ? "h2" : "h3") as "h2" | "h3";

  const draft: Draft = useMemo(
    () => ({ intent, name, email, business, website, message, terms, startNow }),
    [intent, name, email, business, website, message, terms, startNow]
  );

  const go = (s: 1 | 2 | 3 | 4) => {
    setStep(s);
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  // Arriving from a pricing button (?plan=), or coming back from Stripe (?checkout=).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromPlan = params.get("plan");
    const checkout = params.get("checkout");
    const sid = params.get("session_id");

    if (checkout) {
      const saved = readDraft();
      if (saved) {
        setIntent(saved.intent);
        setName(saved.name);
        setEmail(saved.email);
        setBusiness(saved.business);
        setWebsite(saved.website);
        setMessage(saved.message);
        setTerms(saved.terms);
        setStartNow(!!saved.startNow);
      }
      if (checkout === "success" && sid) {
        setSessionId(sid);
        setStep(3);
        void verify(sid);
      } else if (checkout === "cancel" && saved) {
        setStep(3);
      }
      params.delete("checkout");
      params.delete("session_id");
      const q = params.toString();
      window.history.replaceState({}, "", `${window.location.pathname}${q ? `?${q}` : ""}${window.location.hash}`);
      return;
    }

    if (fromPlan) {
      const found = QUERY_TO_INTENT[fromPlan.trim().toLowerCase()];
      if (found) {
        setIntent(found);
        setStep(2);
      }
    }
  }, []);

  const saveDraft = () => {
    try {
      window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      /* private mode: the flow still works, it just can't restore on cancel */
    }
  };

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Website enquiry: ${intent ? LABELS[intent] : "General"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nBusiness: ${business}\nCurrent website: ${website}\nWhat I'm after: ${intent ? LABELS[intent] : ""}\n\n${message}`
    );
    return `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  }, [intent, name, email, business, website, message]);

  /** Sends the enquiry to Netlify Forms so Ben gets it by email, even if payment is never finished. */
  const submitEnquiry = async (): Promise<boolean> => {
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm({
          "form-name": "enquiry",
          intent: intent ? LABELS[intent] : "",
          name: name.trim(),
          email: email.trim(),
          business: business.trim(),
          website: website.trim(),
          message: message.trim(),
          terms: paid ? (terms ? `Agreed (terms dated ${SITE.legal.termsUpdated})` : "No") : "n/a",
          startNow: paid ? (startNow ? "Asked to start within 14 days; acknowledged cancellation terms" : "No") : "n/a",
        }),
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const onDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!detailsOk) return;
    setSending(true);
    setSendError(false);
    const ok = await submitEnquiry();
    setSending(false);
    if (!ok) setSendError(true);
    if (paid) {
      go(3);
      return;
    }
    if (ok) go(4);
  };

  const startCheckout = async () => {
    if (!paid) return;
    setCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: intent, customerName: name.trim(), customerEmail: email.trim().toLowerCase() }),
      });
      const data = (await res.json()) as { url?: string; sessionId?: string; error?: string };
      if (!res.ok || !data.url) {
        setCheckoutError(data.error?.trim() || "Checkout couldn't be opened. Check your connection and try again.");
        return;
      }
      saveDraft();
      window.location.href = data.url;
    } catch {
      setCheckoutError("Checkout couldn't be opened. Check your connection and try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  async function verify(sid: string) {
    setVerifying(true);
    setVerifyNote(null);
    try {
      const res = await fetch(`/api/stripe/checkout-session-status?session_id=${encodeURIComponent(sid)}`);
      const data = (await res.json()) as { paid?: boolean };
      if (res.ok && data.paid) {
        try {
          window.sessionStorage.removeItem(DRAFT_KEY);
        } catch {}
        setStep(4);
        return;
      }
      setVerifyNote(
        res.ok
          ? "Stripe hasn't confirmed the payment yet. If you've just paid, wait a few seconds and check again."
          : "We couldn't check your payment just now. Please try again in a moment."
      );
    } catch {
      setVerifyNote("We couldn't check your payment just now. Please try again in a moment.");
    } finally {
      setVerifying(false);
    }
  }

  const stepClass = (n: 1 | 2 | 3 | 4) => {
    if (n === 3 && intent && !paid) return "is-skip";
    if (step === n) return "is-active";
    if (step > n) return "is-done";
    return "";
  };

  return (
    <div className="wizard" ref={topRef} style={{ scrollMarginTop: 96 }}>
      <ol className="wizard__steps" aria-label="Progress">
        <li className={stepClass(1)} aria-current={step === 1 ? "step" : undefined}>
          1 · Choose
        </li>
        <li className={stepClass(2)} aria-current={step === 2 ? "step" : undefined}>
          2 · Details
        </li>
        <li className={stepClass(3)} aria-current={step === 3 ? "step" : undefined}>
          3 · {intent && !paid ? "No payment" : "Deposit"}
        </li>
        <li className={stepClass(4)} aria-current={step === 4 ? "step" : undefined}>
          4 · {isBuild(intent) ? "Project form" : "Done"}
        </li>
      </ol>

      {step === 1 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (intent) go(2);
          }}
        >
          <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
            <legend>
              <H className="h3" style={{ marginBottom: 6 }}>
                What can I help you with?
              </H>
              <p className="muted" style={{ margin: "0 0 18px", fontSize: 16 }}>
                Pick one. You can change your mind at any point.
              </p>
            </legend>
            <div className="choice-grid">
              {CHOICES.map((c) => (
                <label className="choice" key={c.id}>
                  <input
                    type="radio"
                    name="intent"
                    value={c.id}
                    checked={intent === c.id}
                    onChange={() => setIntent(c.id)}
                  />
                  <span>
                    <strong>{c.title}</strong>
                    <small>{c.note}</small>
                  </span>
                  <span className="choice__price">{c.price}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="wizard__actions">
            <span className="muted" style={{ fontSize: 14 }}>
              Takes about a minute
            </span>
            <button type="submit" className="btn btn--accent" disabled={!intent}>
              Continue <ArrowRight />
            </button>
          </div>
        </form>
      ) : null}

      {step === 2 ? (
        <form onSubmit={onDetails} noValidate>
          <H className="h3" style={{ marginBottom: 6 }}>
            Tell me about your business
          </H>
          <p className="muted" style={{ margin: "0 0 20px", fontSize: 16 }}>
            {intent ? (
              <>
                You chose <strong style={{ color: "var(--ink)" }}>{LABELS[intent]}</strong>.{" "}
                <button
                  type="button"
                  className="text-link"
                  style={{ background: "none", border: 0, padding: 0, cursor: "pointer", font: "inherit" }}
                  onClick={() => go(1)}
                >
                  Change
                </button>
              </>
            ) : null}
          </p>
          <div className="form-grid form-grid--2">
            <label className="field">
              Your name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
                aria-invalid={touched && name.trim().length < 2}
              />
              {touched && name.trim().length < 2 ? <span className="field__error">Please add your name.</span> : null}
            </label>
            <label className="field">
              Email
              <input
                type="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                aria-invalid={touched && !validEmail}
              />
              {touched && !validEmail ? <span className="field__error">Please enter a valid email address.</span> : null}
            </label>
            <label className="field">
              <span>
                Business name <span className="field__hint">(optional)</span>
              </span>
              <input value={business} onChange={(e) => setBusiness(e.target.value)} autoComplete="organization" />
            </label>
            <label className="field">
              <span>
                Current website <span className="field__hint">(if you have one)</span>
              </span>
              <input value={website} onChange={(e) => setWebsite(e.target.value)} inputMode="url" placeholder="www.…" />
            </label>
          </div>
          <label className="field" style={{ marginTop: 16 }}>
            What do you need?
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What your business does, who your customers are, and anything you'd love your website to do."
              required
              aria-invalid={touched && message.trim().length < 5}
            />
            {touched && message.trim().length < 5 ? (
              <span className="field__error">A sentence or two helps me give you an accurate quote.</span>
            ) : null}
          </label>

          {paid ? (
            <label style={{ display: "flex", gap: 10, marginTop: 16, fontSize: 15, alignItems: "flex-start" }}>
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                style={{ width: 18, height: 18, marginTop: 3, accentColor: "var(--accent)" }}
              />
              <span>
                I have read and agree to the{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-link">
                  terms and conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-link">
                  privacy policy
                </a>
                .
              </span>
            </label>
          ) : null}
          {paid ? (
            <label style={{ display: "flex", gap: 10, marginTop: 12, fontSize: 15, alignItems: "flex-start" }}>
              <input
                type="checkbox"
                checked={startNow}
                onChange={(e) => setStartNow(e.target.checked)}
                style={{ width: 18, height: 18, marginTop: 3, accentColor: "var(--accent)" }}
              />
              <span>
                Please start work straight away. I understand that if I&apos;m a consumer and cancel within 14 days, I
                will pay for the work done up to then, and that I lose my right to cancel once the service has been
                fully provided.
              </span>
            </label>
          ) : null}
          {paid && touched && (!terms || !startNow) ? (
            <p className="field__error" style={{ marginTop: 6 }}>
              Please tick both boxes before paying.
            </p>
          ) : null}

          {sendError && !paid ? (
            <div className="notice notice--err" style={{ marginTop: 16 }} role="alert">
              Your message didn&apos;t send. Please try again, or{" "}
              <a href={mailtoHref} className="text-link">
                email it to me instead
              </a>
              .
            </div>
          ) : null}

          <div className="wizard__actions">
            <button type="button" className="btn btn--ghost" onClick={() => go(1)}>
              Back
            </button>
            <button type="submit" className="btn btn--accent" disabled={sending}>
              {sending ? "Sending…" : paid ? "Continue to secure payment" : intent === "preview" ? "Request my free preview" : "Send my enquiry"}{" "}
              <ArrowRight />
            </button>
          </div>
        </form>
      ) : null}

      {step === 3 && paid ? (
        <div>
          <H className="h3" style={{ marginBottom: 6 }}>
            {build ? "Lock in your build slot" : "Start your care plan"}
          </H>
          <p className="muted" style={{ margin: "0 0 20px", fontSize: 16 }}>
            {build
              ? "Pay your 50% deposit and I'll start on your site straight away. You only pay the rest once you've seen it and you're happy."
              : "A simple monthly payment. Cancel any time with 30 days' notice."}
          </p>
          <div className="summary-box">
            <dl>
              <dt>{LABELS[intent]}</dt>
              <dd>{build ? formatGBP(build.pricePence) : `${formatGBP(care!.pricePence)}/mo`}</dd>
              {build ? (
                <>
                  <dt>Due later (when you&apos;re happy)</dt>
                  <dd>{formatGBP(build.pricePence - build.depositPence)}</dd>
                  <dt style={{ color: "var(--ink)", fontWeight: 600 }}>Deposit due today</dt>
                  <dd className="total">{formatGBP(build.depositPence)}</dd>
                </>
              ) : (
                <>
                  <dt style={{ color: "var(--ink)", fontWeight: 600 }}>Due today</dt>
                  <dd className="total">{formatGBP(care!.pricePence)}</dd>
                </>
              )}
            </dl>
          </div>

          {sendError ? (
            <div className="notice notice--err" style={{ marginTop: 14 }}>
              Heads up: your details didn&apos;t reach me automatically.{" "}
              <a href={mailtoHref} className="text-link">
                Email them to me
              </a>{" "}
              so I can get started.
            </div>
          ) : null}
          {checkoutError ? (
            <div className="notice notice--err" style={{ marginTop: 14 }} role="alert">
              {checkoutError}
            </div>
          ) : null}
          {verifyNote ? (
            <div className="notice notice--err" style={{ marginTop: 14 }} role="status">
              {verifyNote} Still stuck?{" "}
              <a href={`mailto:${SITE.email}?subject=${encodeURIComponent("Payment check")}`} className="text-link">
                Email me
              </a>
              .
            </div>
          ) : null}

          <div className="wizard__actions">
            <button type="button" className="btn btn--ghost" onClick={() => go(2)}>
              Back
            </button>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {sessionId ? (
                <button type="button" className="btn btn--ghost" disabled={verifying} onClick={() => void verify(sessionId)}>
                  {verifying ? "Checking…" : "I've paid: check again"}
                </button>
              ) : null}
              <button type="button" className="btn btn--accent" disabled={checkoutLoading} onClick={() => void startCheckout()}>
                <Lock />
                {checkoutLoading
                  ? "Opening secure checkout…"
                  : `Pay ${build ? formatGBP(build.depositPence) : formatGBP(care!.pricePence)} securely`}
              </button>
            </div>
          </div>
          <p className="muted" style={{ fontSize: 13, marginTop: 14, marginBottom: 0 }}>
            Payments are handled by Stripe. Your card details never touch this website.
          </p>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="center" style={{ padding: "12px 0" }}>
          <CheckCircle className="size-12" />
          <H className="h3" style={{ margin: "14px 0 8px" }}>
            {isBuild(intent)
              ? "Deposit received. Your site is officially booked in!"
              : paid
                ? "Your care plan is active."
                : intent === "preview"
                  ? "Preview requested!"
                  : "Message received!"}
          </H>
          <p className="muted" style={{ maxWidth: 560, margin: "0 auto 22px" }}>
            {isBuild(intent)
              ? "Next step: fill in the short project form so I can start designing. I'll be in touch within one working day."
              : paid
                ? "Thank you. I'll email you within one working day to get everything set up."
                : intent === "preview"
                  ? "I'll take a look at your business and email you within one working day to get your free homepage preview started."
                  : "Thanks for getting in touch. I'll reply by email within one working day."}
          </p>
          {isBuild(intent) ? (
            <a href={SITE.projectFormUrl} target="_blank" rel="noopener noreferrer" className="btn btn--accent">
              Open the project form <ArrowUpRight />
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
