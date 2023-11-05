// src/bull/bull.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { BullService } from './bull.service';
import { CrawlerService } from './crawler.service';
import { PrismaService } from '../prisma/prisma.service';
import { BullQueueService } from './bull-queue.service';

describe('BullService', () => {
  let service: BullService;
  const mockBullQueueService = {
    getQueue: jest.fn().mockReturnValue({
      add: jest.fn().mockResolvedValue('your-mock-job-id2'),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BullService,
        CrawlerService,
        PrismaService,
        {
          provide: BullQueueService,
          useValue: mockBullQueueService,
        },
      ],
    }).compile();

    service = module.get<BullService>(BullService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a job to the queue', async () => {
    const jobData = { keyword: 'test' };

    // Mock the queue's add method
    const addMock = jest.fn().mockResolvedValueOnce('sample-queue');
    service['queue'].add = addMock;

    const job = await service.addJob(jobData);
    expect(job).toBe('sample-queue');
    expect(addMock).toHaveBeenCalledWith('scrape-data', jobData);
  });
});
