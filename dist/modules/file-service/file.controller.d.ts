import { FileService } from './file.service';
export declare class FileController {
    private fileService;
    constructor(fileService: FileService);
    upload(data: any): Promise<import("./schemas/file.schema").File[]>;
    front(): Promise<string>;
}
