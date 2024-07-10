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
