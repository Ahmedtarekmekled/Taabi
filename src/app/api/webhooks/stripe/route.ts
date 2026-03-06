import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
// import { prisma } from "@/lib/prisma"; // Assumed database access
import Stripe from "stripe";

// Map Stripe Price IDs to our internal plan names
const PLAN_MAP: Record<string, string> = {
  [process.env.STRIPE_GROWTH_PRICE_ID!]: "GROWTH",
  [process.env.STRIPE_PRO_PRICE_ID!]: "PRO",
};

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Ensure this is a subscription checkout
        if (session.mode !== "subscription" || !session.subscription) {
          break;
        }

        const sub = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        const priceId = sub.items.data[0].price.id;
        const plan = PLAN_MAP[priceId] ?? "FREE";
        const merchantId = session.metadata?.merchantId;

        if (merchantId) {
          // await prisma.merchant.update({
          //   where: { id: merchantId },
          //   data: {
          //     stripeCustomerId: session.customer as string,
          //     stripeSubscriptionId: sub.id,
          //     stripePriceId: priceId,
          //     stripeCurrentPeriodEnd: new Date(sub.current_period_end * 1000),
          //     plan: plan as any,
          //     planStatus: "ACTIVE",
          //   },
          // });
          console.log(`[Stripe Webhook] Upgraded merchant ${merchantId} to ${plan}`);
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as any;
        if (!invoice.subscription) break;
        
        const sub = await stripe.subscriptions.retrieve(
          invoice.subscription as string
        );

        // await prisma.merchant.updateMany({
        //   where: { stripeSubscriptionId: sub.id },
        //   data: {
        //     stripeCurrentPeriodEnd: new Date(sub.current_period_end * 1000),
        //     planStatus: "ACTIVE",
        //   },
        // });
        console.log(`[Stripe Webhook] Invoice payment succeeded for sub ${sub.id}`);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as any;
        if (!invoice.subscription) break;

        // await prisma.merchant.updateMany({
        //   where: { stripeSubscriptionId: invoice.subscription as string },
        //   data: { planStatus: "PAST_DUE" },
        // });
        console.log(`[Stripe Webhook] Invoice payment failed for sub ${invoice.subscription}`);
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        
        // await prisma.merchant.updateMany({
        //   where: { stripeSubscriptionId: sub.id },
        //   data: {
        //     plan: "FREE",
        //     planStatus: "CANCELED",
        //     stripeSubscriptionId: null,
        //     stripePriceId: null,
        //   },
        // });
        console.log(`[Stripe Webhook] Subscription canceled: ${sub.id}`);
        break;
      }
      
      default:
        console.log(`[Stripe Webhook] Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`[Stripe Webhook Error]`, err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
