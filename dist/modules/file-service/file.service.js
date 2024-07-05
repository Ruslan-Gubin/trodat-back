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
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const minio_client_service_1 = require("../minio-client/minio-client.service");
const file_schema_1 = require("./schemas/file.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let FileService = class FileService {
    constructor(fileModel, minioService) {
        this.fileModel = fileModel;
        this.minioService = minioService;
    }
    async create(file_url) {
        const file = new this.fileModel({
            url: file_url,
        });
        return await file.save();
    }
    async uploadMany(files) {
        const file_entities = [];
        for (const file of files) {
            const entity = await this.upload(file);
            file_entities.push(entity);
        }
        return file_entities;
    }
    async upload(file) {
        const { url } = await this.minioService.upload(file);
        return await this.create(url);
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(file_schema_1.File.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        minio_client_service_1.MinioClientService])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map