// src/products/products.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {Product} from "../entity/Product";
import {RedisService} from "../redis/redis.service";


@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductsController],
    providers: [ProductsService, RedisService],
    exports: [ProductsService],
})
export class ProductsModule {}
