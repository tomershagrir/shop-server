
// src/entity/Order.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
    @Prop({ required: true })
    customerEmail: string;

    @Prop({ required: true, type: Number })
    total: number;

    @Prop({ required: true })
    status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
