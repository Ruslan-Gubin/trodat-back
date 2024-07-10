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
exports.NewsController = void 0;
const common_1 = require("@nestjs/common");
const news_service_1 = require("./news.service");
const create_news_dto_1 = require("./dto/create-news.dto");
const platform_express_1 = require("@nestjs/platform-express");
const upload_service_1 = require("../upload/upload.service");
const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 5 * 1024 * 1024;
let NewsController = class NewsController {
    constructor(newsService, uploadService) {
        this.newsService = newsService;
        this.uploadService = uploadService;
    }
    async getNews() {
        return await this.newsService.getAllNews();
    }
    async createNews(data, file) {
        const saveFile = (await this.uploadService.saveImage(file));
        return await this.newsService.createNews({ ...data, image: saveFile.imageName });
    }
    async updateNews(data, param, file) {
        const currentNews = await this.newsService.getNewsById(param.id);
        let newsImg = currentNews.data.image;
        if (file) {
            if (currentNews) {
                await this.uploadService.removeImage(currentNews.data.image);
                const saveFile = await this.uploadService.saveImage(file);
                newsImg = saveFile.imageName;
            }
        }
        return await this.newsService.updateNews({ ...data, image: newsImg }, param.id);
    }
    async deleteNews(param) {
        const currentNews = await this.newsService.getNewsById(param.id);
        await this.uploadService.removeImage(currentNews.data.image);
        return await this.newsService.deleteNews(param.id);
    }
    async integration() {
        return await this.newsService.startIntegration();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getNews", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: '.(png|jpeg|jpg|gif|webp)',
    })
        .addMaxSizeValidator({
        maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES,
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_news_dto_1.NewsCreateDto, Object]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "createNews", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: '.(png|jpeg|jpg|gif|webp)',
    })
        .addMaxSizeValidator({
        maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES,
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
        fileIsRequired: false,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_news_dto_1.NewsUpdateDto, Object, Object]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "updateNews", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "deleteNews", null);
__decorate([
    (0, common_1.Get)('integration'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "integration", null);
NewsController = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.Controller)('news'),
    __metadata("design:paramtypes", [news_service_1.NewsService,
        upload_service_1.UploadService])
], NewsController);
exports.NewsController = NewsController;
//# sourceMappingURL=news.controller.js.map