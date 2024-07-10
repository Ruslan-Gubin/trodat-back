/// <reference types="multer" />
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
