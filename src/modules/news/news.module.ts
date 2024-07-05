import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {News, NewsSchema} from "./schemas/news.schema";
import { UploadModule } from '../upload/upload.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: News.name, schema: NewsSchema}
    ]),
    UploadModule,
  ],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService]
})
export class NewsModule {}
