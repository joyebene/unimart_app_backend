import { getRepository } from "../connection/data-source";
import { WishlistItem } from "../entity/wishlist";
import { User } from "../entity/user";
import { Product } from "../entity/product";

export class WishlistService {
  private wishlistRepository = getRepository(WishlistItem);

  async getWishlist(userId: string): Promise<WishlistItem[]> {
    return this.wishlistRepository.find({
      where: { user: { id: userId } },
      relations: ["product", "product.seller"],
      order: { createdAt: "DESC" },
    });
  }

  async addToWishlist(user: User, product: Product): Promise<WishlistItem> {
    const wishlistItem = this.wishlistRepository.create({ user, product });
    return this.wishlistRepository.save(wishlistItem);
  }

  async removeFromWishlist(id: string): Promise<void> {
    await this.wishlistRepository.delete(id);
  }

  async findWishlistItem(id: string, userId: string): Promise<WishlistItem | null> {
    return this.wishlistRepository.findOne({
      where: { id, user: { id: userId } },
    });
  }

  async isProductInWishlist(userId: string, productId: string): Promise<boolean> {
    const count = await this.wishlistRepository.count({
      where: { user: { id: userId }, product: { id: productId } },
    });
    return count > 0;
  }
}