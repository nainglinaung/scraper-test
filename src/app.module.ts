import { Module } from '@nestjs/common';
import { SearchResultModule } from './search-result/search-result.module';

@Module({
  imports: [SearchResultModule],
})
export class AppModule {}
