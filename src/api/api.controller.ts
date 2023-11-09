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
  Param,
} from '@nestjs/common';

import { CreateSearchResult, QuerySearchResult } from './search-result.dto';

import { ApiService } from './api.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { CsvParser } from 'nest-csv-parser';
import { CSVEntity } from './types';
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
      ...query,
      user_id: req.user.id,
    });
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.apiService.findById(parseInt(id));
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
    const entities = await this.csvParser.parse(stream, CSVEntity);

    const mapData = entities.list.map(({ keyword }) => {
      return {
        keyword,
        user_id: req.user.id,
      };
    });
    const records = await this.apiService.batchCreate(mapData);

    await Promise.all(records.map((data) => this.apiService.crawl(data)));

    return { status: 'success' };
  }

  @Post('/')
  create(@Body() createSearchResult: CreateSearchResult) {
    return this.apiService.create(createSearchResult);
  }
}
