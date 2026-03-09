import { getRepository } from "../connection/data-source";
import { Message } from "../entity/message";

export class MessageService {
  private messageRepo = getRepository(Message);

  async createMessage(data: Partial<Message>) {
    const message = this.messageRepo.create(data);
    return this.messageRepo.save(message);
  }

  async getMessagesByConversation(conversationId: string) {
    return this.messageRepo.find({
      where: {
        conversation: { id: conversationId },
      },
      relations: ["sender"],
      order: { createdAt: "ASC" },
    });
  }

  async deleteMessage(id: string) {
    return this.messageRepo.delete(id);
  }
}