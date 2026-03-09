import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  ManyToMany,
  JoinTable
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

  @OneToMany(() => Message, (msg) => msg.conversation)
  messages!: Message[];

  @CreateDateColumn()
  createdAt!: Date;
}