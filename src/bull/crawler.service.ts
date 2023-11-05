import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { getRandom } from 'random-useragent';
import { Logger } from '@nestjs/common';

@Injectable()
export class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);
  async getSearchResultData(keyword: string): Promise<string> {
    try {
      const headers: HeadersInit = new Headers();
      headers.set('User-Agent', getRandom());

      const response = await fetch(
        `https://www.google.com/search?q=${keyword}&gl=us&hl=en`,
        {
          headers,
        },
      );

      return response.text();
    } catch (error) {
      this.logger.error(error);
    }
  }

  formatData(raw_html) {
    try {
      const $ = cheerio.load(raw_html);
      const adswords_count = $('span:contains("Sponsored")').length;
      const total_search_result_for_keyword = $('#result-stats').html();
      const link_count = $('a').length;

      return {
        adswords_count,
        total_search_result_for_keyword,
        link_count,
        raw_html,
      };
    } catch (error) {
      this.logger.error(error);
    }
  }
}
