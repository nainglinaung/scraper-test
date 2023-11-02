import { Module } from '@nestjs/common';
import { SearchResultService } from './search-result.service';

@Module({
  providers: [SearchResultService],
  exports: [SearchResultService],
})
export class SearchResultModule {}
