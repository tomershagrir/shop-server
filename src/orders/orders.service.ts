
// src/orders/orders.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartService } from '../cart/cart.service';
import { RedisService } from '../redis/redis.service';
import { Order, OrderDocument } from "../entity/Order";

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name)
        private readonly orderModel: Model<OrderDocument>,
        private readonly cartService: CartService,
        private readonly redisService: RedisService,
    ) {}

    async createOrder(userId: string): Promise<Order> {
        const cart = await this.cartService.getCart(userId);
        const total = cart.reduce((sum, item) => {
            const product = item.product as any; // Type assertion for populated product
            return sum + product.price * item.quantity;
        }, 0);

        const order = new this.orderModel({
            customerEmail: userId, // Using userId as email for now
            total,
            status: 'pending',
        });

        await order.save();
        await this.redisService.getClient().del(`cart:${userId}`);

        return order;
    }

    async getOrders(userId: string): Promise<Order[]> {
        return this.orderModel.find({
            customerEmail: userId,
        }).sort({ createdAt: -1 }).exec();
    }
}
