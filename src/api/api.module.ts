import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { BullQueueModule } from 'src/bull/bull.module';
import { ApiController } from './api.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CsvModule } from 'nest-csv-parser';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  providers: [ApiService],
  exports: [ApiService],
  imports: [
    BullQueueModule,
    PrismaModule,
    CsvModule,
    MulterModule.register({
      dest: './uploads/csv',
    }),
  ],
  controllers: [ApiController],
})
export class ApiModule {}
