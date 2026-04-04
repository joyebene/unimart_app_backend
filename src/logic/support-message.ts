import { User } from "../entity/user";
import { SupportMessageService } from "../service/supportMessageService";
import { UserService } from "../service/userService";

export class SupportMessageLogic {
  private supportMessageService = new SupportMessageService();
  private userService = new UserService();

  async createSupportMessage(userId: string, subject: string, message: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return this.supportMessageService.createSupportMessage(user as User, subject, message);
  }

  async getSupportMessages(userId: string) {
    return this.supportMessageService.getSupportMessages(userId);
  }

  async getAllSupportMessages() {
    return this.supportMessageService.getAllSupportMessages();
  }

  async updateSupportMessageStatus(id: string, status: string) {
    const supportMessage = await this.supportMessageService.updateSupportMessageStatus(id, status);
    if (!supportMessage) {
      throw new Error("Support message not found");
    }
    return supportMessage;
  }
}