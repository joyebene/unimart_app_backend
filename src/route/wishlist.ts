import { Router } from "express";
import { WishlistController } from "../controller/wishlistController";
import { authenticateUser } from "../middleware/authMiddleware";

const wishlistRoutes = Router();
const wishlistController = new WishlistController();

wishlistRoutes.get("/", authenticateUser, wishlistController.getWishlist);
wishlistRoutes.post("/", authenticateUser, wishlistController.addToWishlist);
wishlistRoutes.delete("/:id", authenticateUser, wishlistController.removeFromWishlist);

export default wishlistRoutes;