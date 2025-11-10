import { Module } from '@nestjs/common';
import { DashboardsController } from './dashboards.controller';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({ imports: [PrismaModule], controllers: [DashboardsController] })
export class DashboardsHttpModule {}
