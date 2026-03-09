import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity("devices")
export class Device {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.devices)
  user!: User;

  @Column()
  deviceToken!: string;

  @Column()
  platform!: string; // e.g., 'ios', 'android'
}