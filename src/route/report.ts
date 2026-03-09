import { Router } from "express";
import { ReportController } from "../controller/reportController";
import { authenticateUser } from "../middleware/authMiddleware";

const reportRoutes = Router();
const reportController = new ReportController();

reportRoutes.post("/", authenticateUser, reportController.createReport);
reportRoutes.get("/", authenticateUser, reportController.getReports);
reportRoutes.put("/:id", authenticateUser, reportController.updateReportStatus);

export default reportRoutes;