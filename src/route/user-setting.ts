import { Router } from "express";
import { UserSettingController } from "../controller/userSettingController";
import { authenticateUser } from "../middleware/authMiddleware";

const userSettingRoutes = Router();
const userSettingController = new UserSettingController();

userSettingRoutes.get("/", authenticateUser, userSettingController.getUserSetting);
userSettingRoutes.put("/", authenticateUser, userSettingController.updateUserSetting);

export default userSettingRoutes;