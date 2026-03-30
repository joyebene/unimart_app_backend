import { Resend } from "resend";
import { config } from "../config";
import { User } from "../entity/user";

const resend = new Resend(config.RESEND_API_KEY!);

/**
 * Reusable midnight navy template builder (same premium look as all your other emails)
 */
const createMidnightNavyNotification = (title: string, subtitle: string, mainContent: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a2540; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a2540;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #112a5e; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 35px rgba(10, 37, 64, 0.7);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 25px; text-align: center; background: linear-gradient(90deg, #0a2540, #1e3a8a);">
                            <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 3px; color: #ffffff;">UNIMART</h1>
                            <p style="margin: 8px 0 0; font-size: 13px; font-weight: 500; letter-spacing: 4px; color: #60a5fa;">CAMPUS • SECURE • INSTANT</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 35px 40px;">
                            <h2 style="margin: 0 0 12px; color: #ffffff; font-size: 24px; text-align: center;">${title}</h2>
                            <p style="margin: 0 0 25px; color: #60a5fa; font-size: 15px; text-align: center; font-weight: 500;">${subtitle}</p>
                            <div style="background-color: #1e40af; border-radius: 14px; padding: 35px; color: #cbd5e1; font-size: 16px; line-height: 1.65;">
                                ${mainContent}
                            </div>
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

/**
 * 🔥 GENERAL NOTIFICATION EMAIL (perfect for conditional messages)
 * 
 * No more OTP styling — fully flexible body (HTML) for any notification.
 * Use this for order updates, account alerts, promotions, system messages, etc.
 */
export const sendNotificationEmail = async (
  user: User,
  subject: string,
  body: string
): Promise<void> => {
  const title = subject;
  const subtitle = "UniMart Notification";

  const htmlContent = createMidnightNavyNotification(title, subtitle, body);

  try {
    await resend.emails.send({
      from: "UniMart <onboarding@resend.dev>",
      to: user.email,
      subject: subject,
      html: htmlContent,
      text: `UniMart Notification: ${subject}`, // clean plain-text fallback
    });
    console.log(`✅ Notification email sent to ${user.email}`);
  } catch (error) {
    console.error("Error sending notification email:", error);
    throw new Error("Failed to send notification email");
  }
};