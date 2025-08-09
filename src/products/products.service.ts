
// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RedisService } from '../redis/redis.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from "../entity/Product";

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDocument>,
        private readonly redisService: RedisService,
    ) {}

    async findAll(): Promise<Product[]> {
        const cachedProducts = await this.redisService
            .getClient()
            .get('products:all');

        if (cachedProducts) {
            return JSON.parse(cachedProducts);
        }

        const products = await this.productModel.find().exec();
        await this.redisService
            .getClient()
            .setex('products:all', 3600, JSON.stringify(products));

        return products;
    }

    async findOne(id: string): Promise<Product> {
        const cachedProduct = await this.redisService
            .getClient()
            .get(`product:${id}`);

        if (cachedProduct) {
            return JSON.parse(cachedProduct);
        }

        const product = await this.productModel.findById(id).exec();
        if (product) {
            await this.redisService
                .getClient()
                .setex(`product:${id}`, 3600, JSON.stringify(product));
        }

        return product;
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product = new this.productModel(createProductDto);
        await product.save();

        await this.redisService
            .getClient()
            .del('products:all');

        return product;
    }
}
