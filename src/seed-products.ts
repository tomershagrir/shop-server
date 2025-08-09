import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductsService } from './products/products.service';

const sampleProducts = [
    {
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life',
        price: 89.99,
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
    },
    {
        name: 'Smartphone Case',
        description: 'Durable protective case for smartphones with shock absorption technology',
        price: 24.99,
        stock: 100,
        imageUrl: 'https://images.unsplash.com/photo-1603314585442-ee3f3b9cb1b4?w=400&h=400&fit=crop'
    },
    {
        name: 'Laptop Stand',
        description: 'Adjustable aluminum laptop stand for better ergonomics and cooling',
        price: 45.50,
        stock: 75,
        imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop'
    },
    {
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical gaming keyboard with customizable switches and backlighting',
        price: 129.99,
        stock: 30,
        imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop'
    },
    {
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with precision tracking and long battery life',
        price: 34.99,
        stock: 80,
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop'
    },
    {
        name: 'USB-C Cable',
        description: 'Fast charging USB-C cable with data transfer capabilities',
        price: 12.99,
        stock: 200,
        imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop'
    },
    {
        name: 'Portable Charger',
        description: '10000mAh portable power bank with fast charging for all devices',
        price: 29.99,
        stock: 60,
        imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400&h=400&fit=crop'
    },
    {
        name: 'Webcam HD',
        description: '1080p HD webcam with built-in microphone for video conferencing',
        price: 59.99,
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'
    },
    {
        name: 'Gaming Headset',
        description: '7.1 surround sound gaming headset with noise-canceling microphone',
        price: 79.99,
        stock: 35,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
    },
    {
        name: 'Tablet Stand',
        description: 'Adjustable tablet holder for hands-free viewing and typing',
        price: 19.99,
        stock: 90,
        imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop'
    },
    {
        name: 'Bluetooth Speaker',
        description: 'Portable waterproof Bluetooth speaker with 360-degree sound',
        price: 49.99,
        stock: 55,
        imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop'
    },
    {
        name: 'Wireless Earbuds',
        description: 'True wireless earbuds with active noise cancellation and touch controls',
        price: 149.99,
        stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop'
    },
    {
        name: 'Monitor Arm',
        description: 'Gas spring monitor mount for ergonomic positioning',
        price: 89.99,
        stock: 20,
        imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop'
    },
    {
        name: 'USB Hub',
        description: '7-port USB 3.0 hub with individual power switches',
        price: 22.99,
        stock: 120,
        imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop'
    },
    {
        name: 'Desk Lamp',
        description: 'LED desk lamp with adjustable brightness and color temperature',
        price: 39.99,
        stock: 70,
        imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop'
    }
];

async function seedProducts() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const productsService = app.get(ProductsService);

    console.log('Starting to seed products...');

    for (const productData of sampleProducts) {
        try {
            const product = await productsService.create(productData);
            console.log(`Created product: ${product.name} - $${product.price} (Stock: ${product.stock})`);
        } catch (error) {
            console.error(`Failed to create product ${productData.name}:`, error.message);
        }
    }

    console.log('Product seeding completed!');
    await app.close();
}

seedProducts().catch(console.error); 