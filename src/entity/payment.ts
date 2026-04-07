import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

export type PaymentType = "boost" | "featurebadge";
export type PaymentStatus = "pending" | "completed" | "failed";

export interface PaymentProof {
  url: string;
  cloudinaryId: string;
  fileName: string;
  uploadedAt: string;
}

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @Column({ nullable: true })
  productId?: string;

  @Column({ type: "enum", enum: ["boost", "featurebadge"] })
  type!: PaymentType;

  @Column()
  reference!: string;

  @Column()
  amount!: number;

  @Column({ type: "jsonb", nullable: true })
  proof?: PaymentProof[];

  @Column({ type: "enum", enum: ["pending", "completed", "failed"], default: "pending" })
  status!: PaymentStatus;

  @CreateDateColumn()
  createdAt!: Date;
}