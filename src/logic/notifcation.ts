import { User } from "../entity/user";
import { NotificationService } from "../service/notificationService";
import { UserService } from "../service/userService";
import { sendNotificationEmail } from "../utils/emailNotif";

export class NotificationLogic {
  private notificationService = new NotificationService();
  private userService = new UserService();

  async createNotification(userId: string, title: string, body: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return this.notificationService.createNotification(user as User, title, body);
  }

  async getNotifications(userId: string) {
    return this.notificationService.getNotifications(userId);
  }

  async markAsRead(notificationId: string, userId: string) {
    const notification = await this.notificationService.markAsRead(notificationId, userId);
    if (!notification) {
      throw new Error("Notification not found");
    }
    return notification;
  }

  async markAllAsRead(userId: string) {
    await this.notificationService.markAllAsRead(userId);
    return { message: "All notifications marked as read" };
  }

  async sendBulkNotificationFromAdmin({
    subject,
    body,
    limit = 50,
  }: {
    subject: string;
    body: string;
    limit?: number;
  }) {
    const users = await this.userService.getRandom50Users(limit);

    const chunkSize = 10;

    for (let i = 0; i < users.length; i += chunkSize) {
      const chunk = users.slice(i, i + chunkSize);

      await Promise.all(
        chunk.map((user) =>
          sendNotificationEmail(
            user,
            subject,
            `
            <p>Hello ${user.fullName || "User"},</p>
            ${body}
          `
          )
        )
      );

      // prevent Brevo rate limit
      await new Promise((r) => setTimeout(r, 2000));
    }

    return {
      totalSelected: users.length,
      totalSent: users.length,
    };
  }
}