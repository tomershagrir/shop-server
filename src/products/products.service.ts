
// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from '../redis/redis.service';
import { CreateProductDto } from './dto/create-product.dto';
import {Product} from "../entity/Product";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly redisService: RedisService,
    ) {}

    async findAll(): Promise<Product[]> {
        const cachedProducts = await this.redisService
            .getClient()
            .get('products:all');

        if (cachedProducts) {
            return JSON.parse(cachedProducts);
        }

        const products = await this.productRepository.find();
        await this.redisService
            .getClient()
            .setex('products:all', 3600, JSON.stringify(products));

        return products;
    }

    async findOne(id: number): Promise<Product> {
        const cachedProduct = await this.redisService
            .getClient()
            .get(`product:${id}`);

        if (cachedProduct) {
            return JSON.parse(cachedProduct);
        }

        const product = await this.productRepository.findOne({ where: { id } });
        if (product) {
            await this.redisService
                .getClient()
                .setex(`product:${id}`, 3600, JSON.stringify(product));
        }

        return product;
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product = this.productRepository.create(createProductDto);
        await this.productRepository.save(product);

        await this.redisService
            .getClient()
            .del('products:all');

        return product;
    }
}
