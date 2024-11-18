// src/app.ts
import "reflect-metadata";
import express from "express";
import {createConnection, getRepository} from "typeorm";
import cors from "cors";
import { Product } from "./entity/Product";
import { CartItem } from "./entity/Cart";
import { Order } from "./entity/Order";

const app = express();

app.use(cors());
app.use(express.json());

// Database connection
createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "shop_db",
    entities: [Product, CartItem, Order],
    synchronize: true
}).then(connection => {
    const productRepository = connection.getRepository(Product);
    const cartItemRepository = connection.getRepository(CartItem);
    const orderRepository = connection.getRepository(Order);

    // Product routes
    app.get("/api/products", async (req, res) => {
        try {
            const products = await productRepository.find();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: "Error fetching products" });
        }
    });

    app.get("/api/products/:id", async (req, res) => {
        try {
            const product = await productRepository.findOne(req.params.id);
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: "Error fetching products" });
        }
    });

    app.post("/api/products", async (req, res) => {
        try {
            const product = productRepository.create(req.body);
            await productRepository.save(product);
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ message: "Error creating product" });
        }
    });

    // Cart routes
    // @ts-ignore
    app.post("/api/cart/add", async (req, res) => {
        try {
            const { productId, quantity } = req.body;
            const product = await productRepository.findOne(productId);

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            const cartItem = cartItemRepository.create({
                product,
                quantity
            });

            await cartItemRepository.save(cartItem);

            const cart = await cartItemRepository.find({
                relations: ["product"]
            });

            res.json({ items: cart });
        } catch (error) {
            res.status(400).json({ message: "Error adding to cart" });
        }
    });

    app.get("/api/cart", async (req, res) => {
        try {
            const cart = await cartItemRepository.find({
                relations: ["product"]
            });
            res.json({ items: cart });
        } catch (error) {
            res.status(500).json({ message: "Error fetching cart" });
        }
    });

    // Order routes
    app.post("/api/orders", async (req, res) => {
        try {
            const { customerEmail, items } = req.body;

            const total = items.reduce((sum: number, item: { product: { price: number; }; quantity: number; }) => {
                return sum + (item.product.price * item.quantity);
            }, 0);

            const order = orderRepository.create({
                customerEmail,
                total,
                status: "pending"
            });

            await orderRepository.save(order);

            // Clear cart after order
            await cartItemRepository.clear();

            res.status(201).json(order);
        } catch (error) {
            res.status(400).json({ message: "Error creating order" });
        }
    });

    // @ts-ignore
    app.delete('/api/cart/remove', async (req, res) => {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ error: 'Product ID is required' });
        }

        try {
            const cartItemRepository = getRepository(CartItem);
            const cartItem = await cartItemRepository.findOne({ where: { product: { id: productId } } });

            if (!cartItem) {
                return res.status(404).json({ error: 'Product not found in cart' });
            }

            // Delete the cart item from the database
            await cartItemRepository.remove(cartItem);

            // Return the updated cart (optional: you can fetch the updated cart)
            const updatedCart = await cartItemRepository.find({ relations: ["product"] });
            res.json({ message: 'Item removed from cart', cart: updatedCart });
        } catch (error) {
            console.error('Error removing item from cart:', error);
            res.status(500).json({ error: 'An error occurred while removing the item from the cart' });
        }
    });

    // Start server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(error => console.log("TypeORM connection error: ", error));
