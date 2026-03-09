import { User } from "../entity/user";
import { FeedbackService } from "../service/feedbackService";
import { UserService } from "../service/userService";


export class FeedbackLogic {
  private feedbackService = new FeedbackService();
  private userService = new UserService();

  async createFeedback(userId: string, message: string, rating: number ) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    

    return this.feedbackService.createFeedback(user as User, message, rating);
  }

  async getFeedbacks() {
    return this.feedbackService.getFeedbacks();
  }
}