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
import { Model } from "mongoose";
import { News } from "./schemas/news.schema";
import { NewsCreateModelDto } from "./dto/create-news.dto";
export declare class NewsService {
    private readonly newsModel;
    private parser;
    constructor(newsModel: Model<News>);
    getAllNews(): Promise<{
        data: (import("mongoose").Document<unknown, {}, News> & News & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        message: any;
        status: string;
    }>;
    getNewsById(id: string): Promise<{
        data: import("mongoose").Document<unknown, {}, News> & News & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: any;
        status: string;
    }>;
    createNews(data: NewsCreateModelDto): Promise<{
        data: import("mongoose").Document<unknown, {}, News> & News & {
            _id: import("mongoose").Types.ObjectId;
        };
        status: string;
        message: any;
    }>;
    updateNews(data: NewsCreateModelDto, id: string): Promise<{
        data: import("mongoose").Document<unknown, {}, News> & News & {
            _id: import("mongoose").Types.ObjectId;
        };
        status: string;
        message: any;
    }>;
    deleteNews(id: string): Promise<{
        data: string;
        message: any;
        status: string;
    }>;
    startIntegration(): Promise<{
        data: string;
    }>;
}
