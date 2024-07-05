import {
  Body,
  Controller,
  Delete,
  Get, HttpStatus,
  Injectable,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { NewsService } from './news.service';
import {NewsCreateDto, NewsUpdateDto} from "./dto/create-news.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import { UploadService } from '../upload/upload.service';

const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 5 * 1024 * 1024;

@Injectable()
@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly uploadService: UploadService
  ) {}

  @Get()
  async getNews() {
    return await this.newsService.getAllNews();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createNews(
    @Body() data: NewsCreateDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: '.(png|jpeg|jpg|gif|webp)',
        })
        .addMaxSizeValidator({
          maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        }),
    )
    file: Express.Multer.File,
  ) {
    const saveFile = (await this.uploadService.saveImage(file));

    return await this.newsService.createNews({...data, image: saveFile.imageName });
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateNews(
    @Body() data: NewsUpdateDto,
    @Param() param: {id: string},
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: '.(png|jpeg|jpg|gif|webp)',
        })
        .addMaxSizeValidator({
          maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        }),
    )
    file: Express.Multer.File | undefined,
  ) {
    const currentNews = await this.newsService.getNewsById(param.id);
    let newsImg = currentNews.data.image;

    if (file) {
      if (currentNews) {
        await this.uploadService.removeImage(currentNews.data.image);
        const saveFile = await this.uploadService.saveImage(file);
        newsImg = saveFile.imageName;
      }
    }

    return await this.newsService.updateNews({...data, image: newsImg }, param.id);
  }

  @Delete(':id')
  async deleteNews(@Param() param: {id: string}) {
    const currentNews = await this.newsService.getNewsById(param.id);

    await this.uploadService.removeImage(currentNews.data.image);

    return await this.newsService.deleteNews(param.id);
  }
  
  @Get('integration')
  async integration() {
    return await this.newsService.startIntegration();
  }
}