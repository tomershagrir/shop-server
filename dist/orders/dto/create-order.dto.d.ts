declare class OrderItemDto {
    productId: number;
    quantity: number;
}
export declare class CreateOrderDto {
    userId: string;
    items: OrderItemDto[];
}
export {};
