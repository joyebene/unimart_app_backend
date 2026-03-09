import { Router } from "express";
import { FeedbackController } from "../controller/feedbackController";
import { authenticateUser } from "../middleware/authMiddleware";

const feedbackRoutes = Router();
const feedbackController = new FeedbackController();

feedbackRoutes.post("/", authenticateUser, feedbackController.createFeedback);
feedbackRoutes.get("/", feedbackController.getFeedbacks);

export default feedbackRoutes;