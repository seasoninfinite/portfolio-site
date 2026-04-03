export type PurchasePlan = "basic" | "standard" | "premium" | "care";

export const STRIPE_PRICE_ID_BY_PLAN: Record<PurchasePlan, string> = {
  basic: "price_1THmFU2Ler0oWiiWFWaogXpc",
  standard: "price_1THmHm2Ler0oWiiW1d8IpgWd",
  premium: "price_1THmOM2Ler0oWiiWxm3HWz2t",
  care: "price_1THT342Ler0oWiiWfPCZwfvw",
};

export const STRIPE_MODE_BY_PLAN: Record<PurchasePlan, "payment" | "subscription"> = {
  basic: "payment",
  standard: "payment",
  premium: "payment",
  care: "subscription",
};
