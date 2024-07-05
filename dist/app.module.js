"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const category_module_1 = require("./modules/category/category.module");
const users_module_1 = require("./modules/users/users.module");
const config_module_1 = require("./modules/config/config.module");
const products_module_1 = require("./modules/products/products.module");
const minio_client_module_1 = require("./modules/minio-client/minio-client.module");
const file_module_1 = require("./modules/file-service/file.module");
const serve_static_1 = require("@nestjs/serve-static");
const axios_1 = require("@nestjs/axios");
const path_1 = require("path");
const mongoose_1 = require("@nestjs/mongoose");
const news_module_1 = require("./modules/news/news.module");
const platform_express_1 = require("@nestjs/platform-express");
const upload_module_1 = require("./modules/upload/upload.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigModule,
            mongoose_1.MongooseModule.forRoot('mongodb+srv://Ruslan:gjcnfk156@cluster0.odh79.mongodb.net/trodat?retryWrites=true&w=majority'),
            category_module_1.CategoryModule,
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            news_module_1.NewsModule,
            minio_client_module_1.MinioClientModule,
            file_module_1.FileModule,
            axios_1.HttpModule,
            upload_module_1.UploadModule,
            platform_express_1.MulterModule.register({ dest: '/uploads' }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '/frontend/build'),
                exclude: ['/api*'],
            }),
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map