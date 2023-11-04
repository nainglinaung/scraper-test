import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateSearchResult,
  QuerySearchResult,
} from 'src/DTO/search-result.dto';

import { ApiService } from './api.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { CsvParser } from 'nest-csv-parser';
import { CSVInputDTO } from 'src/DTO/job.dto';
import { AccessTokenGuard } from 'src/auth/AccessTokenGuard';

@UseGuards(AccessTokenGuard)
@Controller('search-result')
export class ApiController {
  constructor(
    private apiService: ApiService,
    private readonly csvParser: CsvParser,
  ) {}

  @Get('/')
  findByKeyword(@Query() query: QuerySearchResult, @Request() req) {
    return this.apiService.findByKeyword({
      keyword: query.keyword,
      user_id: req.user.id,
    });
  }

  @Post('/crawl')
  crawl(@Body('keyword') keyword: string, @Request() req) {
    return this.apiService.crawl({ keyword, user_id: req.user.id });
  }

  @Post('/upload-csv')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  async uploadCSV(@UploadedFile() file: Express.Multer.File, @Request() req) {
    const stream = createReadStream(file.path);
    const entities = await this.csvParser.parse(stream, CSVInputDTO);

    for (const data of entities.list) {
      await this.apiService.crawl({
        keyword: data.keyword,
        user_id: req.user.id,
      });
    }
  }

  @Post('/')
  create(@Body() createSearchResult: CreateSearchResult) {
    return this.apiService.create(createSearchResult);
  }
}
