import { Request, Response } from "express";
import { PaymentLogic } from "../logic/payment";
import { PaymentService } from "../service/paymentService";
import { ProductService } from "../service/productService";


const paymentLogic = new PaymentLogic();
const paymentService = new PaymentService();
const productService = new ProductService();

export class PaymentController {
  async submitBoostProduct(req: Request, res: Response) {
    const { productId, reference, amount } = req.body;
    const userId = req.user!.id;

    try {
      const payment = await paymentLogic.createPayment(
        userId,
        "boost",
        reference,
        Number(amount),
        req.file as Express.Multer.File,
        productId,
      );
      res.status(201).json({ success: true, payment });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async setFeatureSellerBadge(req: Request, res: Response) {
    const { reference } = req.body;
    const userId = req.user!.id;

    try {
      const payment = await paymentLogic.createPayment(
        userId,
        "featurebadge",
        reference,
        Number(500),
        req.file as Express.Multer.File
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

  async getPaymentById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const payment = await paymentService.getPaymentById(id as string);


      if (!payment) {
        return res.status(404).json({
          success: false,
          message: "Payment not found",
        });
      }

      let product = null;

      // If payment has productId → fetch product
      if (payment.productId) {
        product = await productService.getProductById(payment.productId);
      }

      res.json({ success: true, payment, product });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async updatePaymentStatus(req: Request, res: Response) {
    const { status } = req.body;

    const paymentId = req.params.id as string;

    try {
      const payment = await paymentLogic.updatePaymentStatus(paymentId, status);
      res.json({ success: true, payment });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}