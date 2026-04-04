import { getRepository } from "../connection/data-source";
import { SupportMessage } from "../entity/support-message";
import { User } from "../entity/user";

export class SupportMessageService {
  private supportMessageRepository = getRepository(SupportMessage);

  async createSupportMessage(
    user: User,
    subject: string,
    message: string
  ): Promise<SupportMessage> {
    const supportMessage = this.supportMessageRepository.create({ user, subject, message });
    return this.supportMessageRepository.save(supportMessage);
  }

  async getSupportMessages(userId: string): Promise<SupportMessage[]> {
    return this.supportMessageRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: "DESC" },
    });
  }

  async getAllSupportMessages(): Promise<SupportMessage[]> {
    return this.supportMessageRepository.find({ 
      relations: ["user"],
      order: { createdAt: "DESC" },
    });
  }

  async updateSupportMessageStatus(
    id: string,
    status: string
  ): Promise<SupportMessage | null> {
    const supportMessage = await this.supportMessageRepository.findOne({ where: { id } });
    if (!supportMessage) {
      return null;
    }

    supportMessage.status = status;
    return this.supportMessageRepository.save(supportMessage);
  }
}