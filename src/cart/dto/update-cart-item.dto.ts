// src/cart/dto/update-cart-item.dto.ts
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateCartItemDto {
    @IsNumber()
    @IsPositive()
    quantity: number;
}
