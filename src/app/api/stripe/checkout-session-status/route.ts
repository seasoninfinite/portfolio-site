import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

export async function GET(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe server key is not configured." }, { status: 500 });
  }

  const sessionId = request.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id." }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid =
      session.payment_status === "paid" ||
      (session.mode === "subscription" && session.status === "complete");

    return NextResponse.json({
      paid,
      sessionId: session.id,
      mode: session.mode,
      paymentStatus: session.payment_status,
      status: session.status,
    });
  } catch {
    return NextResponse.json({ error: "Unable to verify checkout session." }, { status: 500 });
  }
}
