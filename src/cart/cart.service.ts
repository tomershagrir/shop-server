// src/cart/cart.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from '../redis/redis.service';
import { ProductsService } from '../products/products.service';
import {CartItem} from "../entity/Cart";

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartItem)
        private readonly cartRepository: Repository<CartItem>,
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

        const cart = await this.cartRepository.find({
            relations: ['product'],
        });

        await this.redisService
            .getClient()
            .setex(`cart:${userId}`, 3600, JSON.stringify(cart));

        return cart;
    }

    async addToCart(userId: string, productId: number, quantity: number) {
        const product = await this.productsService.findOne(productId);
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        // Check if item already exists in cart
        let cartItem = await this.cartRepository.findOne({
            where: { product: { id: productId } },
        });

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItem = this.cartRepository.create({
                product,
                quantity,
            });
        }

        await this.cartRepository.save(cartItem);
        await this.redisService.getClient().del(`cart:${userId}`);

        return this.getCart(userId);
    }

    async updateCartItem(userId: string, itemId: number, quantity: number) {
        const cartItem = await this.cartRepository.findOne({
            where: { id: itemId, userId },
        });

        if (!cartItem) {
            throw new NotFoundException('Cart item not found');
        }

        cartItem.quantity = quantity;
        await this.cartRepository.save(cartItem);
        await this.redisService.getClient().del(`cart:${userId}`);

        return this.getCart(userId);
    }

    async removeCartItem(userId: string, itemId: number) {
        const cartItem = await this.cartRepository.findOne({ where: { product: { id: itemId } } });

        // Delete the cart item from the database
        await this.cartRepository.remove(cartItem);

        await this.redisService.getClient().del(`cart:${userId}`);
        return this.getCart(userId);
    }

    async clearCart(userId: string) {
        await this.cartRepository.delete({ });
        await this.redisService.getClient().del(`cart:${userId}`);
        return [];
    }

    // Method for orders processing
    // async validateCartItems(userId: string): Promise<boolean> {
    //     const cart = await this.getCart(userId);
    //
    //     for (const item of cart) {
    //         const product = await this.productsService.findOne(item.product.id);
    //         if (!product || product.stock < item.quantity) {
    //             return false;
    //         }
    //     }
    //
    //     return true;
    // }
}
