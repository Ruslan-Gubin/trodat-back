import { MinioClientService } from './minio-client.service';
import { BufferedFile } from './interfaces/file.interface';
export declare class MinioClientController {
    private readonly minioClientService;
    constructor(minioClientService: MinioClientService);
    uploadSingle(image: BufferedFile): Promise<{
        url: string;
    }>;
}
