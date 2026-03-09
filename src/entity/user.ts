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

  @Column({ select: false, nullable: true })
  refreshToken!: string;

  @Column({ nullable: true })
  avatarUrl!: string;

  @Column({ nullable: true })
  avatarCloudinaryId!: string;

  @Column({ nullable: true })
  bio!: string;

  @Column({ nullable: true })
  location!: string;

  @Column()
  phone!: string;

  // email verification
  @Column({ default: false })
  isEmailVerified!: boolean;

  // OTP for email verification or password reset
  @Column({ nullable: true, select: false })
  otp!: string;

  @Column({ type: "timestamptz", nullable: true, select: false })
  otpExpiresAt!: Date;

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