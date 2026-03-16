import { Router } from "express";
import { NotificationController } from "../controller/notificationController";
import { authenticateUser } from "../middleware/authMiddleware";

const routes = Router();
const notificationController = new NotificationController();

routes.get("/", authenticateUser, notificationController.getNotifications);
routes.patch("/read/all", authenticateUser, notificationController.markAllAsRead);
routes.patch("/read/:id", authenticateUser, notificationController.markAsRead);

export default routes;