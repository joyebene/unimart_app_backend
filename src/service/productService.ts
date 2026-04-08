import { getRepository } from "../connection/data-source";
import { Product } from "../entity/product";


export class ProductService {
  private productRepo = getRepository(Product);

  async createProduct(data: Partial<Product>) {
    const product = this.productRepo.create(data);
    return this.productRepo.save(product);
  }

  async getAllProducts() {
    return this.productRepo.find({
      relations: ["seller"],
      order: { createdAt: "DESC" },
    });
  }

  async getProductById(id: string) {
    return this.productRepo.findOne({
      where: { id },
      relations: ["seller"],
    });
  }

  async getProductsByUser(userId: string) {
    return this.productRepo.find({
      where: { seller: { id: userId } },
      relations: ["seller"],
    });
  }

  async deleteProduct(id: string) {
    return this.productRepo.delete(id);
  }

  async getFeaturedProducts() {
    const count = await this.productRepo.count();
    const randomOffset = Math.floor(Math.random() * count);

    return this.productRepo
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.seller", "seller")
      .skip(randomOffset)
      .take(20)
      .getMany();
  }

  async clearExpiredFeatured() {
    await this.productRepo
      .createQueryBuilder()
      .update(Product)
      .set({
        isFeaturedProduct: false,
        featuredDuration: null,
        featuredExpiresAt: null,
      })
      .where("featuredExpiresAt < :now", { now: new Date() })
      .execute();
  }

  async getRecommendedProducts() {
    return this.productRepo
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.seller", "seller")
      .where("product.isFeaturedProduct = :isFeatured", { isFeatured: true })
      .andWhere("product.featuredExpiresAt > :now", { now: new Date() })
      .orderBy("product.createdAt", "DESC")
      .take(20)
      .getMany();
  }

  async saveProduct(product: Product) {
  return this.productRepo.save(product);
}

}