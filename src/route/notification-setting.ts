import { Router } from "express";
import { NotificationSettingController } from "../controller/notificationSettingController";
import { authenticateUser } from "../middleware/authMiddleware";

const routes = Router();
const notificationSettingController = new NotificationSettingController();

routes.get("/", authenticateUser, notificationSettingController.getNotificationSettings);
routes.put("/", authenticateUser, notificationSettingController.updateNotificationSettings);

export default routes;