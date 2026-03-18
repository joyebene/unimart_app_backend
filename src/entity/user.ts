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