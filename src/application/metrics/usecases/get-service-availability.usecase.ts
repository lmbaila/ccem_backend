import { Injectable } from '@nestjs/common';
import { PrismaMetricsRepository } from '../../../infrastructure/prisma/repositories/prisma-metrics.repository';
import { GetServiceAvailabilityDto } from '../../../modules/metrics/dto/get-service-availability.dto';

@Injectable()
export class GetServiceAvailabilityUseCase {
  constructor(private readonly repo: PrismaMetricsRepository) {}

  async execute(dto: GetServiceAvailabilityDto) {
    return this.repo.getServiceAvailability(dto);
  }
}
