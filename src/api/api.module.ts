import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { BullQueueModule } from 'src/bull/bull.module';
import { SearchResultController } from './api.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ApiService],
  exports: [ApiService],
  imports: [BullQueueModule, PrismaModule],
  controllers: [SearchResultController],
})
export class SearchResultModule {}
