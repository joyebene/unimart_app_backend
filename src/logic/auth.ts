import { UserService } from "../service/userService";
import { User } from "../entity/user";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { generateOtp } from "../utils/otp";
import { sendOtpEmail } from "../utils/email";
import { NotificationService } from "../service/notificationService";
import bcrypt from "bcrypt";

export class AuthLogic {
  private userService = new UserService();
  private notificationService = new NotificationService();


  async register(userData: Pick<User, 'fullName' | 'email' | 'password' | 'phone'>) {
    const newUser = await this.userService.createUser(userData);
    await this.sendOtp(newUser.email!);

    //send welcome notification
    await this.notificationService.createNotification(
      newUser as User,
      "Welcome to UniMart",
      "Thank you for registering. We are glad to have you with us. Start exploring and happy shopping!"
    );
    return newUser;
  }

  async login(credentials: Pick<User, 'email' | 'password'>) {
    const user = await this.userService.validateUser(credentials.email, credentials.password);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Check if the user is banned
    if (user.status === "banned") {
      throw new Error("Your account has been suspended. Please contact support.");
    }

    const accessToken = jwt.sign({ id: user.id, email: user.email }, config.JWT_ACCESS_TOKEN!, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, config.JWT_REFRESH_TOKEN!, { expiresIn: '365d' });

    await this.userService.setRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user: { id: user.id, email: user.email, fullName: user.fullName, emailVerified: user.isEmailVerified, avatarUrl: user.avatarUrl } };
  }


  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new Error("Refresh token required");
    }

    let payload: any;

    try {
      payload = jwt.verify(refreshToken, config.JWT_REFRESH_TOKEN!);
    } catch {
      throw new Error("Invalid or expired refresh token");
    }

    const user = await this.userService.getUserByEmail(payload.email);

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.refreshToken || user.refreshToken !== refreshToken) {
      throw new Error("Refresh token mismatch");
    }

    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email },
      config.JWT_ACCESS_TOKEN!,
      { expiresIn: "15m" }
    );

    //rotate refresh token
    const newRefreshToken = jwt.sign(
      { id: user.id, email: user.email },
      config.JWT_REFRESH_TOKEN!,
      { expiresIn: "365d" }
    );

    await this.userService.setRefreshToken(user.id!, newRefreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async sendOtp(email: string) {
    const user = await this.userService.getUserByEmail(email);
    

    if (user?.lastOtpSentAt) {
      const diff = Date.now() - new Date(user.lastOtpSentAt).getTime();

      if (diff < 60 * 1000) {
        const secondsLeft = Math.ceil((60 * 1000 - diff) / 1000);
        throw new Error(`Please wait ${secondsLeft}s before requesting another OTP`);
      }
    }

    await this.userService.clearOtp(user?.id!);

    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await this.userService.setOtp(user?.id!, otp, otpExpiresAt);
    await sendOtpEmail(user as User, otp);

      return ("otp sent if email exists");
  }

  async verifyOtp(email: string, otp: string, purpose: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user || !user.otp) {
      throw new Error("Invalid OTP");
    }
    // Compare the hashed OTP
    const isOtpValid = await bcrypt.compare(otp, user.otp);
    if (!isOtpValid) {
      throw new Error("Invalid OTP");
    }

    if (user.otpExpiresAt! < new Date()) {
      throw new Error("OTP has expired");
    }

    if (purpose !== "emailVerification" && purpose !== "passwordReset") {
      throw new Error("This OTP cannot be used for this action.");
    }

    // 2. Conditionally call verifyEmail if the purpose matches
    if (purpose === "emailVerification") {

      await this.userService.verifyEmail(user.id);

      await this.userService.clearOtp(user.id);

      return { message: "Email verified successfully" };
    }


    return { message: "OTP verified successfully" };
  }

  async forgotPassword(email: string) {
    await this.sendOtp(email);
    return { message: "OTP sent to your email for password reset" };
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) throw new Error("User not found");

     
    const isOtpValid = await bcrypt.compare(otp, user.otp!);
    if (!isOtpValid) {
      throw new Error("Invalid OTP");
    }

    if (user.otpExpiresAt! < new Date()) {
      throw new Error("Expired OTP");
    }

    await this.userService.resetUserPassword(user.id, newPassword);

    await this.userService.clearOtp(user.id);

    await this.userService.setRefreshToken(user.id, null);

    return { message: "Password reset successfully" };
  }

  async resendOtp(email: string) {
    await this.sendOtp(email);

    return { message: "OTP resent successfully" };
  }

  async logout(userId: string) {
    // Clear the refresh token from the database
    return this.userService.setRefreshToken(userId, null);
  }
}