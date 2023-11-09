// src/bull/bull.service.ts
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { Queue, Worker } from 'bullmq';
import { CrawlerService } from './crawler.service';
import { PrismaService } from '../prisma/prisma.service';
import { BullQueueService } from './bull-queue.service';
import { Logger } from '@nestjs/common';

const MaximumDelaySec = 5;

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
      delay: Math.floor(Math.random() * MaximumDelaySec) + 1,
    });
  }

  async processJobs(): Promise<void> {
    new Worker('scrape-search-result', async (job) => {
      const { keyword, user_id } = job.data;
      const keywordData = await this.prismaService.search_results.findFirst({
        where: { keyword, user_id },
      });

      if (!keywordData) {
        const raw_html = await this.crawlerService.getSearchResultData(keyword);
        const formattedData = this.crawlerService.formatData(raw_html);
        await this.prismaService.search_results.create({
          data: { ...formattedData, keyword, user_id },
        });
        this.logger.log(`finished processing ${keyword}`);
      } else {
        this.logger.log(`${keyword} already existed`);
      }
    });
  }
}
