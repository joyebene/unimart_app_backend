import * as dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

import { User } from "../entity/user";
import { config } from "../config";

const resend = new Resend(config.RESEND_API_KEY!);

export const sendOtpEmail = async (user: User, otp: string): Promise<void> => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Your UniMart OTP</title>
</head>

<body style="margin:0;padding:0;background-color:#0a2540;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#112a5e;border-radius:12px;overflow:hidden;">
    
    <div style="padding:30px;text-align:center;background:#0a2540;">
      <h1 style="color:#fff;margin:0;">UNIMART</h1>
      <p style="color:#60a5fa;font-size:12px;">CAMPUS • SECURE • INSTANT</p>
    </div>

    <div style="padding:30px;text-align:center;">
      <p style="color:#cbd5e1;">Your One-Time Password</p>
      <h2 style="font-size:40px;letter-spacing:8px;color:#fff;">${otp}</h2>
      <p style="color:#94a3b8;">Expires in 5 minutes</p>
    </div>

    <div style="padding:0 30px 30px;color:#cbd5e1;">
      <p>Hello,</p>
      <p>Use the code above to complete your action on UniMart.</p>
      <p>If you didn’t request this, ignore this email.</p>
    </div>

    <div style="background:#0a2540;padding:20px;text-align:center;color:#64748b;font-size:12px;">
      © ${new Date().getFullYear()} UniMart • Bauchi
    </div>

  </div>
</body>
</html>
`;

    try {
        const response = await resend.emails.send({
            from: "Unimart <onboarding@resend.dev>",
            to: user.email,
            subject: "Your UniMart Verification Code",
            html: htmlContent,
            text: `Your OTP is ${otp}. It expires in 5 minutes.`,
            replyTo: "unimart569569@gmail.com",
        });

    } catch (error) {
        console.error("❌ Resend error:", error);
        throw new Error("Failed to send OTP email");
    }
};