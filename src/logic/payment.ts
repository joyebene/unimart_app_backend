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
    file: Express.Multer.File
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

    // Save payment in DB with status "pending"
    return this.paymentService.createPayment({
      user: user as User,
      type,
      reference,
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
  async updatePaymentStatus(paymentId: string, status: "pending" | "completed" | "failed") {
    return this.paymentService.updatePaymentStatus(paymentId, status);
  }
}