import { User } from "../entity/user";
import { NotificationService } from "../service/notificationService";
import { PaymentService } from "../service/paymentService";
import { UserService } from "../service/userService";
import { uploadFilesToCloudinary, UploadedFileInfo } from "../utils/cloudinary";
import { ProductLogic } from "./product";

export class PaymentLogic {
  private paymentService = new PaymentService();
  private productLogic = new ProductLogic();
  private userService = new UserService();
  private notificationService = new NotificationService();

  // Create payment with screenshot proof
  async createPayment(
    userId: string,
    type: "boost" | "featurebadge",
    reference: string,
    amount: number,
    file: Express.Multer.File,
    productId?: string,
  ) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new Error("User not found");

    if (!file) throw new Error("Payment proof is required");

    // Upload proof to Cloudinary
    const uploaded: UploadedFileInfo[] = await uploadFilesToCloudinary([{
      buffer: file.buffer,
      originalname: file.originalname,
    }], "image", userId);


    const proof = uploaded[0]

    await this.notificationService.createNotification(
      user as User,
      "New Payment Request",
      `You have successfully requested for a ${type === "boost" ? "boost product purchase" : "feature seller badge purchase"} at ${amount} naira, It will be approved under 24 hours.`
    );

    // Save payment in DB with status "pending"
    return this.paymentService.createPayment({
      user: user as User,
      type,
      reference,
      productId,
      amount,
      proof: proof.url,
      proofCloudinaryId: proof.cloudinaryId,
      status: "pending",
    });
  }

  // Fetch all payments
  async getAllPayments() {
    return this.paymentService.getAllPayments();
  }

  // Update payment status (Admin)
  async updatePaymentStatus(
    paymentId: string,
    status: "pending" | "completed" | "failed"
  ) {
    const payment = await this.paymentService.getPaymentById(paymentId);

    if (!payment) {
      throw new Error("Payment not found");
    }

    // update status
    const updatedPayment = await this.paymentService.updatePaymentStatus(paymentId, status);

    // only act on approval
    if (status === "completed") {

      //  BOOST PRODUCT
      if (payment.type === "boost" && payment.productId) {

        const durationMap: Record<number, number> = {
          100: 1,
          300: 3,
          500: 7,
        };

        const duration = durationMap[payment.amount];

        if (!duration) {
          throw new Error("Invalid boost amount");
        }

        await this.productLogic.recommendProduct(payment.productId, duration);
      }

      // FEATURE SELLER BADGE
      if (payment.type === "featurebadge") {
        const now = new Date();

        let expiresAt = payment.user.featuredSellerExpiresAt;

        if (expiresAt && expiresAt > now) {
          // extend existing
          expiresAt.setMonth(expiresAt.getMonth() + 1);
        } else {
          // start fresh
          expiresAt = new Date();
          expiresAt.setMonth(expiresAt.getMonth() + 1);
        }

        await this.userService.updateUser(payment.user.id, {
          isFeaturedSeller: true,
          featuredSellerExpiresAt: expiresAt,
        });
      }

      await this.notificationService.createNotification(
        payment.user as User,
        "Payment Approval",
        `Your payment request have successfully been approved for a ${payment.type === "boost" ? "boost product purchase" : "feature seller badge purchase"} at ${payment.amount} naira.`
      );
    }

    return updatedPayment;
  }
}