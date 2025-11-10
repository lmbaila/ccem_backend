import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { EventsHttpModule } from './modules/events/events.module';
import { UsersHttpModule } from './modules/users/users.module';
import { ServicesHttpModule } from './modules/services/services.module';
import { TechniciansHttpModule } from './modules/technicians/technicians.module';
import { FeedbacksHttpModule } from './modules/feedbacks/feedbacks.module';
import { DashboardsHttpModule } from './modules/dashboards/dashboards.module';
import { TeamHttpModule } from './modules/team/team.module';
import { MetricsModule } from './modules/metrics/metrics.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    EventsHttpModule,
    UsersHttpModule,
    ServicesHttpModule,
    TechniciansHttpModule,
    FeedbacksHttpModule,
    DashboardsHttpModule,
    TeamHttpModule,
    MetricsModule,
  ],
})
export class AppModule {}
