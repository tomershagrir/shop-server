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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const add_to_cart_dto_1 = require("./dto/add-to-cart.dto");
const update_cart_item_dto_1 = require("./dto/update-cart-item.dto");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async getCart(userId) {
        try {
            return await this.cartService.getCart(userId);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch cart', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addToCart(addToCartDto) {
        try {
            return await this.cartService.addToCart(addToCartDto.userId, addToCartDto.productId, addToCartDto.quantity);
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Failed to add item to cart', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateCartItem(userId, itemId, updateCartItemDto) {
        try {
            return await this.cartService.updateCartItem(userId, itemId, updateCartItemDto.quantity);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to update cart item', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeCartItem(userId, itemId) {
        try {
            return await this.cartService.removeCartItem(userId, itemId);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to remove cart item', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async clearCart(userId) {
        try {
            return await this.cartService.clearCart(userId);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to clear cart', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_to_cart_dto_1.AddToCartDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Put)(':userId/items/:itemId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('itemId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_cart_item_dto_1.UpdateCartItemDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateCartItem", null);
__decorate([
    (0, common_1.Delete)(':userId/items/:itemId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeCartItem", null);
__decorate([
    (0, common_1.Delete)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "clearCart", null);
CartController = __decorate([
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map