import { getRepository } from "../connection/data-source";
import { Report } from "../entity/report";
import { User } from "../entity/user";

export class ReportService {
  private reportRepository = getRepository(Report);

  async createReport(
    reporter: User,
    type: string,
    reason: string,
    reportedId: string
  ): Promise<Report> {

    const report = this.reportRepository.create({ reporter, type, reason, reportedId });
    return this.reportRepository.save(report);
  }

  async getReports(): Promise<Report[]> {
    return this.reportRepository.find({
      relations: ["reporter"],
      order: { createdAt: "DESC" },
    });
  }

  async updateReportStatus(id: string, status: string): Promise<Report | null> {
    const report = await this.reportRepository.findOne({ where: { id } });
    if (!report) {
      return null;
    }

    report.status = status;
    return this.reportRepository.save(report);
  }
}