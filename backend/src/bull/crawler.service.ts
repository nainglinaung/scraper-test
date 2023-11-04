import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { getRandom } from 'random-useragent';
import { CreateSearchResult, RawDataParam } from 'src/DTO/search-result.dto';

@Injectable()
export class CrawlerService {
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
      console.error(error);
    }
  }

  formatData(data: RawDataParam): CreateSearchResult {
    try {
      const $ = cheerio.load(data.raw_html);
      const adswords_count = $('span:contains("Sponsored")').length;
      const total_search_result_for_keyword = $('#result-stats').html();
      const link_count = $('a').length;

      return {
        adswords_count,
        total_search_result_for_keyword,
        link_count,
        ...data,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
