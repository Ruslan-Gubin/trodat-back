"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const news_schema_1 = require("./schemas/news.schema");
const parser_news_1 = require("../../helpers/parser-news");
let NewsService = class NewsService {
    constructor(newsModel) {
        this.newsModel = newsModel;
        this.parser = new parser_news_1.ParserNews();
    }
    async getAllNews() {
        const allNews = (await this.newsModel.find().sort({ date: -1 }));
        return { data: allNews, message: null, status: 'success' };
    }
    async getNewsById(id) {
        const news = await this.newsModel.findById(id);
        return { data: news, message: null, status: 'success' };
    }
    async createNews(data) {
        const news = new this.newsModel({
            type: data.type,
            image: data.image,
            title: data.title,
            fullDescription: data.fullDescription,
            shortDescription: data.shortDescription
        });
        await news.save();
        return { data: news, status: 'success', message: null };
    }
    async updateNews(data, id) {
        const updateNews = await this.newsModel.findByIdAndUpdate(id, {
            type: data.type,
            image: data.image,
            title: data.title,
            fullDescription: data.fullDescription,
            shortDescription: data.shortDescription
        }, { new: true });
        return { data: updateNews, status: 'success', message: null };
    }
    async deleteNews(id) {
        await this.newsModel.deleteOne({ _id: id });
        return { data: id, message: null, status: 'success' };
    }
    async startIntegration() {
        await this.parser.parseNews();
        return { data: 'data.result.goods' };
    }
};
NewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(news_schema_1.News.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NewsService);
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map