import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getOrders(userId: string): Promise<import("../entity/Order").Order[]>;
    createOrder(createOrderDto: CreateOrderDto): Promise<import("../entity/Order").Order>;
}
