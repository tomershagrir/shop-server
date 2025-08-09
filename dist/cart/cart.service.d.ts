import { Model } from 'mongoose';
import { RedisService } from '../redis/redis.service';
import { ProductsService } from '../products/products.service';
import { CartItem, CartItemDocument } from "../entity/Cart";
export declare class CartService {
    private readonly cartModel;
    private readonly redisService;
    private readonly productsService;
    constructor(cartModel: Model<CartItemDocument>, redisService: RedisService, productsService: ProductsService);
    getCart(userId: string): Promise<CartItem[]>;
    addToCart(userId: string, productId: string, quantity: number): Promise<CartItem[]>;
    updateCartItem(userId: string, itemId: string, quantity: number): Promise<CartItem[]>;
    removeCartItem(userId: string, itemId: string): Promise<CartItem[]>;
    clearCart(userId: string): Promise<any[]>;
}
