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
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Product } from './schemas/product.schema';
import { CreateParsedProductDto } from './dto/create-parsed-product.dto';
import { Model } from "mongoose";
import { IntegrationProduct, SuccessIntegrationAnswer } from "../../types/integration.type";
import { CategoryService } from "../category/category.service";
import { ParsedOptionsType } from "./helper";
export declare class ProductsService {
    private readonly productModel;
    private categoryService;
    private parser;
    constructor(productModel: Model<Product>, categoryService: CategoryService);
    parse(): Promise<void>;
    changeCategory(productId: string, categoryId: string): Promise<Omit<import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findByProductId(id: string): Promise<Product | null>;
    create(data: any): Promise<Product>;
    createParsedProduct(data: CreateParsedProductDto): Promise<void>;
    getProducts(): Promise<(import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getParseOptions(description: string): ParsedOptionsType;
    createProduct1C(good: IntegrationProduct, description?: string, size?: string): Promise<import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findProductGoodId(goodID: string): Promise<import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getProductsByCategoryId(categoryId: string): Promise<(import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getProductsNotInCategory(categoryId: string): Promise<(import("mongoose").Document<unknown, {}, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    startIntegration(): Promise<SuccessIntegrationAnswer>;
}
