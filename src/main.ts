import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { BullService } from './bull/bull.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter'; // Replace with your filter's path

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  const bullService = app.get(BullService);
  bullService.processJobs(); // Start processing the jobs
  await app.listen(3000);
}
bootstrap();
