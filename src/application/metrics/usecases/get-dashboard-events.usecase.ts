import { Injectable } from '@nestjs/common';
import { PrismaMetricsRepository } from '../../../infrastructure/prisma/repositories/prisma-metrics.repository';
import { MetricsRange } from 'src/modules/metrics/dto/get-metrics-range.dto';

@Injectable()
export class GetDashboardEventsUseCase {
  constructor(private readonly repo: PrismaMetricsRepository) {}
  execute(range: MetricsRange) {
    return this.repo.eventsByDashboard(range);
  }
}
