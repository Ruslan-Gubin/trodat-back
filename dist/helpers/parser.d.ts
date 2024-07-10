import { ProductsService } from 'src/modules/products/products.service';
export declare class Parser {
    private browser;
    private productService;
    private logger;
    constructor(productService: ProductsService);
    init(): Promise<void>;
    parseTrodat2(article: string): Promise<{
        description: string;
        size: string;
        imagePatch: string;
    }>;
    parseTrodat(): Promise<void>;
    private categoryParse;
    private parseCategoryLinks;
    private parseProducts;
}
