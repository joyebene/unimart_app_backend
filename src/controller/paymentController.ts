import { Request, Response } from "express";
import { PaymentLogic } from "../logic/payment";


const paymentLogic = new PaymentLogic();

export class PaymentController {
  async submitBoostProduct(req: Request, res: Response) {
    const { reference, amount } = req.body;
    const userId = req.user!.id;

    try {
      const payment = await paymentLogic.createPayment(
        userId,
        "boost",
        reference,
        Number(amount),
        req.files as Express.Multer.File[]
      );
      res.status(201).json({ success: true, payment });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async setFeatureSellerBadge(req: Request, res: Response) {
    const { reference, amount } = req.body;
    const userId = req.user!.id;

    try {
      const payment = await paymentLogic.createPayment(
        userId,
        "featurebadge",
        reference,
        Number(amount),
        req.files as Express.Multer.File[]
      );
      res.status(201).json({ success: true, payment });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async fetchAllPayments(req: Request, res: Response) {
    try {
      const payments = await paymentLogic.getAllPayments();
      res.json({ success: true, payments });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async updatePaymentStatus(req: Request, res: Response) {
    const { paymentId, status } = req.body;

    try {
      const payment = await paymentLogic.updatePaymentStatus(paymentId, status);
      res.json({ success: true, payment });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}