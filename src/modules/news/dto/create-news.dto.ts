export class NewsCreateDto {
  title: string;
  type: 'news' | 'promotion';
  shortDescription: string;
  fullDescription: string;
  image: Express.Multer.File;
}

export class NewsUpdateDto {
  title: string;
  type: 'news' | 'promotion';
  shortDescription: string;
  fullDescription: string;
  image: Express.Multer.File | undefined;
}

export class NewsCreateModelDto {
  title: string;
  type: 'news' | 'promotion';
  shortDescription: string;
  fullDescription: string;
  image: string;
}
