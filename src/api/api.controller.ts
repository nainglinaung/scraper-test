import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSearchResult } from 'src/DTO/search-result.dto';
import { ApiService } from './api.service';

@Controller('search-result')
export class SearchResultController {
  constructor(private apiService: ApiService) {}

  @Get(':keyword')
  findByKeyword(@Param('keyword') keyword: string) {
    return this.apiService.findByKeyword(keyword);
  }

  @Post('/crawl')
  crawl(@Body('keyword') keyword: string) {
    return this.apiService.crawl(keyword);
  }

  @Post('/')
  create(@Body() createSearchResult: CreateSearchResult) {
    return this.apiService.create(createSearchResult);
  }
}
