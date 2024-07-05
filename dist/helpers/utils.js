"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadImagesByUrl = exports.getFileExtension = exports.hashFileName = void 0;
const crypto = require("crypto");
const https = require("https");
const axios_1 = require("axios");
const hashFileName = (temp_filename) => {
    return crypto.createHash('md5').update(temp_filename).digest('hex');
};
exports.hashFileName = hashFileName;
const getFileExtension = (original_name) => {
    return original_name.substring(original_name.lastIndexOf('.'), original_name.length);
};
exports.getFileExtension = getFileExtension;
const downloadImagesByUrl = async (urls) => {
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    const images_meta = [];
    for (const url of urls) {
        await axios_1.default
            .get(url, { httpsAgent, responseType: 'arraybuffer' })
            .then((response) => {
            images_meta.push({
                fieldname: 'image',
                originalname: `downloaded-${Date.now()}.jpg`,
                encoding: 'base64',
                mimetype: response.headers['content-type'],
                size: response.data.length,
                buffer: response.data,
            });
        })
            .catch((error) => {
            console.error(error);
        });
    }
    return images_meta;
};
exports.downloadImagesByUrl = downloadImagesByUrl;
//# sourceMappingURL=utils.js.map