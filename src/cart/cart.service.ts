// src/cart/cart.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RedisService } from '../redis/redis.service';
import { ProductsService } from '../products/products.service';
import { CartItem, CartItemDocument } from "../entity/Cart";

@Injectable()
export class CartService {
    constructor(
        @InjectModel(CartItem.name)
        private readonly cartModel: Model<CartItemDocument>,
        private readonly redisService: RedisService,
        private readonly productsService: ProductsService,
    ) {}

    async getCart(userId: string): Promise<CartItem[]> {
        const cachedCart = await this.redisService
            .getClient()
            .get(`cart:${userId}`);

        if (cachedCart) {
            return JSON.parse(cachedCart);
        }

        const cart = await this.cartModel.find({ userId }).populate('product').exec();

        await this.redisService
            .getClient()
            .setex(`cart:${userId}`, 3600, JSON.stringify(cart));

        return cart;
    }

    async addToCart(userId: string, productId: string, quantity: number) {
        const product = await this.productsService.findOne(productId);
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        // Check if item already exists in cart for this user
        let cartItem = await this.cartModel.findOne({
            userId,
            product: productId,
        }).exec();

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItem = new this.cartModel({
                userId,
                product: productId,
                quantity,
            });
        }

        await cartItem.save();
        await this.redisService.getClient().del(`cart:${userId}`);

        return this.getCart(userId);
    }

    async updateCartItem(userId: string, itemId: string, quantity: number) {
        const cartItem = await this.cartModel.findOne({ _id: itemId, userId }).exec();

        if (!cartItem) {
            throw new NotFoundException('Cart item not found');
        }

        cartItem.quantity = quantity;
        await cartItem.save();
        await this.redisService.getClient().del(`cart:${userId}`);

        return this.getCart(userId);
    }

    async removeCartItem(userId: string, itemId: string) {
        const cartItem = await this.cartModel.findOne({ _id: itemId, userId }).exec();

        if (cartItem) {
            await this.cartModel.findByIdAndDelete(itemId).exec();
        }

        await this.redisService.getClient().del(`cart:${userId}`);
        return this.getCart(userId);
    }

    async clearCart(userId: string) {
        await this.cartModel.deleteMany({ userId }).exec();
        await this.redisService.getClient().del(`cart:${userId}`);
        return [];
    }

    // Method for orders processing
    // async validateCartItems(userId: string): Promise<boolean> {
    //     const cart = await this.getCart(userId);
    //
    //     for (const item of cart) {
    //         const product = await this.productsService.findOne(item.product._id);
    //         if (!product || product.stock < item.quantity) {
    //             return false;
    //         }
    //     }
    //
    //     return true;
    // }
}
