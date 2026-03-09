import { Request, Response } from "express";
import { WishlistLogic } from "../logic/wishlist";
import  asyncHandler from "express-async-handler";

export class WishlistController {
  private wishlistLogic = new WishlistLogic();

  getWishlist = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const wishlist = await this.wishlistLogic.getWishlist(userId);
    res.status(200).json({ status: "success", data: wishlist });
  });

  addToWishlist = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { productId } = req.body;
    const wishlistItem = await this.wishlistLogic.addToWishlist(userId, productId);
    res.status(201).json({ status: "success", data: wishlistItem });
  });

  removeFromWishlist = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params as {id: string};
    const result = await this.wishlistLogic.removeFromWishlist(id, userId);
    res.status(200).json({ status: "success", data: result });
  });
}