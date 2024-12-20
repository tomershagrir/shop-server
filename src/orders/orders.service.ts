
// src/orders/orders.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { RedisService } from '../redis/redis.service';
import {Order} from "../entity/Order";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly cartService: CartService,
        private readonly redisService: RedisService,
    ) {}

    async createOrder(userId: string): Promise<Order> {
        const cart = await this.cartService.getCart(userId);
        const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

        const order = this.orderRepository.create({
            total,
            status: 'pending',
        });

        await this.orderRepository.save(order);
        await this.redisService.getClient().del(`cart:${userId}`);

        return order;
    }

    async getOrders(userId: string): Promise<Order[]> {
        return this.orderRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }
}
