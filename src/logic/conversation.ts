import { ConversationService } from "../service/conversationService";
import { UserService } from "../service/userService";
import { User } from "../entity/user";
import { NotificationService } from "../service/notificationService";

export class ConversationLogic {
  private conversationService = new ConversationService();
  private userService = new UserService();
  private notificationService = new NotificationService();

  async startConversation(userId: string, participantId: string) {

  const user = await this.userService.getUserById(userId);
  const participant = await this.userService.getUserById(participantId);

  if (!user || !participant) {
    throw new Error("User not found");
  }

  // check if conversation already exists
  const existingConversation = await this.conversationService.findConversationBetweenUsers(
    user.id!,
    participant.id!
  );
  if (existingConversation) {
    return existingConversation;
  }

  const newConversation = await this.conversationService.createConversation({
    participants: [user as User, participant as User],
  });

  await this.notificationService.createNotification(
    participant as User,
    "New Conversation Started",
    `You have started a new conversation with ${participant.fullName}`
  );

  await this.notificationService.createNotification(
    user as User,
    "New Conversation Started",
    `${user.fullName} has started a new conversation with you.`
  );

  return newConversation;

}
  async getUserConversations(userId: string) {
    return this.conversationService.getUserConversations(userId);
  }

  async getConversation(conversationId: string) {
    return this.conversationService.getConversationById(conversationId);
  }

  async deleteConversation(conversationId: string) {
    return this.conversationService.deleteConversation(conversationId);
  }

  async markConversationAsRead(conversationId: string, userId: string) {
    return this.conversationService.markConversationAsRead(
      conversationId,
      userId
    );
  }
}