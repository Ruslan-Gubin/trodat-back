/// <reference types="multer" />
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
import { NewsService } from './news.service';
import { NewsCreateDto, NewsUpdateDto } from "./dto/create-news.dto";
import { UploadService } from '../upload/upload.service';
export declare class NewsController {
    private readonly newsService;
    private readonly uploadService;
    constructor(newsService: NewsService, uploadService: UploadService);
    getNews(): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/news.schema").News> & import("./schemas/news.schema").News & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        message: any;
        status: string;
    }>;
    createNews(data: NewsCreateDto, file: Express.Multer.File): Promise<{
        data: import("mongoose").Document<unknown, {}, import("./schemas/news.schema").News> & import("./schemas/news.schema").News & {
            _id: import("mongoose").Types.ObjectId;
        };
        status: string;
        message: any;
    }>;
    updateNews(data: NewsUpdateDto, param: {
        id: string;
    }, file: Express.Multer.File | undefined): Promise<{
        data: import("mongoose").Document<unknown, {}, import("./schemas/news.schema").News> & import("./schemas/news.schema").News & {
            _id: import("mongoose").Types.ObjectId;
        };
        status: string;
        message: any;
    }>;
    deleteNews(param: {
        id: string;
    }): Promise<{
        data: string;
        message: any;
        status: string;
    }>;
    integration(): Promise<{
        data: string;
    }>;
}
