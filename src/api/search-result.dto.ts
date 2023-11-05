import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';

export class CreateSearchResult {
  @IsNumber()
  readonly adswords_count: number;

  @IsNotEmpty()
  readonly keyword: string;

  @IsNotEmpty()
  @IsNumber()
  readonly link_count: number;

  @IsNotEmpty()
  readonly total_search_result_for_keyword: string;

  @IsNotEmpty()
  readonly raw_html: string;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}

export class QuerySearchResult {
  readonly keyword: string;
}
