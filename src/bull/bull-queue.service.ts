// src/bull/bull-queue.service.ts
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class BullQueueService {
  getQueue(name: string): Queue {
    return new Queue(name);
  }
}
