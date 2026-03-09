import { Request, Response } from "express";
import { UserSettingLogic } from "../logic/user-setting";
import  asyncHandler  from "express-async-handler";

export class UserSettingController {
  private userSettingLogic = new UserSettingLogic();

  getUserSetting = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const setting = await this.userSettingLogic.getUserSetting(userId);
    res.status(200).json({ status: "success", data: setting });
  });

  updateUserSetting = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const updates = req.body;
    const setting = await this.userSettingLogic.updateUserSetting(userId, updates);
    res.status(200).json({ status: "success", data: setting });
  });
}