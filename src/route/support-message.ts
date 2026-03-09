import { Router } from "express";
import { SupportMessageController } from "../controller/supportMessageController";
import { authenticateUser } from "../middleware/authMiddleware";

const supportMessageRoutes = Router();
const supportMessageController = new SupportMessageController();

supportMessageRoutes.post("/", authenticateUser, supportMessageController.createSupportMessage);
supportMessageRoutes.get("/", authenticateUser, supportMessageController.getSupportMessages);
supportMessageRoutes.put("/:id", authenticateUser, supportMessageController.updateSupportMessageStatus);

export default supportMessageRoutes;