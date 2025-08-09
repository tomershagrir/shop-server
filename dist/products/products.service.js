"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const redis_service_1 = require("../redis/redis.service");
const Product_1 = require("../entity/Product");
let ProductsService = class ProductsService {
    constructor(productModel, redisService) {
        this.productModel = productModel;
        this.redisService = redisService;
    }
    async findAll() {
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
    async findOne(id) {
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
    async create(createProductDto) {
        const product = new this.productModel(createProductDto);
        await product.save();
        await this.redisService
            .getClient()
            .del('products:all');
        return product;
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Product_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        redis_service_1.RedisService])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map