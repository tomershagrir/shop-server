// src/orders/dto/create-order.dto.ts
import { IsString } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    userId: string;
}
