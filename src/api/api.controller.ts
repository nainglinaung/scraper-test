import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateSearchResult } from 'src/DTO/search-result.dto';

import { ApiService } from './api.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { CsvParser } from 'nest-csv-parser';
import { CSVInputDTO } from 'src/DTO/job.dto';

@Controller('search-result')
export class ApiController {
  constructor(
    private apiService: ApiService,
    private readonly csvParser: CsvParser,
  ) {}

  @Get(':keyword')
  findByKeyword(@Param('keyword') keyword: string) {
    return this.apiService.findByKeyword(keyword);
  }

  @Post('/crawl')
  crawl(@Body('keyword') keyword: string) {
    return this.apiService.crawl(keyword);
  }

  @Post('/upload-csv')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  async uploadCSV(@UploadedFile() file: Express.Multer.File) {
    const stream = createReadStream(file.path);
    const entities = await this.csvParser.parse(stream, CSVInputDTO);

    for (const data of entities.list) {
      await this.apiService.crawl(data.keyword);
    }
  }

  @Post('/')
  create(@Body() createSearchResult: CreateSearchResult) {
    return this.apiService.create(createSearchResult);
  }
}
