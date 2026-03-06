import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
// import { getServerSession } from "@/lib/auth"; // Assumed auth
// import { prisma } from "@/lib/prisma"; // Assumed database access

export async function POST(req: Request) {
  try {
    // 1. Get user session
    // const session = await getServerSession();
    // if (!session) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    // 2. Parse request body
    const body = await req.json();
    const { priceId } = body;

    if (!priceId) {
      return new NextResponse("Price ID is required", { status: 400 });
    }

    // 3. Get merchant account from db (Mocked for now)
    // const merchant = await prisma.merchant.findUnique({ where: { id: session.merchantId } });
    const mockMerchant = {
      id: "mock_merchant_id",
      stripeCustomerId: "cus_mock123", // In a real app, this is created at registration
    };

    if (!mockMerchant.stripeCustomerId) {
      return new NextResponse("No Stripe customer found", { status: 400 });
    }

    // 4. Create checkout session
    const checkoutUrl = await createCheckoutSession({
      stripeCustomerId: mockMerchant.stripeCustomerId,
      priceId,
      merchantId: mockMerchant.id,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/en/dashboard/settings/billing?success=true`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/en/dashboard/settings/billing?canceled=true`,
    });

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("[BILLING_CHECKOUT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
