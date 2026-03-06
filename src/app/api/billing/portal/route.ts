import { NextResponse } from "next/server";
import { createBillingPortalSession } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    // 1. Get user session 
    // const session = await getServerSession();

    // 2. Get merchant account
    // const merchant = await prisma.merchant.findUnique({ where: { id: session.merchantId } });

    const mockMerchant = {
      id: "mock_merchant_id",
      stripeCustomerId: "cus_mock123", // Usually cus_...
    };

    if (!mockMerchant.stripeCustomerId) {
      return new NextResponse("No Stripe customer found", { status: 400 });
    }

    // 3. Create portal session
    const portalUrl = await createBillingPortalSession({
      stripeCustomerId: mockMerchant.stripeCustomerId,
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/en/dashboard/settings/billing`,
    });

    return NextResponse.json({ url: portalUrl });
  } catch (error) {
    console.error("[BILLING_PORTAL]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
