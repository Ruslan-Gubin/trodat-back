import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './interfaces/file.interface';
import { MinioConfig } from '../config/configs/minio.config';
export declare class MinioClientService {
    private readonly minio;
    private readonly fileConfig;
    private readonly logger;
    constructor(minio: MinioService, fileConfig: MinioConfig);
    get client(): import("minio").Client;
    upload(file: BufferedFile, baseBucket?: string): Promise<{
        url: string;
    }>;
    delete(objectName: string, baseBucket?: string): Promise<void>;
    createBucket(): Promise<void>;
}
