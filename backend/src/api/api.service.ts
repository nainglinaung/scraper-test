import { Injectable } from '@nestjs/common';
import { BullService } from 'src/bull/bull.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSearchResult } from 'src/DTO/search-result.dto';
import { Job } from 'bullmq';

@Injectable()
export class ApiService {
  constructor(
    private primsaService: PrismaService,
    private bullservice: BullService,
  ) {}

  findByKeyword(keyword: string): Promise<CreateSearchResult> {
    return this.primsaService.search_results.findFirst({ where: { keyword } });
  }

  crawl(keyword: string): Promise<Job> {
    return this.bullservice.addJob({ keyword });
  }

  create(createSearchResult: CreateSearchResult): Promise<CreateSearchResult> {
    return this.primsaService.search_results.create({
      data: createSearchResult,
    });
  }
}
