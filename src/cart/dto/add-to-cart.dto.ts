// src/cart/dto/add-to-cart.dto.ts
import { IsString, IsPositive, IsNumber } from 'class-validator';

export class AddToCartDto {
    @IsString()
    productId: string;

    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsString()
    userId: string;
}
