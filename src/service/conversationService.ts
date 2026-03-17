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
      // *** FIX 1: Explicitly select the lastRead column to make sure it's loaded ***
      .addSelect("conversation.lastRead")
      .orderBy("message.createdAt", "DESC")
      .getMany();

    // map to WhatsApp-style response
    return conversations.map((conv) => {
      const otherUser = conv.participants.find((p) => p.id !== userId);

      const lastMessage = conv.messages[0] ?? null;

      // *** FIX 2: Use the correct property name 'lastRead' ***
      const lastReadTimestampString = conv.lastRead?.[userId];

      // *** FIX 3: Convert the timestamp string to a proper Date object before comparing ***
      const lastReadDate = lastReadTimestampString
        ? new Date(lastReadTimestampString)
        : null;

      // Determine if unread for THIS user
      const isUnread =
        lastMessage && (!lastReadDate || lastMessage.createdAt > lastReadDate);

      // Calculate unread count correctly
      const unreadCount = lastReadDate
        ? conv.messages.filter((m) => m.createdAt > lastReadDate).length
        : conv.messages.length; // If never read, count all messages

      return {
        id: conv.id,
        user: otherUser,
        lastMessage,
        isUnread,
        unreadCount,
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


async markConversationAsRead(conversationId: string, userId: string) {
    
    const conversation = await this.conversationRepo.findOne({
      where: { id: conversationId },
      select: ["lastRead"],
    });

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    // Update the lastRead object with the new timestamp for the user
    const newLastRead = {
      ...conversation.lastRead,
      [userId]: new Date().toISOString(), // Use ISO string for timezone consistency
    };

    // Save the updated conversation
    return this.conversationRepo.update(conversationId, {
      lastRead: newLastRead,
    });
  }
}