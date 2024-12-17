import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { CartItem } from "../entity/Cart";
import { Product } from "../entity/Product";
import {getRepository, Repository} from "typeorm";

@Resolver(() => CartItem)
export class CartResolver {
    private readonly cartRepository: Repository<CartItem>;
    private readonly productRepository: Repository<Product>;

    constructor(cartRepository: Repository<CartItem>, productRepository: Repository<Product>) {
        this.cartRepository = getRepository(CartItem);
        this.productRepository = getRepository(Product);
    }

    @Query(() => [CartItem])
    async cart(): Promise<CartItem[]> {
        return this.cartRepository.find({ relations: ["product"] });
    }

    @Mutation(() => [CartItem])
    async addToCart(@Arg("productId") productId: number, @Arg("quantity") quantity: number): Promise<CartItem[]> {
        const product = await this.productRepository.findOne(productId);
        if (!product) throw new Error("Product not found");

        const cartItem = this.cartRepository.create({ product, quantity });
        await this.cartRepository.save(cartItem);

        return this.cartRepository.find({ relations: ["product"] });
    }

    @Mutation(() => [CartItem])
    async removeFromCart(@Arg("productId") productId: number): Promise<CartItem[]> {
        const cartItem = await this.cartRepository.findOne({ where: { product: { id: productId } } });
        if (!cartItem) throw new Error("Product not in cart");

        await this.cartRepository.remove(cartItem);

        return this.cartRepository.find({ relations: ["product"] });
    }
}
