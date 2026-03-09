import { Request, Response } from "express";
import { ProductLogic } from "../logic/product";
import asyncHandler from "express-async-handler";

export class ProductController {
    private productLogic = new ProductLogic();

    createProduct = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user!.id;
        const file = req.file;

        if (!file) {
            res.status(400).json({ status: "error", message: "Product image is required" });
            return;
        }

        const product = await this.productLogic.createProduct(userId, req.body, file);
        res.status(201).json({ status: "success", data: product });
    });

    getAllProducts = asyncHandler(async (req: Request, res: Response) => {
        const products = await this.productLogic.getAllProducts();
        res.status(200).json({ status: "success", data: products });
    });

    getProductById = asyncHandler(async (req: Request, res: Response) => {
        const product = await this.productLogic.getProductById(req.params.id as string);
        res.status(200).json({ status: "success", data: product });
    });

    getUserProducts = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user!.id;
        const products = await this.productLogic.getUserProducts(userId);
        res.status(200).json({ status: "success", data: products });
    });

    deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const productId = req.params.id as string;
    const result = await this.productLogic.deleteProduct(productId, userId);
    res.status(200).json({ status: 'success', data: result });
  });

  getFeaturedProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await this.productLogic.getFeaturedProducts();
    res.status(200).json({ status: "success", data: products });
  });

}