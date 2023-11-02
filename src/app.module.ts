import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchResultModule } from './search-result/search-result.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SearchResultModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
