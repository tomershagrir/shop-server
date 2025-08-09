// src/orders/orders.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CartModule } from '../cart/cart.module';
import { Order, OrderSchema } from "../entity/Order";
import { RedisService } from "../redis/redis.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
        CartModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService, RedisService],
})
export class OrdersModule {}
