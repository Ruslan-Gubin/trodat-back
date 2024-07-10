"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const product_schema_1 = require("./schemas/product.schema");
const parser_1 = require("../../helpers/parser");
const utils_1 = require("../../helpers/utils");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const axios_1 = require("axios");
const category_service_1 = require("../category/category.service");
const helper_1 = require("./helper");
const integration_1 = require("../config/configs/integration");
let ProductsService = class ProductsService {
    constructor(productModel, categoryService) {
        this.productModel = productModel;
        this.categoryService = categoryService;
        this.parser = new parser_1.Parser(this);
        this.parser.init();
    }
    async parse() {
        this.parser.parseTrodat2('4910');
    }
    async changeCategory(productId, categoryId) {
        console.log('productId', productId);
        console.log('categoryId', categoryId);
        const product = await this.productModel.findOne({ _id: productId });
        if (!product)
            throw new common_1.BadRequestException('Product not found');
        console.log('product', product);
        product.category = categoryId;
        await product.save();
        return product.populate('category');
    }
    async findByProductId(id) {
        try {
            return await this.productModel.findOne({
                where: {
                    product_id: id,
                },
            });
        }
        catch (e) {
            throw new common_1.BadRequestException('Given id invalid');
        }
    }
    async create(data) {
        const product = new this.productModel(data);
        return await product.save();
    }
    async createParsedProduct(data) {
        const product = await this.findByProductId(data.product_id);
        if (product) {
            return;
        }
        const downloaded_images = await (0, utils_1.downloadImagesByUrl)(data.images);
        data.is_active = false;
        await this.create(data);
    }
    async getProducts() {
        return this.productModel
            .find()
            .populate('category');
    }
    async getProductsFront(param) {
        const filterParams = {
            $and: []
        };
        if (param.searchTitle) {
            filterParams.$and.push({ name: { $regex: param.searchTitle, $options: 'i' } });
        }
        if (param.categoryes) {
            filterParams.$and.push({ category: { $in: param.categoryes.split(',') } });
        }
        try {
            const totalCount = await this.productModel.countDocuments();
            const skip = (Number(param.currentPage) - 1) * Number(param.perPage);
            const products = await this.productModel
                .find(filterParams.$and.length > 0 ? filterParams : null)
                .skip(skip)
                .limit(Number(param.perPage))
                .populate('category');
            const filterProducts = products.filter(item => {
                const currentDiameter = (0, helper_1.extractSizeValue)(item.size);
                const isDiapazon = currentDiameter < Number(param.maxDiameter) && currentDiameter > Number(param.minDiameter);
                if (isDiapazon) {
                    return item;
                }
            });
            return { data: filterProducts, totalCount, status: 'success' };
        }
        catch (error) {
            console.error(error);
            throw (error);
        }
    }
    getParseOptions(description) {
        const parsedOptions = {};
        const strArr = description
            .replaceAll('/t', '')
            .replaceAll('\t', '')
            .replaceAll('', '')
            .split(',');
        console.log('strArr', strArr);
        strArr.forEach(str => {
            const splitedParams = str.split('-');
            const param = helper_1.productRusFieldToEng[splitedParams[0].trim()];
            if (param)
                parsedOptions[param] = splitedParams[1].trim();
        });
        console.log('parsedOptions', parsedOptions);
        return parsedOptions;
    }
    async createProduct1C(good, description = '', size = '', imagePatch = '') {
        const options = this.getParseOptions(good.description);
        const category = await this.categoryService.getCategoryBy1cId(good.ownerID);
        if (!category)
            console.error(`no category for product ${good.article}`);
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
            category: category?._id || null,
            imagePatch,
        });
        return product.save();
    }
    async findProductGoodId(goodID) {
        return await this.productModel.findOne({ product1cId: goodID });
    }
    async getProductsByCategoryId(categoryId) {
        return this.productModel.find({
            category: categoryId
        });
    }
    async getProductsNotInCategory(categoryId) {
        return this.productModel.find().where('category').ne(categoryId);
    }
    async startIntegration() {
        const url = 'http://95.215.244.110/edo/hs/ext_api/execute';
        const res = await axios_1.default.post(url, integration_1.integrationBody.goodsGet, integration_1.integrationAuthConfig);
        if (res.data.general.error) {
            throw new common_1.InternalServerErrorException('1c request is error');
        }
        const data = res.data;
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
                        if (index === -1)
                            goodInBD.color.push(options[key]);
                    }
                    else if (!goodInBD[key]) {
                        goodInBD[key] = options[key];
                    }
                });
                await goodInBD.save();
            }
            else {
                const parseData = await this.parser.parseTrodat2(good.article);
                await this.createProduct1C(good, parseData.description, parseData.size, parseData.imagePatch);
            }
        }
        return data;
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        category_service_1.CategoryService])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map