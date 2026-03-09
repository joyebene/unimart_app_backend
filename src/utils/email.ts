import sgMail from "@sendgrid/mail";
import { config } from "../config";
import { User } from "../entity/user";

sgMail.setApiKey(config.SENDGRID_API_KEY!);

export const sendOtpEmail = async (user: User, otp: string): Promise<void> => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your UniMart OTP</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a2540; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a2540;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <!-- Main container -->
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #112a5e; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 35px rgba(10, 37, 64, 0.7);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 25px; text-align: center; background: linear-gradient(90deg, #0a2540, #1e3a8a);">
                            <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 3px; color: #ffffff;">UNIMART</h1>
                            <p style="margin: 8px 0 0; font-size: 13px; font-weight: 500; letter-spacing: 4px; color: #60a5fa;">CAMPUS • SECURE • INSTANT</p>
                        </td>
                    </tr>
                    
                    <!-- OTP Card -->
                    <tr>
                        <td style="padding: 35px 40px;">
                            <div style="background-color: #1e40af; border-radius: 14px; padding: 45px 30px; text-align: center; border: 2px solid #3b82f6;">
                                <p style="margin: 0 0 12px; color: #bae6fd; font-size: 15px; font-weight: 600; letter-spacing: 1px;">YOUR SECURE ONE-TIME PASSWORD</p>
                                <div style="font-size: 58px; font-weight: 700; letter-spacing: 14px; color: #ffffff; background-color: #0f2b5e; padding: 18px 40px; border-radius: 10px; display: inline-block; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);">
                                    ${otp}
                                </div>
                                <p style="margin: 25px 0 0; color: #94a3b8; font-size: 15px;">
                                    This code expires in <span style="color: #60a5fa; font-weight: 600;">5 minutes</span>
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Body message -->
                    <tr>
                        <td style="padding: 0 40px 35px; color: #cbd5e1; font-size: 16px; line-height: 1.65;">
                            <p style="margin: 0 0 16px;">Hello,</p>
                            <p style="margin: 0 0 16px;">Here’s the one-time password you requested to complete your action on UniMart.</p>
                            <p style="margin: 0;">If you didn’t request this code, you can safely ignore this email.</p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #0a2540; padding: 30px 40px; text-align: center; border-top: 1px solid #1e3a8a;">
                            <p style="margin: 0; color: #64748b; font-size: 12px;">© ${new Date().getFullYear()} UniMart • Bauchi, Nigeria</p>
                            <p style="margin: 6px 0 0; color: #64748b; font-size: 12px;">Midnight Navy • Built for speed &amp; security</p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

  const msg = {
    to: user.email,
    from: config.SENDGRID_FROM_EMAIL!,
    subject: "🔐 Your UniMart Secure OTP",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ OTP email sent to ${user.email}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};