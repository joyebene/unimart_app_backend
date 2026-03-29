import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserLogic } from "../logic/user";
import { UserStatus } from "../entity/user";

export class UserController {
  private userLogic = new UserLogic();

  
  getAllUsers = asyncHandler(async (_req: Request, res: Response) => {
    const users = await this.userLogic.getAllUsers();

    res.status(200).json({
      status: "success",
      data: users,
    });
  });

  
  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as {id: string};

    const user = await this.userLogic.getUserById(id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  });


  getAuthenticatedUser = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const user = await this.userLogic.getAuthenticatedUser(req.user.id);

    res.status(200).json({
      status: "success",
      data: user,
    });
  });

  
  updateUser = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const { currentPassword, ...updates } = req.body;

    const updatedUser = await this.userLogic.updateUser(
      req.user.id,
      updates,
      currentPassword
    );

    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  });

  updateAvatar = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const file = req.file;
    if (!file) {
      res.status(400);
      throw new Error("Avatar image is required");
    }

    const user = await this.userLogic.updateAvatar(req.user.id, file);

    res.status(200).json({
      status: "success",
      data: user,
    });
  });

  updateUserStatus = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params as {userId: string};
    const { status } = req.body;

    if (!Object.values(UserStatus).includes(status)) {
      res.status(400);
      throw new Error("Invalid status. Valid statuses are 'active' and 'banned'.");
    }

    const user = await this.userLogic.updateUserStatus(userId, status);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  });
}