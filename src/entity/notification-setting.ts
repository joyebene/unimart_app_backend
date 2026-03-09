import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity("notification_settings")
export class NotificationSettings {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @OneToOne(() => User)
    @JoinColumn()
    user!: User;

    @Column({ default: true }) push!: boolean;
    @Column({ default: true }) pushNewListings!: boolean;
    @Column({ default: true }) pushPriceDrops!: boolean;
    @Column({ default: true }) pushMessages!: boolean;

    @Column({ default: true }) email!: boolean;
    @Column({ default: true }) emailWishlist!: boolean;
    @Column({ default: false }) emailPromos!: boolean;

    @Column({ default: true }) inApp!: boolean;
    @Column({ default: true }) inAppMessages!: boolean;
}