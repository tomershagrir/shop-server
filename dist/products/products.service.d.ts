import { Model } from 'mongoose';
import { RedisService } from '../redis/redis.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from "../entity/Product";
export declare class ProductsService {
    private readonly productModel;
    private readonly redisService;
    constructor(productModel: Model<ProductDocument>, redisService: RedisService);
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    create(createProductDto: CreateProductDto): Promise<Product>;
}
