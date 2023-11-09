import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { BullService } from './bull/bull.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const bullService = app.get(BullService);
  bullService.processJobs(); // Start processing the jobs
  await app.listen(3000);
}
bootstrap();
