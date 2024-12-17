import { Resolver, Mutation, Arg } from "type-graphql";
import { Order } from "../entity/Order";
import { CartItem } from "../entity/Cart";
import {getRepository, Repository} from "typeorm";

@Resolver(() => Order)
export class OrderResolver {
    private readonly orderRepository: Repository<Order>;
    private readonly cartRepository: Repository<CartItem>;

    constructor(orderRepository: Repository<Order>, cartRepository: Repository<CartItem>) {
        this.orderRepository = getRepository(Order);
        this.cartRepository = getRepository(CartItem);
    }

    @Mutation(() => Order)
    async createOrder(@Arg("customerEmail") customerEmail: string): Promise<Order> {
        const cartItems = await this.cartRepository.find({ relations: ["product"] });

        const total = cartItems.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);

        const order = this.orderRepository.create({ customerEmail, total, status: "pending" });
        await this.orderRepository.save(order);

        await this.cartRepository.clear();

        return order;
    }
}
