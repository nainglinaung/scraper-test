// src/bull/bull.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { BullService } from './bull.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'scrape-search-result',
    }),
  ],
  providers: [BullService],
  exports: [BullService],
})
export class BullQueueModule {}
