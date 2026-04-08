import { User } from "../entity/user";
import { ProductService } from "../service/productService";
import { UserService } from "../service/userService";
import { uploadFilesToCloudinary, deleteFromCloudinary } from "../utils/cloudinary";

export class ProductLogic {
  private productService = new ProductService();
  private userService = new UserService();

  async createProduct(
    userId: string,
    productData: any,
    file: Express.Multer.File
  ) {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (!file) {
      throw new Error("Product image is required");
    }

    const uploaded = await uploadFilesToCloudinary(
      [
        {
          buffer: file.buffer,
          originalname: file.originalname,
        },
      ],
      "image",
      userId
    );

    const image = uploaded[0];

    const product = await this.productService.createProduct({
      name: productData.name,
      category: productData.category,
      price: productData.price,
      description: productData.description,
      imageUrl: image.url,
      imageCloudinaryId: image.cloudinaryId,
      seller: user as User,
    });


    user.productCount = (user.productCount || 0) + 1;
    await this.userService.updateUser(user.id!, { productCount: user.productCount });

    return product;
  }

  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  async getProductById(id: string) {
    return this.productService.getProductById(id);
  }

  async getUserProducts(userId: string) {
    return this.productService.getProductsByUser(userId);
  }

  async deleteProduct(productId: string, userId: string) {

    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const product = await this.productService.getProductById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    if (user?.email !== "admin@unimart.com") {
      if (product.seller.id !== userId) {
        throw new Error("Unauthorized to delete this product");
      }
    }



    // delete cloudinary image
    await deleteFromCloudinary([product.imageCloudinaryId]);

    await this.productService.deleteProduct(productId);

    const seller = product.seller;
    if (seller) {
      seller.productCount = Math.max((seller.productCount || 1) - 1, 0);
      await this.userService.updateUser(seller.id!, { productCount: seller.productCount });
    }

    return { message: "Product deleted successfully" };
  }

  async getFeaturedProducts() {
    return this.productService.getFeaturedProducts();
  }

  async recommendProduct(productId: string, durationDays: number) {
    const product = await this.productService.getProductById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + durationDays);

    product.isFeaturedProduct = true;
    product.featuredDuration = durationDays;
    product.featuredExpiresAt = expiresAt;

    return await this.productService.saveProduct(product);
  }


  async getRecommendedProducts() {
    await this.productService.clearExpiredFeatured();
    return this.productService.getRecommendedProducts();
  }
}