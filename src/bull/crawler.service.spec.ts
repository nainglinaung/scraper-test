import { Test, TestingModule } from '@nestjs/testing';
import { CrawlerService } from './crawler.service';

describe('CrawlerService', () => {
  let crawlerService: CrawlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrawlerService],
    }).compile();

    crawlerService = module.get<CrawlerService>(CrawlerService);
  });

  it('should be defined', () => {
    expect(crawlerService).toBeDefined();
  });

  describe('getSearchResultData', () => {
    it('should return HTML content from Google search', async () => {
      const mockResponse = 'Mocked Google Search Results';

      const mockFetch = jest.fn().mockResolvedValue({
        text: jest.fn().mockResolvedValue(mockResponse),
      });

      global.fetch = mockFetch;

      const htmlContent =
        await crawlerService.getSearchResultData('testKeyword');

      expect(htmlContent).toBeDefined();
      expect(htmlContent).toEqual(mockResponse);
    });
  });

  describe('formatData', () => {
    it('should parse and format raw HTML content', () => {
      const raw_html =
        '<html><body><span>Sponsored</span><div id="result-stats">lorem</div></body></html>';
      const formattedData = crawlerService.formatData(raw_html);

      // Add more specific assertions for the formatted data
      expect(formattedData).toEqual(
        expect.objectContaining({
          adswords_count: 1,
          total_search_result_for_keyword: 'lorem',
          link_count: 0,
          raw_html,
        }),
      );
    });

    it('should handle errors and log them', () => {
      const spy = jest.spyOn(crawlerService['logger'], 'error');
      crawlerService.formatData(null);

      expect(spy).toHaveBeenCalled();
    });
  });
});
