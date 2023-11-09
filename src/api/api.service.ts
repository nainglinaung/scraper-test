import { Injectable } from '@nestjs/common';
import { BullService } from 'src/bull/bull.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchResult } from './types';
import { Job } from 'bullmq';

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
