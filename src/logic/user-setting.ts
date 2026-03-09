import { UserSettingService } from "../service/userSettingService";
import { UserService } from "../service/userService";

export class UserSettingLogic {
  private userSettingService = new UserSettingService();
  private userService = new UserService();

  async getUserSetting(userId: string) {
    let setting = await this.userSettingService.getUserSetting(userId);

    if (!setting) {
      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      setting = await this.userSettingService.createUserSetting(user as any);
    }

    return setting;
  }

  async updateUserSetting(userId: string, updates: any) {
    return this.userSettingService.updateUserSetting(userId, updates);
  }
}