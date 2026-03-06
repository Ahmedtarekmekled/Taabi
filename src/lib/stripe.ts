import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock_123", {
  apiVersion: "2026-02-25.clover", // always pin to a specific version
  typescript: true,
});

// Create a Stripe customer when merchant registers
export async function createStripeCustomer(merchant: {
  id: string;
  email: string;
  nameEn: string;
}) {
  const customer = await stripe.customers.create({
    email: merchant.email,
    name: merchant.nameEn,
    metadata: { merchantId: merchant.id },
  });
  return customer.id; // save as stripeCustomerId
}

// Create checkout session for plan upgrade
export async function createCheckoutSession(opts: {
  stripeCustomerId: string;
  priceId: string; // e.g. process.env.STRIPE_GROWTH_PRICE_ID
  merchantId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    customer: opts.stripeCustomerId,
    mode: "subscription",
    line_items: [{ price: opts.priceId, quantity: 1 }],
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
    metadata: { merchantId: opts.merchantId },
    subscription_data: {
      metadata: { merchantId: opts.merchantId },
      trial_period_days: 14, // 14-day free trial on paid plans
    },
    allow_promotion_codes: true,
  });
  return session.url;
}

// Open Stripe Billing Portal (manage plan, payment, invoices)
export async function createBillingPortalSession(opts: {
  stripeCustomerId: string;
  returnUrl: string;
}) {
  const session = await stripe.billingPortal.sessions.create({
    customer: opts.stripeCustomerId,
    return_url: opts.returnUrl,
  });
  return session.url;
}
