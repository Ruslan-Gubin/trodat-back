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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_schema_1 = require("./schemas/category.schema");
let CategoryService = class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async getAllCategories() {
        return this.categoryModel.find();
    }
    async createCategory1C(group) {
        const category = new this.categoryModel({
            category1cId: group.ID,
            name: group.name,
            isPublic: true
        });
        return category.save();
    }
    async checkIsCategoryCreate(group) {
        const category = await this.categoryModel.findOne({ category1cId: group.ID });
        if (!category) {
            await this.createCategory1C(group);
        }
    }
    async integrateCategory1C(groups) {
        for (const group of groups) {
            await this.checkIsCategoryCreate(group);
        }
    }
    async getCategoryBy1cId(id) {
        return this.categoryModel.findOne({ category1cId: id });
    }
    async createCategory(name) {
        const category = new this.categoryModel({
            category1cId: null,
            isPublic: false,
            name
        });
        await category.save();
        return category;
    }
    async deleteCategory(id) {
        const category = await this.categoryModel.deleteOne({ _id: id });
        console.log('category', category);
        return { id };
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map