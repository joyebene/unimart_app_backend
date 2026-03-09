import { getRepository } from "../connection/data-source";
import { UserSetting } from "../entity/user-setting";
import { User } from "../entity/user";

export class UserSettingService {
  private userSettingRepository = getRepository(UserSetting);

  async createUserSetting(user: User): Promise<UserSetting> {
    const userSetting = this.userSettingRepository.create({ user });
    return this.userSettingRepository.save(userSetting);
  }

  async getUserSetting(userId: string): Promise<UserSetting | null> {
    return this.userSettingRepository.findOne({
      where: { user: { id: userId } },
    });
  }

  async updateUserSetting(
    userId: string,
    updates: Partial<UserSetting>
  ): Promise<UserSetting> {
    const setting = await this.getUserSetting(userId);
    if (!setting) {
      throw new Error("User settings not found");
    }

    Object.assign(setting, updates);
    return this.userSettingRepository.save(setting);
  }
}