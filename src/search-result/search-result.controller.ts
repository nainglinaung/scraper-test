import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSearchResult } from './search-result.dto';
@Controller('search-result')
export class SearchResultController {
  constructor(private prisma: PrismaService) {}

  @Get('/')
  findAll() {
    return this.prisma.search_results.findMany();
  }

  @Post('/')
  create(@Body() createSearchResult: CreateSearchResult) {
    const {
      adswords_count,
      keyword,
      link_count,
      total_search_result_for_keyword,
      raw_html,
    } = createSearchResult;

    return this.prisma.search_results.create({
      data: {
        adswords_count,
        keyword,
        link_count,
        total_search_result_for_keyword,
        raw_html,
      },
    });
  }
}