import { Request, Response } from "express";
import { NotificationSettingLogic } from "../logic/notification-setting";
import asyncHandler from "express-async-handler"; 

export class NotificationSettingController {
  private notificationSettingLogic = new NotificationSettingLogic();

  getNotificationSettings = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const settings = await this.notificationSettingLogic.getNotificationSettings(userId);
    res.status(200).json({ status: "success", data: settings });
  });

  updateNotificationSettings = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const updates = req.body;
    const settings = await this.notificationSettingLogic.updateNotificationSettings(userId, updates);
    res.status(200).json({ status: "success", data: settings });
  });
}