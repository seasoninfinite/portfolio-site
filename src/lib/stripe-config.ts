export type PurchasePlan = "basic" | "standard" | "premium" | "care";

function priceId(envKey: string, fallback: string): string {
  const v = process.env[envKey]?.trim();
  return v && v.length > 0 ? v : fallback;
}

/** Repo defaults are live-mode IDs; set STRIPE_PRICE_* on the host for test prices or another Stripe account. */
export const STRIPE_PRICE_ID_BY_PLAN: Record<PurchasePlan, string> = {
  basic: priceId("STRIPE_PRICE_BASIC", "price_1THmFU2Ler0oWiiWFWaogXpc"),
  standard: priceId("STRIPE_PRICE_STANDARD", "price_1THmHm2Ler0oWiiW1d8IpgWd"),
  premium: priceId("STRIPE_PRICE_PREMIUM", "price_1THmOM2Ler0oWiiWxm3HWz2t"),
  care: priceId("STRIPE_PRICE_CARE", "price_1THT342Ler0oWiiWfPCZwfvw"),
};

export const STRIPE_MODE_BY_PLAN: Record<PurchasePlan, "payment" | "subscription"> = {
  basic: "payment",
  standard: "payment",
  premium: "payment",
  care: "subscription",
};
