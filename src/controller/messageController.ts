import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { MessageLogic } from "../logic/message";


export class MessageController {
  private messageLogic = new MessageLogic();

 sendMessage = asyncHandler(async (req: Request, res: Response) => {

  const userId = req.user?.id;
  const { conversationId, body, attachmentUrl } = req.body;

  const message = await this.messageLogic.sendMessage(
    userId!,
    conversationId,
    body,
    attachmentUrl
  );

  res.status(201).json({
    status: "success",
    data: message,
  });
});
  getMessages = asyncHandler(async (req: Request, res: Response) => {
    const messages = await this.messageLogic.getMessages(req.params.id as string);

    res.status(200).json({
      status: "success",
      data: messages,
    });
  });

  deleteMessage = asyncHandler(async (req: Request, res: Response) => {
    await this.messageLogic.deleteMessage(req.params.id as string);

    res.status(200).json({
      status: "success",
      message: "Message deleted",
    });
  });
}