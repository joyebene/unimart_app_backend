import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./user";

export type PaymentType = "boost" | "featurebadge";
export type PaymentStatus = "pending" | "completed" | "failed";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: true })
  productId?: string;

  @Column({ type: "enum", enum: ["boost", "featurebadge"] })
  type!: PaymentType;

  @Column()
  reference!: string;

  @Column()
  amount!: number;

  @Column({ type: "jsonb", nullable: true })
  proof?: string;

  @Column({ nullable: true })
  proofCloudinaryId?: string;

  @Column({ type: "enum", enum: ["pending", "completed", "failed"], default: "pending" })
  status!: PaymentStatus;

  @ManyToOne(() => User, (user) => user.payments)
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;
}