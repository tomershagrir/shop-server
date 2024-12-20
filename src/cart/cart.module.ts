// src/cart/cart.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { ProductsModule } from '../products/products.module';
import {CartItem} from "../entity/Cart";
import {RedisService} from "../redis/redis.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([CartItem]),
        ProductsModule,
    ],
    controllers: [CartController],
    providers: [CartService, RedisService],
    exports: [CartService],
})
export class CartModule {}
