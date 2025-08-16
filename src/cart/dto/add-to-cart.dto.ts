// src/cart/dto/add-to-cart.dto.ts
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class AddToCartDto {
    @IsNumber()
    productId: number;

    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsString()
    userId: string;
}
