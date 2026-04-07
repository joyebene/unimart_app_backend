import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product";
import { WishlistItem } from "./wishlist";
import { UserSetting } from "./user-setting";
import { SupportMessage } from "./support-message";
import { Report } from "./report";
import { Conversation } from "./conversation";
import { Message } from "./message";
 import { Feedback } from "./feedback";
 import { Notification } from "./notification";
 import { ManyToMany } from "typeorm";
 import { Device } from "./device";
import { Payment } from "./payment";

 export enum UserStatus {
  ACTIVE = "active",
  BANNED = "banned",
 }

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  fullName!: string;

  @Column({ unique: true })
  email!: string;

  // sensitive fields
  @Column({ select: false })
  password!: string;

  @Column({ type: "text", select: false, nullable: true })
  refreshToken!: string | null;

  @Column({ type: "text", nullable: true })
  avatarUrl!: string | null;

  @Column({ type: "text", nullable: true })
  avatarCloudinaryId!: string | null;

  @Column({ type: "text", nullable: true })
  bio!: string | null;

  @Column({ type: "text", nullable: true })
  location!: string | null;

  @Column()
  phone!: string;

  @Column({ default: false })
  isFeaturedSeller!: boolean;

  // email verification
  @Column({ default: false })
  isEmailVerified!: boolean;

  // OTP for email verification or password reset
  @Column({ type: "text", nullable: true, select: false })
  otp!: string | null;

  @Column({ type: "timestamptz", nullable: true, select: false })
  otpExpiresAt!: Date | null;

  @Column({ type: "timestamptz", nullable: true, select: false })
  lastOtpSentAt?: Date | null;

  @Column({ type: "int", default: 0 })
  productCount!: number;

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status!: UserStatus;

  @OneToMany(() => Product, (product) => product.seller)
  products!: Product[];

  @OneToMany(() => WishlistItem, (item) => item.user)
  wishlist!: WishlistItem[];

  @OneToOne(() => UserSetting, (setting) => setting.user, { cascade: true })
  @JoinColumn()
  settings!: UserSetting;

  @OneToMany(() => SupportMessage, (msg) => msg.user)
  supportMessages!: SupportMessage[];

  @OneToMany(() => Report, (report) => report.reporter)
  reports!: Report[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments!: Payment[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications!: Notification[];

  @ManyToMany(() => Conversation, (conv) => conv.participants)
  conversations!: Conversation[];

  @OneToMany(() => Message, (msg) => msg.sender)
  messages!: Message[];

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks!: Feedback[];

  @OneToMany(() => Device, (device) => device.user)
  devices!: Device[];

  @CreateDateColumn()
  createdAt!: Date;
}