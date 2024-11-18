
// src/entity/Order.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerEmail: string;

    @Column("decimal", { precision: 10, scale: 2 })
    total: number;

    @Column()
    status: string;

    @CreateDateColumn()
    createdAt: Date;
}
