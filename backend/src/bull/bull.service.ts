// src/bull/bull.service.ts
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { CSVInputDTO } from '../DTO/job.dto';
import { RawDataParam } from 'src/DTO/search-result.dto';
import { Queue, Worker } from 'bullmq';
import { CrawlerService } from './crawler.service';
import { PrismaService } from '../prisma/prisma.service';
import { BullQueueService } from './bull-queue.service';

@Injectable()
export class BullService {
  private queue: Queue;

  constructor(
    private crawlerService: CrawlerService,
    private prismaService: PrismaService,
    private bullQueueService: BullQueueService,
  ) {
    this.queue = this.bullQueueService.getQueue('scrape-search-result');
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
        const rawData = new RawDataParam();

        rawData.keyword = input.keyword;
        rawData.user_id = 1;

        rawData.raw_html = await this.crawlerService.getSearchResultData(
          input.keyword,
        );

        const formattedData = this.crawlerService.formatData(rawData);

        await this.prismaService.search_results.create({ data: formattedData });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('finished');
      } else {
        console.log('already existed');
      }
    });
  }
}
