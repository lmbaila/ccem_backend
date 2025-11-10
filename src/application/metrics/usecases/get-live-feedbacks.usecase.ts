import { Injectable } from '@nestjs/common';
import { PrismaMetricsRepository } from '../../../infrastructure/prisma/repositories/prisma-metrics.repository';

@Injectable()
export class GetLiveFeedbacksUseCase {
  constructor(private readonly repo: PrismaMetricsRepository) {}
  execute(limit?: number) {
    return this.repo.liveFeedbacks(limit ?? 20);
  }
}
