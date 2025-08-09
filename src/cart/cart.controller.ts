// src/cart/cart.controller.ts
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get(':userId')
    async getCart(@Param('userId') userId: string) {
        try {
            return await this.cartService.getCart(userId);
        } catch (error) {
            throw new HttpException(
                'Failed to fetch cart',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post()
    async addToCart(@Body() addToCartDto: AddToCartDto) {
        try {
            return await this.cartService.addToCart(
                addToCartDto.userId,
                addToCartDto.productId,
                addToCartDto.quantity,
            );
        } catch (error) {
            console.error(error)
            throw new HttpException(
                'Failed to add item to cart',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Put(':userId/items/:itemId')
    async updateCartItem(
        @Param('userId') userId: string,
        @Param('itemId') itemId: string,
        @Body() updateCartItemDto: UpdateCartItemDto,
    ) {
        try {
            return await this.cartService.updateCartItem(
                userId,
                itemId,
                updateCartItemDto.quantity,
            );
        } catch (error) {
            throw new HttpException(
                'Failed to update cart item',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Delete(':userId/items/:itemId')
    async removeCartItem(
        @Param('userId') userId: string,
        @Param('itemId') itemId: string,
    ) {
        try {
            return await this.cartService.removeCartItem(userId, itemId);
        } catch (error) {
            throw new HttpException(
                'Failed to remove cart item',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Delete(':userId')
    async clearCart(@Param('userId') userId: string) {
        try {
            return await this.cartService.clearCart(userId);
        } catch (error) {
            throw new HttpException(
                'Failed to clear cart',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
