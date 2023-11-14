import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BullService } from 'src/bull/bull.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchResult } from './types';
import { Job } from 'bullmq';

const KEYWORD_LIMIT = 100;

@Injectable()
export class ApiService {
  constructor(
    private primsaService: PrismaService,
    private bullservice: BullService,
  ) {}

  findById(id: number) {
    return this.primsaService.search_results.findFirst({
      where: { id },
    });
  }

  async uploadCSV(entities, user_id) {
    if (entities.list.length > KEYWORD_LIMIT) {
      throw new UnprocessableEntityException(
        'exceed the limit of keyword per csv',
      );
    }
    for (const data of entities.list) {
      await this.crawl({
        keyword: data.keyword,
        user_id,
      });
    }
    return { status: 'success' };
  }

  findByKeyword(query): Promise<any> {
    return this.primsaService.search_results.findMany({
      where: {
        keyword: {
          contains: query.keyword,
        },
        user_id: query.user_id,
      },
      select: {
        id: true,
        keyword: true,
        link_count: true,
        total_search_result_for_keyword: true,
        adswords_count: true,
      },
    });
  }

  crawl(data): Promise<Job> {
    return this.bullservice.addJob(data);
  }

  create(createSearchResult): Promise<SearchResult> {
    return this.primsaService.search_results.create({
      data: createSearchResult,
    });
  }
}
