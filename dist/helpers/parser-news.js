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
exports.ParserNews = void 0;
const common_1 = require("@nestjs/common");
const playwright_1 = require("playwright");
let ParserNews = class ParserNews {
    constructor() {
        this.logger = new common_1.Logger('ParserNews');
        this.init();
    }
    async init() {
        try {
            this.browser = await playwright_1.chromium.launch({
                headless: false,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                ],
            });
        }
        catch (error) {
            throw error;
        }
    }
    async parseNews() {
        const page = await this.browser.newPage();
        await page.goto('https://trodat-russia.ru/news/');
        const pageALinkMaxPageCount = await page.$('.page-link > span');
        const newsCountPagination = await pageALinkMaxPageCount.textContent();
        console.log(newsCountPagination);
        const nextPagePagination = await page.$('.next-page');
    }
};
ParserNews = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ParserNews);
exports.ParserNews = ParserNews;
//# sourceMappingURL=parser-news.js.map