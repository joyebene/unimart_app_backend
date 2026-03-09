import { WishlistService } from "../service/wishlistService";
import { UserService } from "../service/userService";
import { ProductService } from "../service/productService";
import { User } from "../entity/user";

export class WishlistLogic {
  private wishlistService = new WishlistService();
  private userService = new UserService();
  private productService = new ProductService();

  async getWishlist(userId: string) {
    return this.wishlistService.getWishlist(userId);
  }

  async addToWishlist(userId: string, productId: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const product = await this.productService.getProductById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const isAlreadyInWishlist = await this.wishlistService.isProductInWishlist(userId, productId);
    if (isAlreadyInWishlist) {
      throw new Error("Product already in wishlist");
    }

    return this.wishlistService.addToWishlist(user as User, product);
  }

  async removeFromWishlist(wishlistItemId: string, userId: string) {
    const wishlistItem = await this.wishlistService.findWishlistItem(wishlistItemId, userId);
    if (!wishlistItem) {
      throw new Error("Wishlist item not found");
    }

    await this.wishlistService.removeFromWishlist(wishlistItemId);
    return { message: "Item removed from wishlist" };
  }
}