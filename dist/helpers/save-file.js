"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.download_image = void 0;
const fs_extra_1 = require("fs-extra");
const app_root_path_1 = require("app-root-path");
const uuid_1 = require("uuid");
const download_image = async (url) => {
    const folder = `${app_root_path_1.path}`;
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const imagePatch = `/uploads/${(0, uuid_1.v4)()}.jpg`;
    const imgName = `${folder}${imagePatch}`;
    await (0, fs_extra_1.writeFile)(imgName, buffer);
    return imagePatch;
};
exports.download_image = download_image;
//# sourceMappingURL=save-file.js.map