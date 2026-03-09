import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./user";
import { Product } from "./product";


@Entity("feedbacks")
export class Feedback {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.feedbacks)
  user!: User;

  @Column("text")
  message!: string;

  @Column({ type: "int", nullable: true })
  rating!: number; // e.g., 1-5 stars

  @CreateDateColumn()
  createdAt!: Date;
}