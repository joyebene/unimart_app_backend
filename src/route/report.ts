import { Router } from "express";
import { ReportController } from "../controller/reportController";
import { authenticateUser } from "../middleware/authMiddleware";

const reportRoutes = Router();
const reportController = new ReportController();

reportRoutes.post("/", authenticateUser, reportController.createReport);
reportRoutes.get("/", authenticateUser, reportController.getReports);
reportRoutes.get("/:id", authenticateUser, reportController.getReportDetails);
reportRoutes.put("/:id/status", authenticateUser, reportController.updateReportStatus);

export default reportRoutes;