import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { passSerial, locationId, staffId } = await req.json();

    if (!passSerial) {
      return NextResponse.json(
        { success: false, error: "Pass serial number is required" },
        { status: 400 }
      );
    }

    // In a real scenario, this would check Prisma for the pass
    // await prisma.pass.findUnique({ where: { passSerial } })
    
    // Simulate finding the pass and checking if a reward is available
    const isMockRewardUnlocked = false; // Toggle this to test different flows

    if (isMockRewardUnlocked) {
      // Mock Reward Redemption
      // Decrement stamps or mark reward as claimed
      console.log(`[API Mock] Redeeming reward for pass: ${passSerial}`);
      
      return NextResponse.json({
        success: true,
        action: "REDEEMED",
        message: "Reward claimed successfully!",
        data: {
          remainingStamps: 0,
          rewardType: "Free Coffee"
        }
      });
    }

    // Mock issuing a standard stamp
    console.log(`[API Mock] Issuing stamp to pass: ${passSerial} at location: ${locationId}`);
    
    return NextResponse.json({
      success: true,
      action: "STAMP_ISSUED",
      message: "1 Stamp added successfully!",
      data: {
        newTotal: 5,
        requiredTotal: 10
      }
    });

  } catch (error) {
    console.error("Stamp/Redeem API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
