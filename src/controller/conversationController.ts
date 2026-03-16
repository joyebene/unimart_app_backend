import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ConversationLogic } from "../logic/conversation";


export class ConversationController {
  private conversationLogic = new ConversationLogic();

  startConversation = asyncHandler(async (req: Request, res: Response) => {

  const userId = req.user?.id;
  const { participantId } = req.body;

  const conversation = await this.conversationLogic.startConversation(
    userId!,
    participantId
  );

  

  res.status(201).json({
    status: "success",
    data: conversation,
  });
});

  getUserConversations = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;

    const conversations =
      await this.conversationLogic.getUserConversations(userId!);

      console.log(conversations);
      

    res.status(200).json({
      status: "success",
      data: conversations,
    });
  });

  getConversation = asyncHandler(async (req: Request, res: Response) => {
    const conversation = await this.conversationLogic.getConversation(
      req.params.id as string 
    );

    res.status(200).json({
      status: "success",
      data: conversation,
    });
  });

  deleteConversation = asyncHandler(async (req: Request, res: Response) => {
    await this.conversationLogic.deleteConversation(
      req.params.id as string 
    );

    res.status(200).json({
      status: "success",
      data: "chat deleted",
    });
  })
}