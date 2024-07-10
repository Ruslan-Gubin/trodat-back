/// <reference types="multer" />
export declare class UploadService {
    saveImage(image: Express.Multer.File): Promise<{
        imageName: string;
    }>;
    removeImage(image: string): Promise<void>;
}
