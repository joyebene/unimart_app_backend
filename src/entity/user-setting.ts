import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user";


@Entity("user_settings")
export class UserSetting {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => User, (user) => user.settings)
  @JoinColumn()
  user!: User;

  @Column({ default: true })
  emailNotifications!: boolean;

  @Column({ default: true })
  pushNotifications!: boolean;

  @Column({ default: "system" })
  theme!: string; // light or dark or system
}