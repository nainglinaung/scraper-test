import { Module } from '@nestjs/common';
import { SearchResultService } from './search-result.service';
import { BullModule } from '@nestjs/bull';
import { SearchResultController } from './search-result.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  providers: [SearchResultService],
  exports: [SearchResultService],
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({ name: 'scrape-search-result' }),
    PrismaModule,
  ],
  controllers: [SearchResultController],
})
export class SearchResultModule {}
