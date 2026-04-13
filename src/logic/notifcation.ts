import { User } from "../entity/user";
import { NotificationService } from "../service/notificationService";
import { UserService } from "../service/userService";
import { sendNotificationEmail } from "../utils/emailNotif";

export class NotificationLogic {
  private notificationService = new NotificationService();
  private userService = new UserService();

  async createBulkNotification(
    users: User[],
    title: string,
    body: string
  ): Promise<void> {
    const notifications = users.map((user) => ({
      user,
      title,
      body,
    }));
    await this.notificationService.createBulkNotifications(notifications);
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

    // Filter out users who have already received this notification
    const recentNotifications =
      await this.notificationService.getRecentNotifications(
        users.map((u) => u.id)
      );
    const notifiedUserIds = new Set(
      recentNotifications.map((n) => n.user.id)
    );
    const usersToSend = users.filter((u) => !notifiedUserIds.has(u.id));

    if (usersToSend.length === 0) {
      return {
        totalSelected: users.length,
        totalSent: 0,
        message: "All selected users have already received this notification.",
      };
    }

    await this.createBulkNotification(
      usersToSend,
      subject,
      body
    );


    return {
      totalSelected: users.length,
      totalSent: usersToSend.length,
    };
  }
}