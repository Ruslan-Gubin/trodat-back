import { ConfigService } from '../config.service';
export declare class MinioConfig {
    private readonly endPoint;
    private readonly port;
    private readonly accessKey;
    private readonly secretKey;
    private readonly bucket;
    constructor(configService: ConfigService);
    create(): {
        endPoint: string;
        port: number;
        accessKey: string;
        secretKey: string;
        useSSL: boolean;
    };
    getBucketName(): string;
    getUrl(): string;
}
