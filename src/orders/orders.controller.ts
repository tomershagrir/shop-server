// src/orders/orders.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get(':userId')
    async getOrders(@Param('userId') userId: string) {
        try {
            return await this.ordersService.getOrders(userId);
        } catch (error) {
            throw new HttpException(
                'Failed to fetch orders',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        try {
            return await this.ordersService.createOrder(createOrderDto.userId);
        } catch (error) {
            throw new HttpException(
                'Failed to create order',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
