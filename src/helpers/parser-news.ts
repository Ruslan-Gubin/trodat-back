import { Injectable, Logger } from "@nestjs/common";
import {Browser, chromium } from "playwright";

@Injectable()
export class ParserNews  {
  private browser: Browser;
  private logger: Logger;

  constructor() {
    this.logger = new Logger('ParserNews');
    this.init();
  }

 private async init() {
    try {
        this.browser = await chromium.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
    });
    } catch (error) {
      throw error;
    }
  }

  async parseNews() {
    const page = await this.browser.newPage();
    await page.goto('https://trodat-russia.ru/news/');

    const pageALinkMaxPageCount = await page.$('.page-link > span');
    const newsCountPagination = await pageALinkMaxPageCount.textContent();

    console.log(newsCountPagination)
    
    const nextPagePagination = await page.$('.next-page');

  }
}

