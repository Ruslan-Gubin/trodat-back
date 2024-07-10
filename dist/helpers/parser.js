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
exports.Parser = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const playwright_1 = require("playwright");
const app_module_1 = require("../app.module");
const configs_1 = require("../modules/config/configs");
const products_service_1 = require("../modules/products/products.service");
const save_file_1 = require("./save-file");
let Parser = class Parser {
    constructor(productService) {
        this.logger = new common_1.Logger('Parser');
        this.productService = productService;
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
    async parseTrodat2(article) {
        const page = await this.browser.newPage();
        await page.goto('https://trodat-russia.ru/search/');
        const filterCatalog = await page.$('#filter_3');
        await filterCatalog.click();
        const searchInput = await page.$('body > main > div > div > form > input');
        await searchInput.fill(article);
        const searchButton = await page.$('body > main > div > div > form > button');
        await searchButton.click();
        await page.waitForLoadState("networkidle");
        const answerArr = await page.$$('body > main > div > div > ul > li > h3 > a');
        if (!answerArr.length) {
            this.logger.warn('No element was found');
            await this.browser.close();
            return;
        }
        let usingIndex = 0;
        for (const answer of answerArr) {
            let i = 1;
            const productTitle = await answer.textContent();
            if (productTitle === article)
                usingIndex = i;
            i++;
        }
        const firstEl = answerArr[usingIndex];
        const a = await firstEl.textContent();
        await firstEl.click();
        await page.waitForLoadState('domcontentloaded');
        await page.evaluate(() => {
            const aboutTitle = document.querySelector('body > main > div > div > div.product > div.product-description > div.product-text > h4');
            aboutTitle.remove();
        });
        const productDescriptionElement = await page.$('body > main > div > div > div.product > div.product-description > div.product-text');
        const productDescription = await productDescriptionElement.innerText();
        const normalizeDescription = productDescription.replaceAll('\n', ' ');
        const sizeEl = await page.$('body > main > div > div > div.product > div.product-description > div.features > div > div:nth-child(1) > div:nth-child(3) > span');
        const size = await sizeEl.textContent();
        const patchImage = 'body > main > div > div > div.product > div.product-slider__wrap > div > div > div.slick-list > div > div > div > div > img';
        const img = await page.$(patchImage);
        const imgSrcUrl = await img.getAttribute('src');
        const finalImgUrl = `https://trodat-russia.ru/${imgSrcUrl}`;
        const imagePatch = await (0, save_file_1.download_image)(finalImgUrl);
        this.logger.log('Parser successfully end');
        await page.close();
        return {
            description: normalizeDescription,
            size,
            imagePatch,
        };
    }
    async parseTrodat() {
        this.logger = new common_1.Logger('Parser');
        const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
        const appConfig = app.get(configs_1.AppConfig);
        this.productService = app.get(products_service_1.ProductsService);
        this.browser = await playwright_1.chromium.launch({
            headless: false,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
            ],
        });
        const page = await this.browser.newPage();
        await page.goto(appConfig.parse_url);
        const orderManagerContent = await page.$('.div-footer-right .footer-block-content');
        const links = await orderManagerContent.$$eval('.footer-link', (links) => {
            return links.map((link) => {
                const anchorLink = link;
                return {
                    url: anchorLink.href,
                    category: anchorLink.textContent.trim(),
                };
            });
        });
        await this.categoryParse(links);
        await this.browser.close();
        this.logger.log('Parser successfully end');
    }
    async categoryParse(links) {
        const products = [];
        for (const link of links) {
            const productPage = await this.browser.newPage();
            try {
                await productPage.goto(link.url);
                const categoryManager = await productPage.$('.div-box-category');
                if (categoryManager) {
                    const categoryLinks = await productPage.$$eval('.div-content-category', (elements) => {
                        return elements.map((element) => {
                            const anchorElement = element;
                            return anchorElement.href;
                        });
                    });
                    const productLinks = await this.parseCategoryLinks(productPage, categoryLinks);
                    await this.parseProducts(productPage, productLinks);
                }
                else {
                    await productPage.goto(link.url);
                    const productLinks = await productPage.evaluate(() => {
                        const buttons = document.querySelectorAll('.div-content-products .button-newsbox');
                        const linksArray = [];
                        buttons.forEach((button) => {
                            const href = button.getAttribute('href');
                            linksArray.push(href);
                        });
                        return linksArray;
                    });
                    await this.parseProducts(productPage, productLinks);
                }
            }
            catch (error) {
                console.log(error);
                this.logger.error('Error processing category:', link.category);
            }
            finally {
                await productPage.close();
            }
        }
        return products;
    }
    async parseCategoryLinks(productPage, categoryLinks) {
        let linksProduct = [];
        for (const categoryLink of categoryLinks) {
            await productPage.goto(categoryLink);
            await productPage.select('.div-shopnav-right .ergebnisse-left .selector_shopnav .select-field-2', '9999');
            const productLinks = await productPage.evaluate(() => {
                const buttons = document.querySelectorAll('.div-content-products .button-newsbox');
                const linksArray = [];
                buttons.forEach((button) => {
                    const href = button.getAttribute('href');
                    linksArray.push(href);
                });
                return linksArray;
            });
            linksProduct = linksProduct.concat(productLinks);
        }
        return linksProduct;
    }
    async parseProducts(productPage, linksProduct) {
        for (const linkProduct of linksProduct) {
            await productPage.goto(linkProduct);
            const product_id = await productPage.$eval('.h1-product', (element) => element.textContent.trim());
            const product_name = await productPage.$eval('.sl-product', (element) => element.textContent.trim());
            const product_images = await productPage.$$eval('.div-image-productdetail-slider img', (images) => {
                return images.map((img) => img.src);
            });
            await this.productService.createParsedProduct({
                product_id: product_id,
                name: product_name,
                images: product_images,
            });
        }
    }
};
Parser = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], Parser);
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map