import { getRepository } from "../connection/data-source";
import { NotificationSettings } from "../entity/notification-setting";
import { User } from "../entity/user";

export class NotificationSettingService {
  private notificationSettingRepository = getRepository(NotificationSettings);

  async createNotificationSettings(user: User): Promise<NotificationSettings> {
    const notificationSettings = this.notificationSettingRepository.create({ user });
    return this.notificationSettingRepository.save(notificationSettings);
  }

  async getNotificationSettings(userId: string): Promise<NotificationSettings | null> {
    return this.notificationSettingRepository.findOne({
      where: { user: { id: userId } },
    });
  }

  async updateNotificationSettings(
    userId: string,
    updates: Partial<NotificationSettings>
  ): Promise<NotificationSettings> {
    const settings = await this.getNotificationSettings(userId);
    if (!settings) {
      throw new Error("Notification settings not found");
    }

    Object.assign(settings, updates);
    return this.notificationSettingRepository.save(settings);
  }
}