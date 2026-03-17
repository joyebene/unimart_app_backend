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

  @Column({ type: "timestamp", nullable: true })
  participantLastReadAt?: Record<string, Date>;

  @OneToMany(() => Message, (msg) => msg.conversation)
  messages!: Message[];

  @CreateDateColumn()
  createdAt!: Date;
}