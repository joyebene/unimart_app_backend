import { Router } from "express";
import multer from "multer";
import { PaymentController } from "../controller/paymentController";
import { authenticateUser } from "../middleware/authMiddleware";


const router = Router();
const controller = new PaymentController();
const upload = multer();

router.post("/boost", authenticateUser, upload.single("paymentProof"), controller.submitBoostProduct.bind(controller));
router.post("/feature", authenticateUser, upload.single("paymentProof"), controller.setFeatureSellerBadge.bind(controller));

// Admin routes
router.get("/", authenticateUser, controller.fetchAllPayments.bind(controller));
router.get("/:id", authenticateUser, controller.getPaymentById.bind(controller));
router.put("/:id/status", authenticateUser, controller.updatePaymentStatus.bind(controller));

export default router;