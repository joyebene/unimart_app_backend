import { MessageService } from "../service/messageService";
import { ConversationService } from "../service/conversationService";
import { UserService } from "../service/userService";
import { User } from "../entity/user";
import { NotificationService } from "../service/notificationService";
import { getIO } from "../utils/socket";

export class MessageLogic {
  private messageService = new MessageService();
  private conversationService = new ConversationService();
  private userService = new UserService();
  private notificationService = new NotificationService();

  async sendMessage(
    userId: string,
    conversationId: string,
    body: string,
    attachmentUrl?: string
  ) {
    const user = await this.userService.getUserById(userId);
    const conversation = await this.conversationService.getConversationById(
      conversationId
    );

    if (!user) throw new Error("User not found");
    if (!conversation) throw new Error("Conversation not found");

    const newMessage = await this.messageService.createMessage({
      sender: user as User,
      conversation: conversation,
      body,
      attachmentUrl,
    });

    // Emit a socket event to the conversation room
    const io = getIO();
    io.to(conversationId).emit("new_message", newMessage);
    // Create notifications for all other participants
    if (conversation.participants) {
      for (const participant of conversation.participants) {
        if (participant.id !== userId) {
          await this.notificationService.createNotification(
            participant,
            `New message from ${user.fullName}`,
            body
          );
        }
      }
    }

    return newMessage;
  }

  async getMessages(conversationId: string) {
    return this.messageService.getMessagesByConversation(conversationId);
  }

  async deleteMessage(messageId: string) {
    return this.messageService.deleteMessage(messageId);
  }
}