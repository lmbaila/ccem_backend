import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@ApiTags('dashboards')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('dashboards')
export class DashboardsController {
  constructor(private prisma: PrismaService) {}
  @Get()
  @ApiOperation({ summary: 'Lista dashboards (Dynatrace, Grafana, SolarWinds, DCP Eagle, ...)' })
  list() {
    return this.prisma.dashboard.findMany();
  }
}
