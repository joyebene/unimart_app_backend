import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./user";


@Entity("reports")
export class Report {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.reports)
  reporter!: User;

  @Column()
  reportedId!: string;

  @Column()
  type!: string; // e.g., "product", "user"

  @Column("text")
  reason!: string;

  @Column({ default: "pending" })
  status!: string; // pending, reviewed, closed

  @CreateDateColumn()
  createdAt!: Date;
}