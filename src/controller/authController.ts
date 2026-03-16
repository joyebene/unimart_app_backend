import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthLogic } from "../logic/auth";

export class AuthController {
    private authLogic = new AuthLogic();

    register = asyncHandler(async (req: Request, res: Response) => {
        await this.authLogic.register(req.body);

        res.status(201).json({
            status: "success",
            message: "Registration successful",
        });
    });

    login = asyncHandler(async (req: Request, res: Response) => {
        const { accessToken, refreshToken, user } =
            await this.authLogic.login(req.body);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: process.env.NODE_ENV === "production",
            maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
        });

        res.status(200).json({
            status: "success",
            data: {
                accessToken,
                refreshToken,
                user,
            },
        });
    });

    refreshToken = asyncHandler(async (req: Request, res: Response) => {

           let token: string | undefined = req.body.refreshToken;


        if (!token && req.headers.authorization?.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

         if (!token) {
            token = req.cookies?.refreshToken;
        }

          if (!token) {
            res.status(401);
            throw new Error("Refresh token missing");
        }


        const tokens = await this.authLogic.refreshToken(token);

        // rotate refresh token
        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: process.env.NODE_ENV === "production",
            maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
        });

        res.status(200).json({
            status: "success",
            data: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            },
        });
    });

    verifyOtp = asyncHandler(async (req: Request, res: Response) => {
        const { email, otp, purpose } = req.body;

        const result = await this.authLogic.verifyOtp(email, otp, purpose);

        res.status(200).json({
            status: "success",
            data: result,
        });
    });

    forgotPassword = asyncHandler(async (req: Request, res: Response) => {
        const { email } = req.body;

        const result = await this.authLogic.forgotPassword(email);

        res.status(200).json({
            status: "success",
            data: result,
        });
    });

    resetPassword = asyncHandler(async (req: Request, res: Response) => {
        const { email, otp, newPassword } = req.body;

        const result = await this.authLogic.resetPassword(
            email,
            newPassword
        );

        res.status(200).json({
            status: "success",
            data: result,
        });
    });

    resendOtp = asyncHandler(async (req: Request, res: Response) => {
        const { email } = req.body;

        const result = await this.authLogic.resendOtp(email);

        res.status(200).json({
            status: "success",
            data: result,
        });
    });

    logout = asyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).user?.id;

        if (userId) {
            await this.authLogic.logout(userId);
        }

        res.clearCookie("refreshToken");

        res.status(200).json({
            status: "success",
            message: "Logged out successfully",
        });
    });
}