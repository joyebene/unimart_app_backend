import { Router } from "express";
import { NotificationController } from "../controller/notificationController";
import { authenticateUser } from "../middleware/authMiddleware";

const routes = Router();
const notificationController = new NotificationController();

routes.get("/", authenticateUser, notificationController.getNotifications);
routes.put("/read/all", authenticateUser, notificationController.markAllAsRead);
routes.put("/read/:id", authenticateUser, notificationController.markAsRead);

export default routes;