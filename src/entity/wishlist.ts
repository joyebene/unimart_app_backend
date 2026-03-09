import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./user";
import { Product } from "./product";


@Entity("wishlist_items")
export class WishlistItem {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => User, (user) => user.wishlist)
    user!: User;

    @ManyToOne(() => Product)
    product!: Product;

    @CreateDateColumn()
    createdAt!: Date;
}