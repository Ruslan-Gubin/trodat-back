/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { MinioClientService } from '../minio-client/minio-client.service';
import { BufferedFile } from '../minio-client/interfaces/file.interface';
import { File } from './schemas/file.schema';
import { Model } from "mongoose";
export declare class FileService {
    private readonly fileModel;
    private minioService;
    constructor(fileModel: Model<File>, minioService: MinioClientService);
    create(file_url: string): Promise<import("mongoose").Document<unknown, {}, File> & File & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    uploadMany(files: BufferedFile[]): Promise<File[]>;
    upload(file: BufferedFile): Promise<import("mongoose").Document<unknown, {}, File> & File & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
