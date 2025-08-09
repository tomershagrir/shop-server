import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductsService } from './products/products.service';
import { ProductDocument } from './entity/Product';

async function clearProducts() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const productsService = app.get(ProductsService);

    console.log('Starting to clear products...');

    try {
        // Get all products first to show what we're deleting
        const products = await productsService.findAll();
        console.log(`Found ${products.length} products to delete`);

        // Clear all products (this would need to be implemented in the service)
        // For now, we'll just log what we found
        console.log('Products found:');
        products.forEach(product => {
            const productDoc = product as ProductDocument;
            console.log(`- ${product.name} (ID: ${productDoc._id})`);
        });

        console.log('Note: To actually delete products, implement a deleteAll method in ProductsService');
    } catch (error) {
        console.error('Failed to clear products:', error.message);
    }

    console.log('Product clearing completed!');
    await app.close();
}

clearProducts().catch(console.error); 