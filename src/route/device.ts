import { Router } from "express";
import { DeviceController } from "../controller/deviceController";
import { authenticateUser } from "../middleware/authMiddleware";

const deviceRoutes = Router();
const deviceController = new DeviceController();

deviceRoutes.post("/", authenticateUser, deviceController.createDevice);
deviceRoutes.delete("/:deviceToken", authenticateUser, deviceController.deleteDevice);

export default deviceRoutes;