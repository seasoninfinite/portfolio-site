import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { STRIPE_MODE_BY_PLAN, STRIPE_PRICE_ID_BY_PLAN, type PurchasePlan } from "@/lib/stripe-config";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

const rateLimitWindowMs = 60_000;
const rateLimitMax = 20;
const requestLog = new Map<string, number[]>();

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(key) ?? []).filter((time) => now - time < rateLimitWindowMs);
  recent.push(now);
  requestLog.set(key, recent);
  return recent.length > rateLimitMax;
}

function isPurchasePlan(value: string): value is PurchasePlan {
  return value === "basic" || value === "standard" || value === "premium" || value === "care";
}

/** Map Stripe errors to a safe client message; always log detail for Netlify/host logs. */
function checkoutCreateErrorMessage(err: unknown): string {
  const e = err as { type?: string; code?: string; message?: string } | null;
  const type = e?.type ?? "";
  const code = e?.code ?? "";
  const message = (e?.message ?? "").toLowerCase();

  console.error("[stripe create-checkout-session]", type, code, e?.message ?? err);

  if (code === "resource_missing" || message.includes("no such price")) {
    return "Stripe could not find this price. Use price IDs from the same Stripe account and mode (test vs live) as your secret key — set STRIPE_PRICE_* env vars or update stripe-config.";
  }
  if (type === "StripeAuthenticationError" || code === "api_key_expired") {
    return "Stripe rejected the API key. Check STRIPE_SECRET_KEY in your host settings matches Dashboard (test or live).";
  }
  if (
    message.includes("test mode") ||
    message.includes("live mode") ||
    message.includes("a similar object exists in live mode") ||
    message.includes("a similar object exists in test mode")
  ) {
    return "Test/live mismatch: Stripe secret key mode must match your price IDs (test key + test prices, or live + live).";
  }
  return "Unable to create checkout session.";
}

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe server key is not configured." }, { status: 500 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  try {
    const body = (await request.json()) as {
      plan?: string;
      customerName?: string;
      customerEmail?: string;
    };

    if (!body.plan || !isPurchasePlan(body.plan)) {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    const origin = request.nextUrl.origin;
    const session = await stripe.checkout.sessions.create({
      mode: STRIPE_MODE_BY_PLAN[body.plan],
      line_items: [{ price: STRIPE_PRICE_ID_BY_PLAN[body.plan], quantity: 1 }],
      customer_email: body.customerEmail?.trim()?.toLowerCase() || undefined,
      success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}#contact`,
      cancel_url: `${origin}/?checkout=cancel#contact`,
      metadata: {
        plan: body.plan,
        customerName: (body.customerName || "").trim().slice(0, 100),
      },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    return NextResponse.json({ error: checkoutCreateErrorMessage(err) }, { status: 500 });
  }
}
