// src/orders/orders.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CartModule } from '../cart/cart.module';
import {Order} from "../entity/Order";
import {RedisService} from "../redis/redis.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        CartModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService, RedisService],
})
export class OrdersModule {}
