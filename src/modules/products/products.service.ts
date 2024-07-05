import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {Product} from './schemas/product.schema';
import {CreateParsedProductDto} from './dto/create-parsed-product.dto';
import {Parser} from 'src/helpers/parser';
import {downloadImagesByUrl} from 'src/helpers/utils';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import axios from "axios";
import {
  ErrorIntegrationAnswer,
  IntegrationProduct,
  SuccessIntegrationAnswer
} from "../../types/integration.type";
import {CategoryService} from "../category/category.service";
import {ParsedOptionsType, productRusFieldToEng} from "./helper";
import { integrationAuthConfig, integrationBody } from '../config/configs/integration';

@Injectable()
export class ProductsService {
  private parser: Parser;
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private categoryService: CategoryService,
  ) {
    this.parser = new Parser(this);
    this.parser.init();
  }

  async parse() {
    this.parser.parseTrodat2('46042');
    // const img = await downloadImagesByUrl(['https://paperandinkprinting.com/wp-content/uploads/2019/08/canstockphoto22402523-arcos-creator.com_-1024x1024.jpg']);
    // console.log('img', img);
  }

  async changeCategory(productId: string, categoryId: string) {
    console.log('productId', productId);
    console.log('categoryId', categoryId);
    const product = await this.productModel.findOne({_id: productId});
    if (!product) throw new BadRequestException('Product not found');
    console.log('product', product);
    product.category = categoryId;
    await product.save();
    return product.populate('category');
  }

  async findByProductId(id: string): Promise<Product | null> {
    try {
      return await this.productModel.findOne({
        where: {
          product_id: id,
        },
      });
    } catch (e) {
      throw new BadRequestException('Given id invalid');
    }
  }

  async create(data): Promise<Product> {
    const product = new this.productModel(data);
    return await product.save();
  }

  async createParsedProduct(data: CreateParsedProductDto) {
    const product = await this.findByProductId(data.product_id);

    if (product) {
      return;
    }

    const downloaded_images = await downloadImagesByUrl(data.images);
    // const images = await this.fileService.uploadMany(downloaded_images);

    data.is_active = false;
    // data.images = images;

    await this.create(data);
  }

  async getProducts() {
    return this.productModel
      .find()
      .populate('category');
  }

  getParseOptions(description: string): ParsedOptionsType {
    const parsedOptions: ParsedOptionsType = {};
    const strArr = description
      .replaceAll('/t', '')
      .replaceAll('\t', '')
      .replaceAll('', '')
      .split(',');
    console.log('strArr', strArr);

    strArr.forEach(str => {
      const splitedParams = str.split('-');
      const param = productRusFieldToEng[splitedParams[0].trim()];
      if (param) parsedOptions[param] = splitedParams[1].trim();
    });
    console.log('parsedOptions', parsedOptions);
    return parsedOptions;
  }

  async createProduct1C(good: IntegrationProduct, description = '', size = '') {
    const options = this.getParseOptions(good.description);
    const category = await this.categoryService.getCategoryBy1cId(good.ownerID);
    if (!category) console.error(`no category for product ${good.article}`);

    const product = new this.productModel({
      product1cId: good.goodID,
      name: good.name,
      article: good.article,
      description1c: good.description,
      description,
      size,
      is_active: true,
      color: options.color ? [options.color] : [],
      equipment: options.equipment ? [options.equipment] : [],
      frame: options.frame,
      geometry: options.geometry,
      category: category?._id || null
    });
    return product.save();
  }

  async findProductGoodId(goodID: string) {
    return  await this.productModel.findOne({ product1cId: goodID });
  }

  async getProductsByCategoryId(categoryId: string) {
    return this.productModel.find({
      category: categoryId
    });
  }

  async getProductsNotInCategory(categoryId: string) {
    return this.productModel.find().where('category').ne(categoryId);
  }


  async startIntegration() {
    const url = 'http://95.215.244.110/edo/hs/ext_api/execute';

    const res = await axios.post<SuccessIntegrationAnswer | ErrorIntegrationAnswer>(
      url,
      integrationBody.goodsGet,
      integrationAuthConfig
    );

    if (res.data.general.error) {
      throw new InternalServerErrorException('1c request is error');
    }
    
    const data = res.data as SuccessIntegrationAnswer;
    const goodGroups1CList = data.result.goodsGroups;
    const goods1CList = data.result.goods;
    await this.categoryService.integrateCategory1C(goodGroups1CList);

    for (const good of goods1CList) {
      const goodInBD = await this.findProductGoodId(good.goodID);

      if (goodInBD) {
        const options = this.getParseOptions(good.description);
        const keys = Object.keys(options);

        keys.forEach(key => {
          console.log('product[key]', goodInBD[key]);
          console.log('options[k', options[key]);
          if (Array.isArray(goodInBD[key])) {
            const index = goodInBD[key].findIndex(el => el === options[key]);
            if (index === -1) goodInBD.color.push(options[key]);
          } else if (!goodInBD[key]) {
            goodInBD[key] = options[key];
          }
        });

        await goodInBD.save();
      } else {
        const parseData = await this.parser.parseTrodat2(good.article);
        await this.createProduct1C(good, parseData.description, parseData.size);
      }

    }

    return data;
  }


}
