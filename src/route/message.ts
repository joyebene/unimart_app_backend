import { Router } from "express";
import { MessageController } from "../controller/messageController";
import { authenticateUser } from "../middleware/authMiddleware";


const router = Router();
const controller = new MessageController();

router.post("/", authenticateUser, controller.sendMessage);
router.get("/:id", authenticateUser, controller.getMessages);
router.delete("/:id", authenticateUser, controller.deleteMessage);

export default router;