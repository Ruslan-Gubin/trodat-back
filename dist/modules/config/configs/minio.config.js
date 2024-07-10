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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinioConfig = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../config.service");
let MinioConfig = class MinioConfig {
    constructor(configService) {
        this.endPoint = configService.getString('MINIO_ENDPOINT');
        this.port = configService.getNumber('MINIO_PORT');
        this.accessKey = configService.getString('MINIO_ROOT_USER');
        this.secretKey = configService.getString('MINIO_ROOT_PASSWORD');
        this.bucket = configService.getString('MINIO_BUCKET');
    }
    create() {
        return {
            endPoint: this.endPoint,
            port: this.port,
            accessKey: this.accessKey,
            secretKey: this.secretKey,
            useSSL: false,
        };
    }
    getBucketName() {
        return this.bucket;
    }
    getUrl() {
        return this.endPoint;
    }
};
MinioConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], MinioConfig);
exports.MinioConfig = MinioConfig;
//# sourceMappingURL=minio.config.js.map