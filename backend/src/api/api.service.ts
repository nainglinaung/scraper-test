import { Injectable } from '@nestjs/common';
import { BullService } from 'src/bull/bull.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateSearchResult,
  QuerySearchResult,
} from 'src/DTO/search-result.dto';
import { Job } from 'bullmq';

@Injectable()
export class ApiService {
  constructor(
    private primsaService: PrismaService,
    private bullservice: BullService,
  ) {}

  findByKeyword(query: QuerySearchResult): Promise<CreateSearchResult> {
    return this.primsaService.search_results.findFirst({
      where: { keyword: query.keyword, user_id: query.user_id },
    });
  }

  crawl(data: QuerySearchResult): Promise<Job> {
    return this.bullservice.addJob(data);
  }

  create(createSearchResult: CreateSearchResult): Promise<CreateSearchResult> {
    return this.primsaService.search_results.create({
      data: createSearchResult,
    });
  }
}
