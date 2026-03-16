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
      // Use an inner join to filter conversations to only those involving the user
      .innerJoin(
        "conversation.participants",
        "user_participant",
        "user_participant.id = :userId",
        { userId }
      )
      // Then, left join and select all participants for the filtered conversations
      .leftJoinAndSelect("conversation.participants", "participants")
      .leftJoinAndSelect("conversation.messages", "message")
      .orderBy("message.createdAt", "DESC")
      .getMany();

    // map to WhatsApp-style response
    return conversations.map((conv) => {
      const otherUser = conv.participants.find((p) => p.id !== userId);

      // Because of the orderBy, the newest message is the first in the array
      const lastMessage = conv.messages.length > 0 ? conv.messages[0] : null;
      
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

async findConversationBetweenUsers(user1Id: string, user2Id: string) {
    return this.conversationRepo
      .createQueryBuilder("conversation")
      .innerJoin("conversation.participants", "p1", "p1.id = :user1Id", { user1Id })
      .innerJoin("conversation.participants", "p2", "p2.id = :user2Id", { user2Id })
      .leftJoinAndSelect("conversation.participants", "participants")
      .getOne();
  }
}