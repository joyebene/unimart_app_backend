import { Router } from "express";
import { ConversationController } from "../controller/conversationController";
import { authenticateUser } from "../middleware/authMiddleware";


const router = Router();
const controller = new ConversationController();

router.post("/", authenticateUser, controller.startConversation);
router.get("/", authenticateUser, controller.getUserConversations);
router.patch("/:id/read", authenticateUser, controller.markConversationAsRead);
router.get("/:id", authenticateUser, controller.getConversation);
router.delete("/:id", authenticateUser, controller.deleteConversation);

export default router;