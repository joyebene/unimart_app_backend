import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./user";


@Entity("support_messages")
export class SupportMessage {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.supportMessages)
  user!: User;

  @Column()
  subject!: string;

  @Column("text")
  message!: string;

  @Column({ default: "open" })
  status!: string; // open, resolved, closed

  @CreateDateColumn()
  createdAt!: Date;
}