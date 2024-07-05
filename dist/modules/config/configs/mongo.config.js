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
exports.MongoConfig = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../config.service");
let MongoConfig = class MongoConfig {
    constructor(configService) {
        this.host = configService.getString('MYSQL_HOST');
        this.port = configService.getNumber('MYSQL_PORT');
        this.username = configService.getString('MYSQL_USER');
        this.password = configService.getString('MYSQL_PASSWORD');
        this.database = configService.getString('MYSQL_NAME');
    }
    createMongooseOptions() {
        return {
            uri: 'mongodb://localhost/trodat',
            dbName: this.database
        };
    }
};
MongoConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], MongoConfig);
exports.MongoConfig = MongoConfig;
//# sourceMappingURL=mongo.config.js.map