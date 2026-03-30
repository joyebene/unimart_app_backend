import { User } from "../entity/user";
import { NotificationService } from "../service/notificationService";
import { ProductService } from "../service/productService";
import { ReportService } from "../service/reportService";
import { UserService } from "../service/userService";

export class ReportLogic {
  private reportService = new ReportService();
  private userService = new UserService();
  private notificationService = new NotificationService;
  private productService = new ProductService;

  async createReport(reporterId: string, type: string, reason: string, reportedId: string) {
    const reporter = await this.userService.getUserById(reporterId);
    if (!reporter) {
      throw new Error("Reporter not found");
    }
    const report = await this.reportService.createReport(reporter as any, type, reason, reportedId);
    // Notify the reported user or product owner
    if (type === "user") {
      const reportedUser = await this.userService.getUserById(reportedId);
      if (reportedUser) {
        await this.notificationService.createNotification(
          reportedUser as User,
          "A Report Has Been Filed Against Your Account",
          `Your account has been reported for the following reason: "${reason}". We will review this report and take appropriate action.`
        );
      }
    } else if (type === "product") {
      const product = await this.productService.getProductById(reportedId);
      if (product && product.seller) {
        await this.notificationService.createNotification(
          product.seller,
          "A Report Has Been Filed Against Your Product",
          `Your product, "${product.name}," has been reported for: "${reason}". We will review this and take action if necessary.`
        );
      }
    }
    return report;
  }

  async getReports() {
    const reports = await this.reportService.getReports();

    return reports;
  }

  async getReportDetails(id: string) {
    const report = await this.reportService.getReportById(id);
    if (!report) {
      return null;
    }
    console.log(report);

    let reportedEntity;
    if (report.type === "user") {
      reportedEntity = await this.userService.getUserById(report.reportedId);
    } else if (report.type === "product") {
      reportedEntity = await this.productService.getProductById(report.reportedId);
      console.log(`reportedEntity`, reportedEntity);
      
    }

    return {
      ...report,
      reportedEntity,
    };
  }

  async updateReportStatus(id: string, status: string) {
    const report = await this.reportService.updateReportStatus(id, status);
    if (!report) {
      throw new Error("Report not found");
    }
    return report;
  }
}