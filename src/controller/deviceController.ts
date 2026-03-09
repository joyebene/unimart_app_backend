import { Request, Response } from "express";
import { DeviceLogic } from "../logic/device";
import  asyncHandler  from "express-async-handler";

export class DeviceController {
  private deviceLogic = new DeviceLogic();

  createDevice = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { deviceToken, platform } = req.body;
    const device = await this.deviceLogic.createDevice(userId, deviceToken, platform);
    res.status(201).json({ status: "success", data: device });
  });

  deleteDevice = asyncHandler(async (req: Request, res: Response) => {
    const { deviceToken } = req.params;
    await this.deviceLogic.deleteDevice(deviceToken as string);
    res.status(204).send();
  });
}