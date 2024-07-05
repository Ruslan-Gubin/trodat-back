"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
const common_1 = require("@nestjs/common");
const NestConfig = require("@nestjs/config");
const config_service_1 = require("./config.service");
const configs_1 = require("./configs");
const app_root_path_1 = require("app-root-path");
const serve_static_1 = require("@nestjs/serve-static");
let ConfigModule = class ConfigModule {
};
ConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            NestConfig.ConfigModule.forRoot(),
            NestConfig.ConfigModule.forRoot({
                envFilePath: ['.env'],
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: `${app_root_path_1.path}/uploads`,
                serveRoot: '/uploads',
            }),
        ],
        providers: [
            NestConfig.ConfigService,
            config_service_1.ConfigService,
            configs_1.AppConfig,
            configs_1.SuperAdminConfig,
            configs_1.MinioConfig,
            configs_1.MongoConfig
        ],
        exports: [
            configs_1.AppConfig,
            configs_1.SuperAdminConfig,
            config_service_1.ConfigService,
            configs_1.MinioConfig,
            configs_1.MongoConfig
        ],
    })
], ConfigModule);
exports.ConfigModule = ConfigModule;
//# sourceMappingURL=config.module.js.map