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
exports.AppConfig = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../config.service");
let AppConfig = class AppConfig {
    constructor(configService) {
        this.name = configService.getString('APP_NAME');
        this.port = configService.getNumber('APP_PORT');
        this.isProduction = configService.getBoolean('APP_PRODUCTION');
        this.parse_url = configService.getString('APP_PARSE_URL');
    }
    get now() {
        return new Date();
    }
};
AppConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], AppConfig);
exports.AppConfig = AppConfig;
//# sourceMappingURL=app.config.js.map