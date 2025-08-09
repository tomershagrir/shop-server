import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(userId: string): Promise<import("../entity/Cart").CartItem[]>;
    addToCart(addToCartDto: AddToCartDto): Promise<import("../entity/Cart").CartItem[]>;
    updateCartItem(userId: string, itemId: string, updateCartItemDto: UpdateCartItemDto): Promise<import("../entity/Cart").CartItem[]>;
    removeCartItem(userId: string, itemId: string): Promise<import("../entity/Cart").CartItem[]>;
    clearCart(userId: string): Promise<any[]>;
}
