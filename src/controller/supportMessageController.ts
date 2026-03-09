import { Request, Response } from "express";
import { SupportMessageLogic } from "../logic/support-message";
import asyncHandler from "express-async-handler";

export class SupportMessageController {
  private supportMessageLogic = new SupportMessageLogic();

  createSupportMessage = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { subject, message } = req.body;
    const supportMessage = await this.supportMessageLogic.createSupportMessage(userId, subject, message);
    res.status(201).json({ status: "success", data: supportMessage });
  });

  getSupportMessages = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const supportMessages = await this.supportMessageLogic.getSupportMessages(userId);
    res.status(200).json({ status: "success", data: supportMessages });
  });

  updateSupportMessageStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const supportMessage = await this.supportMessageLogic.updateSupportMessageStatus(id as string, status);
    res.status(200).json({ status: "success", data: supportMessage });
  });
}