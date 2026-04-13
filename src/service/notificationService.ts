import { getRepository } from "../connection/data-source";
import { Notification } from "../entity/notification";
import { User } from "../entity/user";
import { sendNotificationEmail } from "../utils/emailNotif";
import { getIO } from "../utils/socket";
import { UserSettingService } from "./userSettingService";

export class NotificationService {
  private notificationRepository = getRepository(Notification);
   private userSettingService = new UserSettingService();

  async createNotification(
    user: User,
    title: string,
    body: string
  ): Promise<Notification | null> {

    if (!user) {
      throw new Error("User not found");
    }
 
    const userSettings = await this.userSettingService.getUserSetting(user.id!);
 
    // Default to true if settings are not found
    const inAppEnabled = userSettings ? userSettings.emailNotifications : true;
    const emailEnabled = userSettings ? userSettings.pushNotifications : true;
 
    if (emailEnabled) {
      await sendNotificationEmail(user, title, body);
    }
 
   if (inAppEnabled) {
      const notification = await this.notificationRepository.create({
        user: user as any,
        title,
        body,
      });
      if (notification) {
        const io = getIO();
        io.to(user.id!).emit("new_notification", notification);
      }
      return this.notificationRepository.save(notification);
    }
    return null;
 
  }

  async getNotifications(userId: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: "DESC" },
    });
  }

  async markAsRead(notificationId: string, userId: string): Promise<Notification | null> {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId, user: { id: userId } },
    });

    if (!notification) {
      return null;
    }

    notification.isRead = true;
    return this.notificationRepository.save(notification);
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationRepository.update(
      { user: { id: userId }, isRead: false },
      { isRead: true }
    );
  }

}