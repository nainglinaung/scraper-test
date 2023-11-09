// src/bull/bull.service.ts
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { Queue, Worker } from 'bullmq';
import { CrawlerService } from './crawler.service';
import { PrismaService } from '../prisma/prisma.service';
import { BullQueueService } from './bull-queue.service';
import { Logger } from '@nestjs/common';

const MAXIMUM_DELAY_IN_SECONDS = 5;

@Injectable()
export class BullService {
  private queue: Queue;
  private readonly logger = new Logger(BullService.name);
  constructor(
    private crawlerService: CrawlerService,
    private prismaService: PrismaService,
    private bullQueueService: BullQueueService,
  ) {
    this.queue = this.bullQueueService.getQueue('scrape-search-result');
  }

  async addJob(data: Record<string, any>): Promise<Job> {
    return this.queue.add('scrape-data', data, {
      delay: Math.floor(Math.random() * MAXIMUM_DELAY_IN_SECONDS) + 1,
    });
  }

  async processJobs(): Promise<void> {
    new Worker('scrape-search-result', async (job) => {
      const { keyword, id } = job.data;

      const raw_html = await this.crawlerService.getSearchResultData(keyword);
      const formattedData = this.crawlerService.formatData(raw_html);

      await this.prismaService.search_results.update({
        where: {
          id,
        },
        data: { ...formattedData, keyword_status: 'Done' },
      });

      await new Promise((resolve) => setTimeout(resolve, 3000));
    });
  }
}
