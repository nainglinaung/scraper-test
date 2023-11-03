import { Injectable } from '@nestjs/common';
import { BullService } from 'src/bull/bull.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSearchResult } from './search-result.dto';
@Injectable()
export class ApiService {
  constructor(
    private primsaService: PrismaService,
    private bullservice: BullService,
  ) {}

  findAll() {
    return this.primsaService.search_results.findMany();
  }

  trigger(keyword: string) {
    return this.bullservice.addJob(keyword);
  }

  create(createSearchResult: CreateSearchResult) {
    return this.primsaService.search_results.create({
      data: createSearchResult,
    });
  }
}
