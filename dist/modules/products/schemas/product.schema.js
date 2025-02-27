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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = exports.Product = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let Product = class Product {
};
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "product1cId", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "article", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "description1c", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true, default: [], type: [String] }),
    __metadata("design:type", Array)
], Product.prototype, "color", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true, default: [], type: [String] }),
    __metadata("design:type", Array)
], Product.prototype, "equipment", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Category', default: null }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "size", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "frame", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "imagePatch", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "geometry", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", Boolean)
], Product.prototype, "is_active", void 0);
Product = __decorate([
    (0, mongoose_2.Schema)()
], Product);
exports.Product = Product;
exports.ProductSchema = mongoose_2.SchemaFactory.createForClass(Product);
//# sourceMappingURL=product.schema.js.map