import { Router } from "express";
import { AuthController } from "../controller/authController";

const authController = new AuthController();


const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);

router.post("/forgot-password", authController.forgotPassword);
router.post("/confirm-otp", authController.verifyOtp);
router.post("/reset-password", authController.resetPassword);
router.post("/resend-otp", authController.resendOtp);
router.post("/logout", authController.logout);



export default router;
