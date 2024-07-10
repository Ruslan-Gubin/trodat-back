import {Body, Controller, Get, Param, Put, Query} from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetProductParamsDto } from './dto/create-parsed-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts() {
    return await this.productsService.getProducts();
  }

  @Get('frontend')
  async getProductsFront(@Query() param: GetProductParamsDto) {
    return await this.productsService.getProductsFront(param);
  }


  @Get('byCategory/:categoryId')
  async getProductsByCategoryId(@Param() param: {categoryId: string}) {
    return await this.productsService.getProductsByCategoryId(param.categoryId);
  }

  @Get('notInCategory/:categoryId')
  async getProductsNotInCategory(@Param() param: {categoryId: string}) {
    return await this.productsService.getProductsNotInCategory(param.categoryId);
  }

  @Put('changeCategory')
  async changeCategory(@Body() body: {categoryId: string, productId: string}) {
    console.log('body', body);
    return this.productsService.changeCategory(body.productId, body.categoryId);
  }

  @Get('parse')
  async parse() {
    return await this.productsService.parse();
  }

  @Get('integration')
  async integration() {
    return await this.productsService.startIntegration();
  }
}
