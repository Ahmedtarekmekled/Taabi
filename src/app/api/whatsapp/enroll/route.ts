import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phoneNumber, passId, language = "en" } = body;

    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, error: "Phone number is required." },
        { status: 400 }
      );
    }

    // This is a mock implementation of WhatsApp Business API enrollment.
    // In a production environment with Composio/Rube MCP, you would:
    // 1. Validate the number format.
    // 2. Call WHATSAPP_SEND_TEMPLATE_MESSAGE with a pre-approved loyalty template.
    // e.g.:
    /*
      await composioClient.executeAction("WHATSAPP_SEND_TEMPLATE_MESSAGE", {
        to: phoneNumber,
        template_name: "loyalty_enrollment",
        language_code: language === "ar" ? "ar" : "en_US",
        components: [
          { type: "body", parameters: [{ type: "text", text: passId }] }
        ]
      });
    */

    console.log(`[WhatsApp Mock] Sending enrollment message to ${phoneNumber} in ${language} for pass ${passId}`);

    // Provide a WhatsApp Web fallback link for the UI
    const textMessage = language === "ar" 
      ? `مرحباً! اضغط هنا للحصول على بطاقة الولاء الخاصة بك: https://stampwallet.demo/p/${passId}`
      : `Hello! Click here to get your loyalty card: https://stampwallet.demo/p/${passId}`;
      
    const waLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(textMessage)}`;

    return NextResponse.json({
      success: true,
      waLink,
      message: "WhatsApp message simulated successfully."
    });
    
  } catch (error) {
    console.error("WhatsApp Enrollment Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send WhatsApp message" },
      { status: 500 }
    );
  }
}
