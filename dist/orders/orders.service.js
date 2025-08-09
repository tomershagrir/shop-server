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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cart_service_1 = require("../cart/cart.service");
const redis_service_1 = require("../redis/redis.service");
const Order_1 = require("../entity/Order");
let OrdersService = class OrdersService {
    constructor(orderModel, cartService, redisService) {
        this.orderModel = orderModel;
        this.cartService = cartService;
        this.redisService = redisService;
    }
    async createOrder(userId) {
        const cart = await this.cartService.getCart(userId);
        const total = cart.reduce((sum, item) => {
            const product = item.product;
            return sum + product.price * item.quantity;
        }, 0);
        const order = new this.orderModel({
            customerEmail: userId,
            total,
            status: 'pending',
        });
        await order.save();
        await this.redisService.getClient().del(`cart:${userId}`);
        return order;
    }
    async getOrders(userId) {
        return this.orderModel.find({
            customerEmail: userId,
        }).sort({ createdAt: -1 }).exec();
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Order_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cart_service_1.CartService,
        redis_service_1.RedisService])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map