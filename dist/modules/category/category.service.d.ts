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
import { IntegrationGroup } from "../../types/integration.type";
import { Model } from "mongoose";
import { Category } from "./schemas/category.schema";
export declare class CategoryService {
    private readonly categoryModel;
    constructor(categoryModel: Model<Category>);
    getAllCategories(): Promise<(import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    createCategory1C(group: IntegrationGroup): Promise<import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    checkIsCategoryCreate(group: IntegrationGroup): Promise<void>;
    integrateCategory1C(groups: IntegrationGroup[]): Promise<void>;
    getCategoryBy1cId(id: string): Promise<import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createCategory(name: string): Promise<import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteCategory(id: string): Promise<{
        id: string;
    }>;
}
