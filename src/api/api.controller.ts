import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSearchResult } from './search-result.dto';
import { BullService } from 'src/bull/bull.service';
@Controller('search-result')
export class SearchResultController {
  constructor(
    private prisma: PrismaService,
    private bullmq: BullService,
  ) {}

  @Get('/')
  findAll() {
    return this.prisma.search_results.findMany();
  }

  @Get('/test')
  trigger() {
    return this.bullmq.addJob({ data: 'test' });
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
