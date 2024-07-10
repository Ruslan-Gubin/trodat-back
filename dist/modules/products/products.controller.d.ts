/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { ProductsService } from './products.service';
import { GetProductParamsDto } from './dto/create-parsed-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/product.schema").Product> & import("./schemas/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getProductsFront(param: GetProductParamsDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/product.schema").Product> & import("./schemas/product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        totalCount: number;
        status: string;
    }>;
    getProductsByCategoryId(param: {
        categoryId: string;
    }): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/product.schema").Product> & import("./schemas/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getProductsNotInCategory(param: {
        categoryId: string;
    }): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/product.schema").Product> & import("./schemas/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    changeCategory(body: {
        categoryId: string;
        productId: string;
    }): Promise<Omit<import("mongoose").Document<unknown, {}, import("./schemas/product.schema").Product> & import("./schemas/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    parse(): Promise<void>;
    integration(): Promise<import("../../types/integration.type").SuccessIntegrationAnswer>;
}
