import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  Column
} from "typeorm";
import { User } from "./user";
import { Message } from "./message";

@Entity("conversations")
export class Conversation {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToMany(() => User, (user) => user.conversations)
  @JoinTable()
  participants!: User[];

  @Column("jsonb", { nullable: true, default: {} })
  lastRead!: Record<string, string>;

  @OneToMany(() => Message, (msg) => msg.conversation, { onDelete: "CASCADE" })
  messages!: Message[];

  @CreateDateColumn()
  createdAt!: Date;
  
}