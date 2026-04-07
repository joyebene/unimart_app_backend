import { Router } from "express";
import { ProductController } from "../controller/productController";
import { authenticateUser } from "../middleware/authMiddleware";
import upload from "../config/multer";

 
const productRoutes = Router();
const productController = new ProductController();
 
productRoutes.post("/", authenticateUser, upload.single("product_image"), productController.createProduct);
productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/my-products", authenticateUser, productController.getLoggedInUserProducts);
productRoutes.get("/products", authenticateUser, productController.getUserProducts);
productRoutes.get("/featured", productController.getFeaturedProducts);
productRoutes.get("/:id", productController.getProductById);
productRoutes.delete("/:id", authenticateUser, productController.deleteProduct);
 
export default productRoutes;