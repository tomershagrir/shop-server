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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const redis_service_1 = require("../redis/redis.service");
const products_service_1 = require("../products/products.service");
const Cart_1 = require("../entity/Cart");
let CartService = class CartService {
    constructor(cartModel, redisService, productsService) {
        this.cartModel = cartModel;
        this.redisService = redisService;
        this.productsService = productsService;
    }
    async getCart(userId) {
        const cachedCart = await this.redisService
            .getClient()
            .get(`cart:${userId}`);
        if (cachedCart) {
            return JSON.parse(cachedCart);
        }
        const cart = await this.cartModel.find().populate('product').exec();
        await this.redisService
            .getClient()
            .setex(`cart:${userId}`, 3600, JSON.stringify(cart));
        return cart;
    }
    async addToCart(userId, productId, quantity) {
        const product = await this.productsService.findOne(productId);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        let cartItem = await this.cartModel.findOne({
            product: productId,
        }).exec();
        if (cartItem) {
            cartItem.quantity += quantity;
        }
        else {
            cartItem = new this.cartModel({
                product: productId,
                quantity,
            });
        }
        await cartItem.save();
        await this.redisService.getClient().del(`cart:${userId}`);
        return this.getCart(userId);
    }
    async updateCartItem(userId, itemId, quantity) {
        const cartItem = await this.cartModel.findById(itemId).exec();
        if (!cartItem) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        cartItem.quantity = quantity;
        await cartItem.save();
        await this.redisService.getClient().del(`cart:${userId}`);
        return this.getCart(userId);
    }
    async removeCartItem(userId, itemId) {
        const cartItem = await this.cartModel.findById(itemId).exec();
        if (cartItem) {
            await this.cartModel.findByIdAndDelete(itemId).exec();
        }
        await this.redisService.getClient().del(`cart:${userId}`);
        return this.getCart(userId);
    }
    async clearCart(userId) {
        await this.cartModel.deleteMany({}).exec();
        await this.redisService.getClient().del(`cart:${userId}`);
        return [];
    }
};
CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Cart_1.CartItem.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        redis_service_1.RedisService,
        products_service_1.ProductsService])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map