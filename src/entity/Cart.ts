import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Product } from "./Product";

@ObjectType()
@Entity()
export class CartItem {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Product)
    @ManyToOne(() => Product, { eager: true })
    product: Product;

    @Field(() => Int)
    @Column()
    quantity: number;
}
