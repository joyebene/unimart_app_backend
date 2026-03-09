import { Request, Response } from "express";
import { ReportLogic } from "../logic/report";
import  asyncHandler  from "express-async-handler";

export class ReportController {
  private reportLogic = new ReportLogic();

  createReport = asyncHandler(async (req: Request, res: Response) => {
    const reporterId = req.user!.id;
    const { type, reason, reportedId } = req.body;
    const report = await this.reportLogic.createReport(reporterId, type, reason, reportedId);
    res.status(201).json({ status: "success", data: report });
  });

  getReports = asyncHandler(async (req: Request, res: Response) => {
    const reports = await this.reportLogic.getReports();
    res.status(200).json({ status: "success", data: reports });
  });

  updateReportStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const report = await this.reportLogic.updateReportStatus(id as string, status);
    res.status(200).json({ status: "success", data: report });
  });
}