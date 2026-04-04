"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, CreditCard, Loader2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type PurchasePlan = "basic" | "standard" | "premium" | "care";
type ContactIntent = PurchasePlan | "special" | "general";

const intentLabels: Record<ContactIntent, string> = {
  basic: "I would like to purchase a Basic website",
  standard: "I would like to purchase a Standard website",
  premium: "I would like to purchase a Premium website",
  care: "Website Care Plan (I have already made a site with you or I have a code-based site)",
  special: "I have a special request",
  general: "General inquiry",
};

const purchasable: ContactIntent[] = ["basic", "standard", "premium", "care"];

/** Stripe checkout applies */
function needsPaymentStep(intent: ContactIntent | ""): boolean {
  return !!intent && purchasable.includes(intent);
}

/** Project Google Form on finish (site builds only) */
function needsProjectFormStep(intent: ContactIntent | ""): boolean {
  return intent === "basic" || intent === "standard" || intent === "premium";
}

/** Display labels aligned with Stripe products / prices.csv */
const planDisplayPrices: Record<PurchasePlan, string> = {
  basic: "£75.00",
  standard: "£125.00",
  premium: "£200.00",
  care: "£10.00 / month",
};
const PROJECT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSclJL3r-v-1n8z49bvHd8TXKg-ty9pu_nA5x2wvi1N0qpbnNA/viewform?usp=sharing&ouid=115643113121012243384";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const SUPPORT_EMAIL = "bggwebsitedesign@gmail.com";

function paymentVerificationErrorMailto(name: string, email: string, planLabel: string): string {
  const subject = encodeURIComponent("Payment verification issue — please confirm");
  const body = encodeURIComponent(
    `Hi,\n\nI'm having trouble confirming payment after Stripe checkout on your site.\n\n` +
      `My email: ${email.trim() || "(please add your email here)"}\n` +
      `My name: ${name.trim() || "(please add your name)"}\n` +
      `Plan: ${planLabel}\n\n` +
      `Please confirm whether my payment went through.\n\n` +
      `Thanks`
  );
  return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
}

/**
 * Must match `plan.subject` / `carePlan.subject` in `portfolio-pricing-section.tsx` (exact label after decode).
 * Avoid substring checks like `.includes("basic")` — they can mis-match other strings.
 */
const PLAN_QUERY_TO_INTENT: Record<string, ContactIntent> = {
  "basic website design": "basic",
  "standard website design": "standard",
  "advanced website design": "premium",
  "website care plan": "care",
};

function toIntent(plan: string | null): ContactIntent | null {
  if (!plan) return null;
  const key = plan.trim().toLowerCase();
  return PLAN_QUERY_TO_INTENT[key] ?? null;
}

