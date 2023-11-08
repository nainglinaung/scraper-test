import { Test, TestingModule } from '@nestjs/testing';
import { NotAcceptableException } from '@nestjs/common';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let apiService: ApiService;
  const user_id = 1;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiService],
    }).compile();

    apiService = module.get<ApiService>(ApiService);
    apiService['keyword_limit'] = 1;
  });

  it('should throw NotAcceptableException when keyword limit is exceeded', () => {
    expect(() =>
      apiService.uploadCSV(
        {
          list: [{ keyword: 'Keyword1' }, { keyword: 'Keyword2' }],
        },
        user_id,
      ),
    ).toThrow(NotAcceptableException);
  });

  it('should not throw an exception when keyword limit is not exceeded', () => {
    expect(() =>
      apiService.uploadCSV(
        {
          list: [{ keyword: 'Keyword1' }],
        },
        user_id,
      ),
    ).not.toThrow();
  });
});
