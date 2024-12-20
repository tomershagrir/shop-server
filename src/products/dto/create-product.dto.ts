// src/products/dto/create-product.dto.ts
import { IsString, IsNumber, IsUrl, IsOptional } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    stock: number;

    @IsUrl()
    @IsOptional()
    imageUrl?: string;
}
