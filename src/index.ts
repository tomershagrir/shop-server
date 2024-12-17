// src/app.ts
import "reflect-metadata";
import express from "express";
import {createConnection, getRepository} from "typeorm";
import cors from "cors";
import { Product } from "./entity/Product";
import { CartItem } from "./entity/Cart";
import { Order } from "./entity/Order";
import {buildSchema} from "type-graphql";
import {graphqlHTTP} from "express-graphql";
import {ProductResolver} from "./resolvers/ProductResolver";
import {CartResolver} from "./resolvers/CartResolver";
import {OrderResolver} from "./resolvers/OrderResolver";

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
}).then(async connection => {
    const schema = await buildSchema({
        resolvers: [ProductResolver, CartResolver, OrderResolver],
        validate: false,
    });

    app.use(
        "/graphql",
        graphqlHTTP({
            schema,
            graphiql: true,
        })
    );

    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}/graphql`);
    });
}).catch(error => console.log("TypeORM connection error: ", error));
