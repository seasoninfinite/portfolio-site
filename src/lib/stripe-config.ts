import { checkoutAmount, type PurchasePlan } from "@/data/pricing";

export type { PurchasePlan };

export const PURCHASE_PLANS: PurchasePlan[] = ["onepage", "basic", "standard", "premium", "care", "priority"];

export function isPurchasePlan(value: string): value is PurchasePlan {
  return (PURCHASE_PLANS as string[]).includes(value);
}

/**
 * Line item for Stripe Checkout. Prices come from src/data/pricing.ts (server-side, never trusted from
 * the browser), sent as inline price_data so no Price IDs need creating in the Stripe dashboard.
 * Builds charge the 50% deposit; care plans are monthly subscriptions.
 */
export function stripeLineItem(plan: PurchasePlan) {
  const { pence, mode, label } = checkoutAmount(plan);
  return {
    mode,
    lineItem: {
      quantity: 1,
      price_data: {
        currency: "gbp",
        unit_amount: pence,
        product_data: { name: `BGG Website Design: ${label}` },
        ...(mode === "subscription" ? { recurring: { interval: "month" as const } } : {}),
      },
    },
  };
}
