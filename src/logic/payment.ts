import { User } from "../entity/user";
import { PaymentService } from "../service/paymentService";
import { UserService } from "../service/userService";
import { uploadFilesToCloudinary, UploadedFileInfo } from "../utils/cloudinary";

export class PaymentLogic {
  private paymentService = new PaymentService();
  private userService = new UserService();

  // Create payment with screenshot proof
  async createPayment(
    userId: string,
    type: "boost" | "featurebadge",
    reference: string,
    amount: number,
    files: Express.Multer.File[]
  ) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new Error("User not found");

    if (!files || files.length === 0) throw new Error("Payment proof is required");

    // Upload proof to Cloudinary
    const uploaded: UploadedFileInfo[] = await uploadFilesToCloudinary(files.map(f => ({
      buffer: f.buffer,
      originalname: f.originalname,
    })), "image", userId);

    // Map uploaded files to PaymentProof
    const proof = uploaded.map(f => ({
      url: f.url,
      cloudinaryId: f.cloudinaryId,
      fileName: f.fileName,
      uploadedAt: f.uploadedAt,
    }));

    // Save payment in DB with status "pending"
    return this.paymentService.createPayment({
      user: user as User,
      type,
      reference,
      amount,
      proof,
      status: "pending",
    });
  }

  // Fetch all payments
  async getAllPayments() {
    return this.paymentService.getAllPayments();
  }

  // Update payment status (Admin)
  async updatePaymentStatus(paymentId: string, status: "pending" | "completed" | "failed") {
    return this.paymentService.updatePaymentStatus(paymentId, status);
  }
}