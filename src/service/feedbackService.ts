import { getRepository } from "../connection/data-source";
import { Feedback } from "../entity/feedback";
import { User } from "../entity/user";


export class FeedbackService {
  private feedbackRepository = getRepository(Feedback);

  async createFeedback(
    user: User,
    message: string,
    rating: number,
  ): Promise<Feedback> {
    const feedback = this.feedbackRepository.create({ user, message, rating });
    return this.feedbackRepository.save(feedback);
  }

  async getFeedbacks(): Promise<Feedback[]> {
    return this.feedbackRepository.find({
      relations: ["user"],
      order: { createdAt: "DESC" },
    });
  }
}