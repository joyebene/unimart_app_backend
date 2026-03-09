// src/services/user.service.ts
import { getRepository } from "../connection/data-source";
import { User } from "../entity/user";
import bcrypt from "bcryptjs";

export class UserService {
  private userRepository = getRepository(User);

  // ---------------- Get all users ----------------
  async getAllUsers(): Promise<Partial<User>[]> {
    return this.userRepository.find({
      select: ["id", "fullName", "email", "avatarUrl", "bio", "location", "phone", "createdAt"],
    });
  }

  // ---------------- Get a single user ----------------
  async getUserById(userId: string): Promise<Partial<User> | null> {
    return this.userRepository.findOne({
      where: { id: userId },
      select: ["id", "fullName", "email", "avatarUrl", "bio", "location", "phone", "createdAt"],
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  // ---------------- Create a new user ----------------
  async createUser(data: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    avatarUrl?: string;
    bio?: string;
    location?: string;
  }): Promise<Partial<User>> {
    const existing = await this.userRepository.findOne({ where: { email: data.email } });
    if (existing) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = this.userRepository.create(data);
    newUser.password = hashedPassword;

    await this.userRepository.save(newUser);

    // Return user without sensitive info
    const { password, refreshToken, ...userSafe } = newUser;
    return userSafe;
  }

  // ---------------- Update user ----------------
  async updateUser(
    userId: string,
    updates: Partial<User>,
    currentPassword?: string
  ): Promise<Partial<User>> {
    // If updating password, verify current password
    if (updates.password) {
      if (!currentPassword) {
        throw new Error("Current password is required to update your password.");
      }
      const userWithPassword = await this.userRepository
        .createQueryBuilder("user")
        .addSelect("user.password")
        .where("user.id = :id", { id: userId })
        .getOne();
      if (!userWithPassword) {
        throw new Error("User not found");
      }
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        userWithPassword.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid current password.");
      }
      // Hash the new password
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error("User not found");
    // Prevent updating sensitive fields directly
    if ("refreshToken" in updates) delete updates.refreshToken;
    Object.assign(user, updates);
    await this.userRepository.save(user);

    const { password, refreshToken, ...userSafe } = user;
    return userSafe;
  }

  // ---------------- Set refresh token ----------------
  async setRefreshToken(userId: string, token: string | undefined) {
    await this.userRepository.update(userId, { refreshToken: token });
  }

  // ---------------- Validate user password ----------------
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    return user;
  }

  // ---------------- Mark email as verified ----------------
  async verifyEmail(userId: string) {
    await this.userRepository.update(userId, { isEmailVerified: true });
  }

  // ---------------- Set OTP ----------------
  async setOtp(userId: string, otp: string, otpExpire: Date) {
    await this.userRepository.update(userId, { otp, otpExpiresAt: otpExpire });
  }

  // ---------------- Clear OTP ----------------
  async clearOtp(userId: string) {
    await this.userRepository.update(userId, { otp: undefined, otpExpiresAt: undefined });
  }

  save(user: User) {
    return this.userRepository.save(user);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }

}