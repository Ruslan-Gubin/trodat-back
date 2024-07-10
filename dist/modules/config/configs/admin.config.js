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
exports.SuperAdminConfig = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../config.service");
const enums_1 = require("../../users/enums");
let SuperAdminConfig = class SuperAdminConfig {
    constructor(configService) {
        this.email = configService.getString('SUPER_ADMIN_EMAIL');
        this.password = configService.getString('SUPER_ADMIN_PASS');
        this.role = enums_1.UserRole.SUPERADMIN;
    }
    createAdminOptions() {
        console.log({
            email: this.email,
            password: this.password,
            role: enums_1.UserRole.SUPERADMIN,
        });
        return {
            email: this.email,
            password: this.password,
            role: enums_1.UserRole.SUPERADMIN,
        };
    }
};
SuperAdminConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], SuperAdminConfig);
exports.SuperAdminConfig = SuperAdminConfig;
//# sourceMappingURL=admin.config.js.map