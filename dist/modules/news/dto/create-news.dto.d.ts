/// <reference types="multer" />
export declare class NewsCreateDto {
    title: string;
    type: 'news' | 'promotion';
    shortDescription: string;
    fullDescription: string;
    image: Express.Multer.File;
}
export declare class NewsUpdateDto {
    title: string;
    type: 'news' | 'promotion';
    shortDescription: string;
    fullDescription: string;
    image: Express.Multer.File | undefined;
}
export declare class NewsCreateModelDto {
    title: string;
    type: 'news' | 'promotion';
    shortDescription: string;
    fullDescription: string;
    image: string;
}
