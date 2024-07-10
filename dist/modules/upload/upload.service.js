"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const fs_extra_1 = require("fs-extra");
const app_root_path_1 = require("app-root-path");
const uuid_1 = require("uuid");
const utils_1 = require("../../helpers/utils");
let UploadService = class UploadService {
    async saveImage(image) {
        const folder = `${app_root_path_1.path}/uploads`;
        const imgName = (0, uuid_1.v4)();
        await (0, fs_extra_1.ensureDir)(folder);
        await (0, fs_extra_1.writeFile)(`${folder}/${imgName}${(0, utils_1.getFileExtension)(image.originalname)}`, image.buffer);
        return { imageName: `${imgName}${(0, utils_1.getFileExtension)(image.originalname)}` };
    }
    async removeImage(image) {
        const folder = `${app_root_path_1.path}/uploads/${image}`;
        (0, fs_extra_1.remove)(folder)
            .then(() => 'success')
            .catch(error => error);
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map