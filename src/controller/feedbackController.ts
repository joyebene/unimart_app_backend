import { Request, Response } from "express";
import { FeedbackLogic } from "../logic/feedback";
import asyncHandler from "express-async-handler";

export class FeedbackController {
    private feedbackLogic = new FeedbackLogic();

    createFeedback = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user!.id;
        const { message, rating } = req.body;
        const feedback = await this.feedbackLogic.createFeedback(userId, message, rating);
        res.status(201).json({ status: "success", data: feedback });
    });

    getFeedbacks = asyncHandler(async (req: Request, res: Response) => {
        const feedbacks = await this.feedbackLogic.getFeedbacks();
        res.status(200).json({ status: "success", data: feedbacks });
    });
}