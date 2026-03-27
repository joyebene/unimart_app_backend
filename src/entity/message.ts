import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./user";
import { Conversation } from "./conversation";


@Entity("messages")
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.messages)
  sender!: User;

  @ManyToOne(() => Conversation, ( conv ) => conv.messages, { onDelete: "CASCADE" })
  conversation!: Conversation;

  @Column("text")
  body!: string;

  @Column({ nullable: true })
  attachmentUrl!: string;

  @CreateDateColumn()
  createdAt!: Date;
}