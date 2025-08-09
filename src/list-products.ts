import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductsService } from './products/products.service';
import { ProductDocument } from './entity/Product';

async function listProducts() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const productsService = app.get(ProductsService);

    console.log('Fetching all products...\n');

    try {
        const products = await productsService.findAll();
        
        if (products.length === 0) {
            console.log('No products found in the database.');
        } else {
            console.log(`Found ${products.length} products:\n`);
            products.forEach((product, index) => {
                const productDoc = product as ProductDocument;
                console.log(`${index + 1}. ${product.name}`);
                console.log(`   Price: $${product.price}`);
                console.log(`   Stock: ${product.stock}`);
                console.log(`   ID: ${productDoc._id}`);
                console.log(`   Image: ${product.imageUrl}`);
                console.log('');
            });
        }
    } catch (error) {
        console.error('Failed to fetch products:', error.message);
    }

    await app.close();
}

listProducts().catch(console.error); 