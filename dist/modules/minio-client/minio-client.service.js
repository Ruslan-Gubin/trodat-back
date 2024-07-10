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
exports.MinioClientService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_minio_client_1 = require("nestjs-minio-client");
const minio_config_1 = require("../config/configs/minio.config");
const utils_1 = require("../../helpers/utils");
let MinioClientService = class MinioClientService {
    constructor(minio, fileConfig) {
        this.minio = minio;
        this.fileConfig = fileConfig;
        this.logger = new common_1.Logger('MinioStorageService');
    }
    get client() {
        return this.minio.client;
    }
    async upload(file, baseBucket = this.fileConfig.getBucketName()) {
        try {
            const config = this.fileConfig.create();
            if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
                throw new common_1.HttpException('Error uploading file', common_1.HttpStatus.BAD_REQUEST);
            }
            const temp_filename = Date.now().toString();
            const hashedFileName = (0, utils_1.hashFileName)(temp_filename);
            const ext = (0, utils_1.getFileExtension)(file.originalname);
            const metaData = {
                'Content-Type': file.mimetype,
                'X-Amz-Meta-Testing': '1234',
            };
            const filename = `${hashedFileName}${ext}`;
            await this.client.putObject(baseBucket, filename, file.buffer, metaData);
            return {
                url: `http://${config.endPoint}:${config.port}/${baseBucket}/${filename}`,
            };
        }
        catch (error) {
            this.logger.error(`Error uploading file: ${error.message}`);
            throw new common_1.HttpException('Error uploading file', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async delete(objectName, baseBucket = this.fileConfig.getBucketName()) {
        try {
            await this.client.removeObject(baseBucket, objectName);
        }
        catch (error) {
            this.logger.error(`Error deleting file: ${error.message}`);
            throw new common_1.HttpException('Oops, something went wrong', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createBucket() {
        const bucketName = this.fileConfig.getBucketName();
        const publicPolicy = {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Principal: '*',
                    Action: ['s3:GetObject'],
                    Resource: [`arn:aws:s3:::${bucketName}/*`],
                },
            ],
        };
        this.client.bucketExists(bucketName, (exists) => {
            if (!exists) {
                this.client.makeBucket(bucketName, 'us-east-1', (err) => {
                    if (err) {
                        this.logger.error('Error creating bucket:', err);
                    }
                    else {
                        this.logger.log('Bucket created successfully.');
                        this.client.setBucketPolicy(bucketName, JSON.stringify(publicPolicy), (policyErr) => {
                            if (policyErr) {
                                this.logger.error('Error setting bucket policy:', policyErr);
                            }
                            else {
                                this.logger.log('Bucket policy set to public.');
                            }
                        });
                    }
                });
            }
        });
    }
};
MinioClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_minio_client_1.MinioService,
        minio_config_1.MinioConfig])
], MinioClientService);
exports.MinioClientService = MinioClientService;
//# sourceMappingURL=minio-client.service.js.map