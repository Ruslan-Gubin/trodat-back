import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {News} from "./schemas/news.schema";
import { NewsCreateModelDto} from "./dto/create-news.dto";
import { ErrorIntegrationAnswer, SuccessIntegrationAnswer } from 'src/types/integration.type';
import axios from 'axios';
import { integrationAuthConfig, integrationBody } from '../config/configs/integration';
import { ParserNews } from 'src/helpers/parser-news';



@Injectable()
export class NewsService {
  private parser: ParserNews;
  constructor(
    @InjectModel(News.name) private readonly newsModel: Model<News>,
  ) {
    this.parser = new ParserNews();
  }

  async getAllNews() {
    const allNews = (await this.newsModel.find().sort({ date: -1 }));
    return { data: allNews, message: null, status: 'success' };
  }

  async getNewsById(id: string) {
    const news = await this.newsModel.findById(id);
    return { data: news, message: null, status: 'success' };
  }

  async createNews(data: NewsCreateModelDto) {
    const news = new this.newsModel({
      type: data.type,
      image: data.image,
      title: data.title,
      fullDescription: data.fullDescription,
      shortDescription: data.shortDescription
    });
    await news.save();
    return { data: news, status: 'success', message: null };
  }

  async updateNews(data: NewsCreateModelDto, id: string) {
   const updateNews =  await this.newsModel.findByIdAndUpdate(
       id, 
      {
        type: data.type,
        image: data.image,
        title: data.title,
        fullDescription: data.fullDescription,
        shortDescription: data.shortDescription
    },
    { new: true }
    )
    
    return { data: updateNews, status: 'success', message: null };
  }

  async deleteNews(id: string) {
    await this.newsModel.deleteOne({_id: id});
    return { data: id, message: null, status: 'success' };
  }

 
 async startIntegration() {
  // const url = 'http://95.215.244.110/edo/hs/ext_api/execute';
  
  // const res = await axios.post<SuccessIntegrationAnswer | ErrorIntegrationAnswer>(
  //   url,
  //   integrationBody.goodsGet,
  //   integrationAuthConfig,
  // );

  // if (res.data.general.error) {
  //   throw new InternalServerErrorException('1c request is error');
  // }

  // const data = res.data as SuccessIntegrationAnswer;
  await this.parser.parseNews();


  return {data: 'data.result.goods'}
}

}
