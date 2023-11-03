// src/bull/bull.service.ts
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { CSVInputDTO } from '../DTO/job.dto';
import { Queue, Worker } from 'bullmq';
import { CrawlerService } from './crawler.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BullService {
  private queue: Queue;

  constructor(
    private crawlerService: CrawlerService,
    private prismaService: PrismaService,
  ) {
    this.queue = new Queue('scrape-search-result');
  }

  async addJob(data: Record<string, any>): Promise<Job> {
    return this.queue.add('scrape-data', data);
  }

  async processJobs(): Promise<void> {
    new Worker('scrape-search-result', async (job) => {
      const input: CSVInputDTO = job.data;
      const keywordData = await this.prismaService.search_results.findFirst({
        where: input,
      });

      if (!keywordData) {
        const response = await this.crawlerService.getSearchResultData(
          input.keyword,
        );
        const formattedData = this.crawlerService.formatData(
          response,
          input.keyword,
        );
        await this.prismaService.search_results.create({ data: formattedData });
      } else {
        console.log('already existed');
      }
    });
  }
}
