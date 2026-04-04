import { BrevoClient } from "@getbrevo/brevo";
import { config } from "../config";
import { User } from "../entity/user";

/**
 * Creates a simple, clean HTML email template for notifications.
 */
const createSimpleNotification = (title: string, mainContent: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
  body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; color: #333; }
  .container { max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 40px; border: 1px solid #dddddd; }
  .header { text-align: center; border-bottom: 1px solid #eeeeee; padding-bottom: 20px; margin-bottom: 20px; }
  .header h1 { margin: 0; font-size: 28px; color: #333333; }
  .content { font-size: 16px; line-height: 1.6; }
  .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #888888; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${title}</h1>
    </div>
    <div class="content">
      ${mainContent}
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} UniMart. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

/**
 * Sends a general notification email using Brevo with a simple template.
 */
export const sendNotificationEmail = async (
  user: User,
  subject: string,
  body: string // body can contain HTML for flexibility
): Promise<void> => {
  const htmlContent = createSimpleNotification(subject, body);

  const brevo = new BrevoClient({ apiKey: config.BREVO_API_KEY! });

  try {
    await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        name: "UniMart",
        email: config.BREVO_FROM_EMAIL!,
      },
      to: [{ email: user.email }],
      subject: subject,
      htmlContent: htmlContent,
    });

    console.log(`✅ Notification email sent to ${user.email} via Brevo`);
  } catch (error) {
    console.error("❌ Brevo notification error:", error);
    throw new Error("Failed to send notification email");
  }
};