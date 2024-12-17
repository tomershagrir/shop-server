import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID, Float } from "type-graphql";

@ObjectType()
@Entity()
export class Order {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    customerEmail: string;

    @Field(() => Float)
    @Column("float")
    total: number;

    @Field()
    @Column()
    status: string;
}
