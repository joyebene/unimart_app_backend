import { User } from "../entity/user";
import { NotificationSettingService } from "../service/notificationSettingService";
import { UserService } from "../service/userService";

export class NotificationSettingLogic {
  private notificationSettingService = new NotificationSettingService();
  private userService = new UserService();

  async getNotificationSettings(userId: string) {
    let settings = await this.notificationSettingService.getNotificationSettings(userId);

    if (!settings) {
      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      settings = await this.notificationSettingService.createNotificationSettings(user as User);
    }

    return settings;
  }

  async updateNotificationSettings(userId: string, updates: any) {
    return this.notificationSettingService.updateNotificationSettings(userId, updates);
  }
}