export function ContactPaymentSection() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [intent, setIntent] = useState<ContactIntent | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [emailDraftOpened, setEmailDraftOpened] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [checkoutSessionId, setCheckoutSessionId] = useState<string | null>(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [verifyFeedback, setVerifyFeedback] = useState<string | null>(null);
  const [toastMounted, setToastMounted] = useState(false);
  const [checkoutPrepareError, setCheckoutPrepareError] = useState<string | null>(null);
  const draftByIntentRef = useRef<Partial<Record<ContactIntent, { name: string; email: string; message: string }>>>({});
  const autoCheckoutAttemptedRef = useRef(false);

  const resolvedIntent = intent || null;
  const intentChosen = !!resolvedIntent;
  const needsPayment = needsPaymentStep(resolvedIntent ?? "");
  const needsForm = needsProjectFormStep(resolvedIntent ?? "");
  /** Stepper only: N/A + yellow rings after user picks an option */
  const payApplies = intentChosen && needsPayment;
  const formApplies = intentChosen && needsForm;
  const selectedPlan = needsPayment ? (resolvedIntent as PurchasePlan) : null;
  const validEmail = EMAIL_RE.test(email.trim());

  const paymentErrorMailtoHref = useMemo(() => {
    const planLabel = selectedPlan ? intentLabels[selectedPlan] : "—";
    return paymentVerificationErrorMailto(name, email, planLabel);
  }, [name, email, selectedPlan]);

  const progress = useMemo(() => (step / 4) * 100, [step]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planFromPricing = toIntent(params.get("plan"));
    const checkout = params.get("checkout");
    const stored = window.sessionStorage.getItem("contact-payment-draft");

    if (planFromPricing) {
      window.sessionStorage.removeItem("contact-payment-draft");
      setIntent(planFromPricing);
      setStep(2);
      setName("");
      setEmail("");
      setAgreeTerms(false);
      setEmailDraftOpened(false);
      setMessage(`I am contacting you about: ${intentLabels[planFromPricing]}.\n\nDetails:`);
      return;
    }

    if (checkout === "cancel" && stored) {
      try {
        const parsed = JSON.parse(stored) as {
          intent?: ContactIntent;
          name?: string;
          email?: string;
          message?: string;
          agreeTerms?: boolean;
          emailDraftOpened?: boolean;
        };
        if (parsed.intent) setIntent(parsed.intent);
        if (parsed.name) setName(parsed.name);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.message) setMessage(parsed.message);
        setAgreeTerms(!!parsed.agreeTerms);
        setEmailDraftOpened(!!parsed.emailDraftOpened);
        setStep(3);
      } catch {
        // Ignore invalid storage data.
      }
    }
  }, []);

  useEffect(() => {
    if (!intent) return;
    if (message.trim().length > 0) return;
    setMessage(`I am contacting you about: ${intentLabels[intent]}.\n\nDetails:`);
  }, [intent, message]);

  /** Guard: never stay on payment step when this option has no payment */
  useEffect(() => {
    if (step === 3 && resolvedIntent && !needsPaymentStep(resolvedIntent)) {
      setStep(2);
    }
  }, [step, resolvedIntent]);

  const canSendEmailDraft =
    !!resolvedIntent &&
    name.trim().length > 1 &&
    validEmail &&
    message.trim().length > 8 &&
    (!needsPayment || agreeTerms);

  const saveDraftForCheckout = () => {
    const payload = { intent, name, email, message, agreeTerms, emailDraftOpened: true };
    window.sessionStorage.setItem("contact-payment-draft", JSON.stringify(payload));
  };

  const createCheckoutSession = async () => {
    if (!selectedPlan || !canSendEmailDraft) return;
    setLoadingCheckout(true);
    setCheckoutPrepareError(null);
    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: selectedPlan,
          customerName: name.trim(),
          customerEmail: email.trim().toLowerCase(),
        }),
      });
      const data = (await response.json()) as { url?: string; sessionId?: string; error?: string };
      if (!response.ok || !data.url || !data.sessionId) {
        throw new Error(data.error || "Unable to create checkout session");
      }
      setCheckoutUrl(data.url);
      setCheckoutSessionId(data.sessionId);
      setCheckoutPrepareError(null);
    } catch {
      setCheckoutUrl(null);
      setCheckoutSessionId(null);
      setCheckoutPrepareError(
        "Checkout could not be prepared. Check your connection, then try again."
      );
    } finally {
      setLoadingCheckout(false);
    }
  };

  const verifyPayment = async (sessionId: string) => {
    setVerifyFeedback(null);
    setVerifyingPayment(true);
    try {
      const response = await fetch(`/api/stripe/checkout-session-status?session_id=${encodeURIComponent(sessionId)}`);
      const data = (await response.json()) as { paid?: boolean };
      if (response.ok && data.paid) {
        setPaymentVerified(true);
        setStep(4);
        window.sessionStorage.removeItem("contact-payment-draft");
        return;
      }
      if (response.ok && data.paid === false) {
        setVerifyFeedback(
          "You haven't completed payment yet. Finish checkout in the Stripe tab, then tap verify again."
        );
        return;
      }
      setVerifyFeedback("We couldn't verify that payment. Please try again in a moment.");
    } finally {
      setVerifyingPayment(false);
    }
  };

  useEffect(() => {
    if (step !== 3) {
      autoCheckoutAttemptedRef.current = false;
      setCheckoutPrepareError(null);
    }
  }, [step]);

  useEffect(() => {
    if (step !== 3 || !selectedPlan || checkoutUrl || loadingCheckout) return;
    if (autoCheckoutAttemptedRef.current) return;
    autoCheckoutAttemptedRef.current = true;
    void createCheckoutSession();
  }, [step, selectedPlan, checkoutUrl, loadingCheckout]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    const checkoutState = params.get("checkout");
    if (checkoutState === "success" && sessionId) {
      setStep(3);
      setCheckoutSessionId(sessionId);
      void verifyPayment(sessionId);
      params.delete("checkout");
      params.delete("session_id");
      const cleaned = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}${window.location.hash}`;
      window.history.replaceState({}, "", cleaned);
    }
  }, []);

  useEffect(() => {
    if (step !== 3) setVerifyFeedback(null);
  }, [step]);

  useEffect(() => {
    if (!verifyFeedback) return;
    const t = window.setTimeout(() => setVerifyFeedback(null), 6000);
    return () => window.clearTimeout(t);
  }, [verifyFeedback]);

  useEffect(() => {
    setToastMounted(true);
  }, []);

  const changeIntent = (next: ContactIntent | "") => {
    if (intent) {
      draftByIntentRef.current[intent] = { name, email, message };
    }

    setIntent(next);
    setAgreeTerms(false);
    setEmailDraftOpened(false);
    setCheckoutUrl(null);
    setCheckoutSessionId(null);
    setPaymentVerified(false);

    if (!next) {
      setName("");
      setEmail("");
      setMessage("");
      return;
    }

    const saved = draftByIntentRef.current[next];
    if (saved) {
      setName(saved.name);
      setEmail(saved.email);
      setMessage(saved.message);
      return;
    }
    setName("");
    setEmail("");
    setMessage(`I am contacting you about: ${intentLabels[next]}.\n\nDetails:`);
  };

  const openEmailDraft = () => {
    if (!resolvedIntent || !canSendEmailDraft) return;
    const subject = encodeURIComponent(`Website inquiry: ${intentLabels[resolvedIntent]}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nIntent: ${intentLabels[resolvedIntent]}\nTerms agreed: ${agreeTerms ? "Yes" : "No"}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:ben@bgg.studio?subject=${subject}&body=${body}`;
    setEmailDraftOpened(true);
    if (!needsPayment) {
      return;
    }
  };

  const stepColumnLabel = (col: 1 | 2 | 3 | 4) => {
    if (col === 1) return "Choose";
    if (col === 2) return "Details";
    if (col === 3) {
      if (!intentChosen) return "Payment";
      return payApplies ? (
        "Payment"
      ) : (
        <span className="font-medium text-yellow-400">N/A</span>
      );
    }
    if (col === 4) {
      if (!intentChosen) return "Project form";
      return formApplies ? (
        "Project form"
      ) : (
        <span className="font-medium text-yellow-400">N/A</span>
      );
    }
    return null;
  };

  const columnRing = (col: 1 | 2 | 3 | 4): "upcoming" | "active" | "done" | "skipped" => {
    if (!intentChosen) {
      if (step === col) return "active";
      if (step > col) return "done";
      return "upcoming";
    }
    if (col === 3 && !payApplies) return "skipped";
    /** N/A project form: keep yellow skipped styling on step 4 too (never violet “active”) */
    if (col === 4 && !formApplies) return "skipped";
    if (step === col) return "active";
    if (step > col) return "done";
    return "upcoming";
  };

  const circleClassForColumn = (col: 1 | 2 | 3 | 4) => {
    const st = columnRing(col);
    if (st === "active") {
      return "border-violet-400 bg-violet-500/20 text-white ring-2 ring-violet-400/40";
    }
    if (st === "done") {
      return "border-violet-400 bg-violet-500/20 text-white";
    }
    if (st === "skipped") {
      return "border-yellow-500/45 bg-yellow-500/10 text-yellow-200/90";
    }
    return "border-white/20 text-white/60";
  };

  return (
    <section id="contact" className="relative border-t border-white/10 bg-black px-6 py-16 md:py-20">
      <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Lets start building my site today!
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-white/55 md:text-base">
          Clear step by step flow, so you always know what happens next.
        </p>

        <div className="mx-auto mt-6 max-w-2xl">
          <div className="relative mb-3 h-1.5 w-full overflow-hidden rounded-full bg-white/12">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {([1, 2, 3, 4] as const).map((n) => (
              <div key={n} className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                    circleClassForColumn(n)
                  )}
                >
                  {n}
                </div>
                <p className="min-h-[2rem] text-center text-[11px] leading-tight text-white/60">
                  {stepColumnLabel(n)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {step === 1 ? (
          <div className="mt-8 space-y-4">
            <p className="text-center text-sm text-white/60">Choose what you need:</p>
            <select
              value={intent}
              onChange={(e) => changeIntent(e.target.value as ContactIntent)}
              aria-label="Choose inquiry type"
              className="w-full appearance-none rounded-xl border border-white/20 bg-zinc-950 px-4 py-3 text-sm text-white outline-none ring-0 focus:border-violet-400"
              style={{ colorScheme: "dark" }}
            >
              <option value="" className="bg-zinc-950 text-white">
                Select an option
              </option>
              {(["basic", "standard", "premium", "care", "special", "general"] as ContactIntent[]).map((k) => (
                <option key={k} value={k} className="bg-zinc-950 text-white">
                  {intentLabels[k]}
                </option>
              ))}
            </select>
            <div className="flex justify-center">
              <button
                type="button"
                disabled={!intent}
                className={cn(buttonVariants({ size: "lg" }), "rounded-full disabled:opacity-50")}
                onClick={() => setStep(2)}
              >
                Continue
              </button>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="mt-8 grid gap-4">
            <p className="text-center text-sm text-white/60">
              Fill this in, then send the email draft.
            </p>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="rounded-xl border border-white/20 bg-black/30 px-4 py-3 text-white placeholder:text-white/40"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className={cn(
                "rounded-xl border bg-black/30 px-4 py-3 text-white placeholder:text-white/40",
                email.length > 0 && !validEmail ? "border-red-400/70" : "border-white/20"
              )}
              required
            />
            {email.length > 0 && !validEmail ? (
              <p className="text-xs text-red-300">Please enter a real email address.</p>
            ) : null}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              aria-label="Project details message"
              placeholder="Tell me what you need for your project..."
              className="rounded-xl border border-white/20 bg-black/30 px-4 py-3 text-white placeholder:text-white/40"
              required
            />

            {needsPayment ? (
              <label className="flex items-start gap-2 text-sm text-white/70">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1"
                />
                I agree to the{" "}
                <a
                  href="https://1drv.ms/b/c/b7227f61a4ced3d4/IQDRGY0SW_bCRIAvsTa2NkqVAbTqaLe-HUi9bsYgeLLfe3A?e=3KN0Ze"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-white"
                >
                  terms and conditions
                </a>{" "}
                before moving to payment.
              </label>
            ) : null}

            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"
                )}
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                type="button"
                disabled={!canSendEmailDraft}
                className={cn(buttonVariants({ size: "lg" }), "rounded-full disabled:opacity-50")}
                onClick={openEmailDraft}
              >
                {needsPayment ? "Send email draft" : "Send inquiry email"}
              </button>
              {needsPayment ? (
                <button
                  type="button"
                  disabled={!emailDraftOpened}
                  className={cn(buttonVariants({ size: "lg" }), "rounded-full disabled:opacity-50")}
                  onClick={() => setStep(3)}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!emailDraftOpened}
                  className={cn(buttonVariants({ size: "lg" }), "rounded-full disabled:opacity-50")}
                  onClick={() => setStep(4)}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        ) : null}

        {step === 3 && needsPayment ? (
          <div className="mt-8 flex flex-col items-center gap-4 text-center">
            <CreditCard className="size-10 text-violet-300" />
            <p className="text-white/85">Use the Stripe payment link for your selected plan.</p>
            {selectedPlan ? (
              <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-violet-400/25 bg-gradient-to-br from-violet-500/[0.14] via-fuchsia-500/[0.06] to-transparent p-5 text-left shadow-[0_12px_40px_-16px_rgba(139,92,246,0.45)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-200/90">
                  Secure Stripe checkout
                </p>
                <div className="mt-3 rounded-xl border border-white/10 bg-black/35 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/50">Plan price</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{planDisplayPrices[selectedPlan]}</p>
                </div>
                {loadingCheckout ? (
                  <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-black/40 px-4 py-3.5 text-sm text-white/80">
                    <Loader2 className="size-4 animate-spin" />
                    Preparing checkout...
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={!checkoutUrl}
                    className={cn(buttonVariants({ size: "lg" }), "mt-4 w-full rounded-xl disabled:opacity-50")}
                    onClick={() => {
                      if (!checkoutUrl) return;
                      saveDraftForCheckout();
                      window.open(checkoutUrl, "_blank", "noopener,noreferrer");
                    }}
                  >
                    Open Stripe checkout
                  </button>
                )}
                {checkoutPrepareError ? (
                  <div className="mt-3 rounded-xl border border-red-400/35 bg-red-950/40 px-4 py-3 text-left text-sm text-red-100/95">
                    <p>{checkoutPrepareError}</p>
                    <button
                      type="button"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "mt-3 w-full border-white/25 bg-black/40 text-white hover:bg-white/10"
                      )}
                      onClick={() => void createCheckoutSession()}
                    >
                      Try again
                    </button>
                  </div>
                ) : null}
                <div className="mt-3 flex w-full flex-col gap-3">
                  <button
                    type="button"
                    disabled={!checkoutSessionId || verifyingPayment}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "w-full rounded-xl border-white/25 bg-black/30 text-white hover:bg-white/10 disabled:opacity-50"
                    )}
                    onClick={() => {
                      if (!checkoutSessionId) return;
                      void verifyPayment(checkoutSessionId);
                    }}
                  >
                    {verifyingPayment ? "Verifying..." : "I paid - verify now"}
                  </button>
                </div>
              </div>
            ) : null}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"
                )}
                onClick={() => setStep(2)}
              >
                Back
              </button>
              <button
                type="button"
                disabled={!paymentVerified}
                className={cn(buttonVariants({ size: "lg" }), "rounded-full disabled:opacity-50")}
                onClick={() => setStep(4)}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="mt-8 flex flex-col items-center gap-4 text-center">
            <CheckCircle2 className="size-10 text-emerald-400" />
            {needsPayment && selectedPlan === "care" ? (
              <>
                <p className="max-w-md text-white/85">
                  Your Care Plan subscription is confirmed. I will follow up by email.
                </p>
              </>
            ) : needsPayment && needsForm ? (
              <>
                <p className="text-white/85">
                  Payment is confirmed by Stripe. You can now continue to the project form.
                </p>
                <a
                  href={PROJECT_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
                >
                  Open project Google Form
                </a>
              </>
            ) : (
              <>
                <p className="text-white/85">
                  You are all set. I will reply to your inquiry by email after I review your message.
                </p>
                <button
                  type="button"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"
                  )}
                  onClick={() => setStep(2)}
                >
                  Back
                </button>
              </>
            )}
          </div>
        ) : null}
      </div>

      {toastMounted && verifyFeedback && typeof document !== "undefined"
        ? createPortal(
            <div
              role="alert"
              className="pointer-events-none fixed bottom-8 left-1/2 z-[9999] max-w-md -translate-x-1/2 px-4"
            >
              <div className="pointer-events-auto rounded-xl border border-red-400/40 bg-zinc-950/95 px-4 py-3 text-center text-sm text-red-100 shadow-[0_8px_32px_rgba(0,0,0,0.65)] backdrop-blur-sm">
                <p>{verifyFeedback}</p>
                <p className="mt-3 text-xs text-white/75">
                  If this is an error,{" "}
                  <a
                    href={paymentErrorMailtoHref}
                    className="font-medium text-violet-300 underline underline-offset-2 hover:text-violet-200"
                  >
                    click here
                  </a>{" "}
                  to open an email with details filled in — add or fix your email in the message if needed.
                </p>
                <button
                  type="button"
                  className="mt-3 block w-full text-xs text-white/70 underline underline-offset-2 hover:text-white"
                  onClick={() => setVerifyFeedback(null)}
                >
                  Dismiss
                </button>
              </div>
            </div>,
            document.body
          )
        : null}
    </section>
  );
}
