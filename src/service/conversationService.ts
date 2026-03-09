import { getRepository } from "../connection/data-source";
import { Conversation } from "../entity/conversation";

export class ConversationService {
  private conversationRepo = getRepository(Conversation);

  async createConversation(data: Partial<Conversation>) {
    const conversation = this.conversationRepo.create(data);
    return this.conversationRepo.save(conversation);
  }

 async getConversationById(id: string) {
  return this.conversationRepo.findOne({
    where: { id },
    relations: ["participants", "messages", "messages.sender"],
  });
}

 async getUserConversations(userId: string) {
  const conversations = await this.conversationRepo
    .createQueryBuilder("conversation")
    .leftJoinAndSelect("conversation.participants", "participants")
    .leftJoinAndSelect("conversation.messages", "message")
    .where("participants.id = :userId", { userId })
    .orderBy("message.createdAt", "DESC")
    .getMany();

  // map to WhatsApp-style response
  return conversations.map((conv) => {
    const otherUser = conv.participants.find((p) => p.id !== userId);
    const lastMessage = conv.messages[conv.messages.length - 1]; // newest message
    return {
      id: conv.id,
      user: otherUser,
      lastMessage,
    };
  });
}

  async deleteConversation(id: string) {
    return this.conversationRepo.delete(id);
  }

  async findConversationBetweenUsers(user1: string, user2: string) {
  return this.conversationRepo
    .createQueryBuilder("conversation")
    .leftJoin("conversation.participants", "participant")
    .where("participant.id IN (:...ids)", { ids: [user1, user2] })
    .groupBy("conversation.id")
    .having("COUNT(participant.id) = 2")
    .getOne();
}
}