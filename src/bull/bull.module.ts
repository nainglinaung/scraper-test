// src/bull/bull.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { BullService } from './bull.service';
import { CrawlerService } from './crawler.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'scrape-search-result',
    }),
    PrismaModule,
  ],
  providers: [BullService, CrawlerService],
  exports: [BullService],
})
export class BullQueueModule {}
