import { getRepository } from "../connection/data-source";
import { Device } from "../entity/device";
import { User } from "../entity/user";
 
export class DeviceService {
  private deviceRepository = getRepository(Device);
 
  async createDevice(
    user: User,
    deviceToken: string,
    platform: string
  ): Promise<Device> {
    const existingDevice = await this.deviceRepository.findOne({
      where: { deviceToken },
    });
 
    if (existingDevice) {
      // If the device already exists, update the user associated with it
      existingDevice.user = user;
      return this.deviceRepository.save(existingDevice);
    }
 
    const device = this.deviceRepository.create({ user, deviceToken, platform });
    return this.deviceRepository.save(device);
  }
 
  async deleteDevice(deviceToken: string): Promise<void> {
    await this.deviceRepository.delete({ deviceToken });
  }
}