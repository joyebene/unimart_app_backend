import { Router } from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { UserController } from "../controller/userController";
import upload from "../config/multer";



const router = Router();
const controller = new UserController();

router.get("/", controller.getAllUsers);
router.get("/me", authenticateUser, controller.getAuthenticatedUser);
router.put("/me", authenticateUser, controller.updateUser);
router.put("/me/avatar", authenticateUser, upload.single("avatar"), controller.updateAvatar);
router.get("/:id", controller.getUserById);

export default router;