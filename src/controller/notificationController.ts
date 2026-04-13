import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { NotificationLogic } from "../logic/notifcation";

export class NotificationController {
  private notificationLogic = new NotificationLogic();

  getNotifications = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const notifications = await this.notificationLogic.getNotifications(userId);
    res.status(200).json({ status: "success", data: notifications });
  });

  markAsRead = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;
    const notification = await this.notificationLogic.markAsRead(id as string, userId);
    res.status(200).json({ status: "success", data: notification });
  });

  markAllAsRead = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const result = await this.notificationLogic.markAllAsRead(userId);
    res.status(200).json({ status: "success", data: result });
  });

  sendAdminNotification = asyncHandler(async (req, res) => {
    try {

      const { subject, body, limit } = req.body;

      if (!subject || !body) {
        res.status(400).json({ message: "Subject and body are required" });
      }

      const result = await this.notificationLogic.sendBulkNotificationFromAdmin({
        subject,
        body,
        limit,
      });

      res.json({
        message: "Notification sent successfully",
        ...result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to send notifications" });
    }
  });
}