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
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let ConfigService = class ConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    getValue(name) {
        const value = this.configService.get(name);
        if (value === undefined || value.length === 0) {
            throw new common_1.InternalServerErrorException(`${name} parameter does not specified in .env file`);
        }
        return value;
    }
    getString(name) {
        return this.getValue(name);
    }
    getNumber(name) {
        const value = this.getValue(name);
        const number = parseFloat(value);
        if (Number.isNaN(number)) {
            throw new common_1.InternalServerErrorException(`${name} parameter does not specified correct number format`);
        }
        return number;
    }
    getBoolean(name) {
        const value = this.getValue(name);
        const truly = value === 'true';
        if (truly) {
            return truly;
        }
        const falsy = value === 'false';
        if (falsy) {
            return truly;
        }
        throw new common_1.InternalServerErrorException(`${name} parameter does not specified correct boolean format`);
    }
    getDate(name) {
        const value = this.getValue(name);
        const date = new Date(value);
        const isValid = !Number.isNaN(date.getTime());
        if (isValid) {
            throw new common_1.InternalServerErrorException(`${name} parameter does not specified correct ISO date format`);
        }
        return date;
    }
};
ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map