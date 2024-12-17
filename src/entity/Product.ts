import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID, Float } from "type-graphql";

@ObjectType()
@Entity()
export class Product {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    description: string;

    @Field(() => Float)
    @Column("decimal", { precision: 10, scale: 2 })
    price: number;

    @Field()
    @Column()
    imageUrl: string;
}
