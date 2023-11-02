// src/bull/bull.service.ts
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { CSVInputDTO } from './job.dto';
import { Queue, Worker } from 'bullmq';

@Injectable()
export class BullService {
  private queue: Queue;

  constructor() {
    this.queue = new Queue('scrape-search-result');
  }

  async addJob(data: Record<string, any>): Promise<Job> {
    return this.queue.add('scrape-data', data);
  }

  async processJobs(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const worker = new Worker('scrape-search-result', async (job) => {
      const input: CSVInputDTO = job.data;
      console.log(input);
      console.log(`Processing job #${job.id}`);
    });
  }
}
