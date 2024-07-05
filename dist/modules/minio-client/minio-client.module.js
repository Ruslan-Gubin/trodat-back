"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinioClientModule = void 0;
const common_1 = require("@nestjs/common");
const minio_client_service_1 = require("./minio-client.service");
const minio_client_controller_1 = require("./minio-client.controller");
const nestjs_minio_client_1 = require("nestjs-minio-client");
const configs_1 = require("../config/configs");
const config_module_1 = require("../config/config.module");
const config_service_1 = require("../config/config.service");
let MinioClientModule = class MinioClientModule {
};
MinioClientModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_minio_client_1.MinioModule.registerAsync({
                imports: [config_module_1.ConfigModule],
                inject: [config_service_1.ConfigService],
                useClass: configs_1.MinioConfig,
            }),
            config_module_1.ConfigModule,
        ],
        controllers: [minio_client_controller_1.MinioClientController],
        providers: [minio_client_service_1.MinioClientService],
        exports: [minio_client_service_1.MinioClientService],
    })
], MinioClientModule);
exports.MinioClientModule = MinioClientModule;
//# sourceMappingURL=minio-client.module.js.map