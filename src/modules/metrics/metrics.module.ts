import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { PrismaMetricsRepository } from '../../infrastructure/prisma/repositories/prisma-metrics.repository';
import { GetOverviewUseCase } from '../../application/metrics/usecases/get-overview.usecase';
import { GetTopServicesUseCase } from '../../application/metrics/usecases/get-top-services.usecase';
import { GetUnavailableServicesUseCase } from '../../application/metrics/usecases/get-unavailable-services.usecase';
import { GetLiveFeedbacksUseCase } from '../../application/metrics/usecases/get-live-feedbacks.usecase';
import { GetDashboardEventsUseCase } from '../../application/metrics/usecases/get-dashboard-events.usecase';
import { GetTimelineUseCase } from '../../application/metrics/usecases/get-timeline.usecase';
import { GetServiceAvailabilityUseCase } from 'src/application/metrics/usecases/get-service-availability.usecase';
import { GetServiceEventsUseCase } from 'src/application/metrics/usecases/get-service-events.usecase';

@Module({
  controllers: [MetricsController],
  providers: [
    PrismaService,
    PrismaMetricsRepository,
    GetOverviewUseCase,
    GetTopServicesUseCase,
    GetUnavailableServicesUseCase,
    GetLiveFeedbacksUseCase,
    GetDashboardEventsUseCase,
    GetTimelineUseCase,
    GetServiceAvailabilityUseCase,
    GetServiceEventsUseCase,
  ],
  exports: [],
})
export class MetricsModule {}
