import { getRepository } from "../connection/data-source";
import { Payment } from "../entity/payment";


export class PaymentService {
  private paymentRepo = getRepository(Payment);

  async createPayment(data: Partial<Payment>) {
    const payment = this.paymentRepo.create(data);
    return this.paymentRepo.save(payment);
  }

  async getAllPayments() {
    return this.paymentRepo.find({
      relations: ["user"],
      order: { createdAt: "DESC" },
    });
  }

  async getPaymentById(id: string) {
    return this.paymentRepo.findOne({ where: { id }, relations: ["user"] });
  }

  async updatePaymentStatus(id: string, status: "pending" | "completed" | "failed") {
    const payment = await this.paymentRepo.findOne({ where: { id } });
    if (!payment) throw new Error("Payment not found");

    payment.status = status;
    return this.paymentRepo.save(payment);
  }
}