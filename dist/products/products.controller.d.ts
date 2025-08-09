import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<import("../entity/Product").Product[]>;
    findOne(id: string): Promise<import("../entity/Product").Product>;
    create(createProductDto: CreateProductDto): Promise<import("../entity/Product").Product>;
}
