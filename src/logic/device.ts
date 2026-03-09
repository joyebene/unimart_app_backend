import { DeviceService } from "../service/deviceService";
import { UserService } from "../service/userService";

export class DeviceLogic {
  private deviceService = new DeviceService();
  private userService = new UserService();

  async createDevice(userId: string, deviceToken: string, platform: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return this.deviceService.createDevice(user as any, deviceToken, platform);
  }

  async deleteDevice(deviceToken: string) {
    return this.deviceService.deleteDevice(deviceToken);
  }
}