import { UserService } from "../service/userService";
import { User } from "../entity/user";

import { uploadFilesToCloudinary, deleteFromCloudinary } from "../utils/cloudinary";

export class UserLogic {
  private userService = new UserService();

  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  async getUserById(userId: string) {
    return this.userService.getUserById(userId);
  }

  async getAuthenticatedUser(userId: string) {
    return this.userService.getUserById(userId);
  }

  async updateUser(
    userId: string,
    updates: Partial<User>,
    currentPassword?: string
  ) {
    return this.userService.updateUser(userId, updates, currentPassword);
  }

  async updateAvatar(userId: string, file: Express.Multer.File) {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // If user already has an avatar, delete the old one from Cloudinary
    if (user.avatarCloudinaryId) {
      await deleteFromCloudinary([user.avatarCloudinaryId]);
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

    return this.userService.updateUser(userId, {
      avatarUrl: image.url,
      avatarCloudinaryId: image.cloudinaryId,
    });
  }
}