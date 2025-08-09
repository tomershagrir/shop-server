
// src/entity/Cart.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartItemDocument = CartItem & Document;

@Schema({ timestamps: true })
export class CartItem {
    @Prop({ required: true })
    userId: string;

    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    product: Types.ObjectId;

    @Prop({ required: true, type: Number })
    quantity: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
