// src/products/products.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from "../entity/Product";
import { RedisService } from "../redis/redis.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
    controllers: [ProductsController],
    providers: [ProductsService, RedisService],
    exports: [ProductsService],
})
export class ProductsModule {}
