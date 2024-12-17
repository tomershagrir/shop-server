import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Product } from "../entity/Product";
import {getRepository, Repository} from "typeorm";

@Resolver(() => Product)
export class ProductResolver {
    private readonly productRepository: Repository<Product>;

    constructor(productRepository: Repository<Product>) {
        this.productRepository =  getRepository(Product);
    }

    @Query(() => [Product])
    async products(): Promise<Product[]> {
        return this.productRepository.find();
    }

    @Query(() => Product, { nullable: true })
    async product(@Arg("id") id: number): Promise<Product | undefined> {
        return this.productRepository.findOne(id);
    }

    @Mutation(() => Product)
    async createProduct(
        @Arg("name") name: string,
        @Arg("description") description: string,
        @Arg("price") price: number,
        @Arg("imageUrl") imageUrl: string
    ): Promise<Product> {
        const product = this.productRepository.create({ name, description, price, imageUrl });
        return this.productRepository.save(product);
    }
}
