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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_schema_1 = require("./schemas/user.schema");
const enums_1 = require("./enums");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(data) {
        const user = new this.userModel(data);
        return await user.save();
    }
    async findByEmail(email) {
        const user = this.userModel.findOne({
            where: {
                email: email,
            },
        });
        return user;
    }
    async createAdmin(data) {
        const user = this.findByEmail(data.email);
        if (user) {
            throw new common_1.BadRequestException('User with this email already exist');
        }
        data.role = enums_1.UserRole.ADMIN;
        return await this.create(data);
    }
    async loginAdmin(data) {
        if (data.username !== 'admin') {
            throw new common_1.BadRequestException('Username or password wrong');
        }
        if (data.password !== '8R22y87R') {
            throw new common_1.BadRequestException('Username or password wrong');
        }
        return {
            isLogin: true
        };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map