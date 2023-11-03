import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSearchResult } from './search-result.dto';
import { ApiService } from './api.service';

@Controller('search-result')
export class SearchResultController {
  constructor(private apiService: ApiService) {}

  @Get('/')
  findAll() {
    return this.apiService.findAll();
  }

  @Post('/test')
  trigger(@Body('keyword') keyword: string) {
    return this.apiService.trigger(keyword);
  }

  @Post('/')
  create(@Body() createSearchResult: CreateSearchResult) {
    return this.apiService.create(createSearchResult);
  }
}
