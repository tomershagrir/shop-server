// src/cart/cart.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { ProductsModule } from '../products/products.module';
import { CartItem, CartItemSchema } from "../entity/Cart";
import { RedisService } from "../redis/redis.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: CartItem.name, schema: CartItemSchema }]),
        ProductsModule,
    ],
    controllers: [CartController],
    providers: [CartService, RedisService],
    exports: [CartService],
})
export class CartModule {}
