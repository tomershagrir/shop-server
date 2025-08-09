import { Model } from 'mongoose';
import { CartService } from '../cart/cart.service';
import { RedisService } from '../redis/redis.service';
import { Order, OrderDocument } from "../entity/Order";
export declare class OrdersService {
    private readonly orderModel;
    private readonly cartService;
    private readonly redisService;
    constructor(orderModel: Model<OrderDocument>, cartService: CartService, redisService: RedisService);
    createOrder(userId: string): Promise<Order>;
    getOrders(userId: string): Promise<Order[]>;
}
