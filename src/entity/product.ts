import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  category!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  @Column({ nullable: true })
  description!: string;

  @Column()
  imageUrl!: string;

  @Column()
  imageCloudinaryId!: string;

  @Column({ default: false })
  isFeaturedProduct!: boolean;

  @Column({ type: "int", nullable: true })
  featuredDuration!: number | null;

  @Column({ type: "timestamp", nullable: true })
  featuredExpiresAt!: Date | null;

  @ManyToOne(() => User, (user) => user.products, { onDelete: "CASCADE" })
  seller!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}