import { BrevoClient } from "@getbrevo/brevo";
import { User } from "../entity/user";
import { config } from "../config";


const brevo = new BrevoClient({
  apiKey: config.BREVO_API_KEY!,
});

export const sendOtpEmail = async (user: User, otp: string): Promise<void> => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Your UniMart OTP</title>
<style>
  body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
  .container { max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 40px; border: 1px solid #dddddd; text-align: center; }
  .header h1 { margin: 0; font-size: 28px; color: #333333; }
  .content p { color: #555555; font-size: 16px; }
  .otp-code { font-size: 40px; font-weight: bold; letter-spacing: 6px; color: #000000; margin: 30px 0; }
  .footer { margin-top: 30px; font-size: 12px; color: #888888; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>UNIMART</h1>
    </div>
    <div class="content">
      <p>Your One-Time Password is:</p>
      <div class="otp-code">${otp}</div>
      <p>This code will expire in 5 minutes.</p>
      <p>If you did not request this code, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} UniMart. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

  try {

    await brevo.transactionalEmails.sendTransacEmail({

      subject: "Your UniMart Verification Code",
      htmlContent: htmlContent,
      sender: { name: "UniMart", email: config.BREVO_FROM_EMAIL! },
      to: [{ email: user.email }],
      textContent: `Your OTP is ${otp}. It expires in 5 minutes.`,

    })

    console.log(`✅ OTP email sent to ${user.email} via Brevo`);
  } catch (error) {
    console.error("❌ Brevo error:", error);
    throw new Error("Failed to send OTP email");
  }
};