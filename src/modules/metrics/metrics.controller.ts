import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetOverviewUseCase } from '../../application/metrics/usecases/get-overview.usecase';
import { GetTopServicesUseCase } from '../../application/metrics/usecases/get-top-services.usecase';
import { GetUnavailableServicesUseCase } from '../../application/metrics/usecases/get-unavailable-services.usecase';
import { GetLiveFeedbacksUseCase } from '../../application/metrics/usecases/get-live-feedbacks.usecase';
import { GetDashboardEventsUseCase } from '../../application/metrics/usecases/get-dashboard-events.usecase';
import { GetTimelineUseCase } from '../../application/metrics/usecases/get-timeline.usecase';
import { GetMetricsRangeDto, type MetricsRange } from './dto/get-metrics-range.dto';
import { Public } from '../../common/decorators/public.decorator';
import { GetUnavailableServicesDto } from './dto/get-unavailable-services.dto';

@ApiTags('metrics')
@Public()
@Controller('metrics')
export class MetricsController {
  constructor(
    private readonly overviewUc: GetOverviewUseCase,
    private readonly topUc: GetTopServicesUseCase,
    private readonly unavailableUc: GetUnavailableServicesUseCase,
    private readonly liveUc: GetLiveFeedbacksUseCase,
    private readonly dashboardsUc: GetDashboardEventsUseCase,
    private readonly timelineUc: GetTimelineUseCase,
  ) {}

  @Get('overview')
  @ApiOperation({ summary: 'Resumo geral (ativos, resolvidos, MTTR, disponibilidade, feedbacks)' })
  @ApiQuery({ name: 'range', required: false, enum: ['daily', 'weekly', 'monthly', 'yearly'] })
  overview(@Query() q: GetMetricsRangeDto) {
    const range: MetricsRange = (q.range ?? 'daily') as MetricsRange;
    return this.overviewUc.execute(range);
  }

  @Get('top-services')
  @ApiOperation({ summary: 'Top serviços mais impactados (downtime em minutos)' })
  @ApiQuery({ name: 'range', required: false, enum: ['daily', 'weekly', 'monthly', 'yearly'] })
  top(@Query() q: GetMetricsRangeDto) {
    const range: MetricsRange = (q.range ?? 'daily') as MetricsRange;
    return this.topUc.execute(range);
  }

  @Get('unavailable-services')
  @ApiOperation({
    summary:
      'Serviços indisponíveis (downtime, uptime e incidentes). Pode filtrar por range, mês e ano.',
  })
  @ApiQuery({ name: 'range', required: false, enum: ['daily', 'weekly', 'monthly', 'yearly'] })
  @ApiQuery({ name: 'month', required: false, type: Number, description: 'Número do mês (1-12)' })
  @ApiQuery({ name: 'year', required: false, type: Number, description: 'Ano (ex: 2025)' })
  unavailable(@Query() dto: GetUnavailableServicesDto) {
    const range: MetricsRange = (dto.range ?? 'daily') as MetricsRange;
    const filters = {
      month: dto.month,
      year: dto.year,
    };
    return this.unavailableUc.execute(range, filters);
  }

  @Get('live-feedbacks')
  @ApiOperation({
    summary: 'Feedbacks em tempo real (últimos N feedbacks criados, atualiza de 5 em 5 minutos)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Quantidade de feedbacks a retornar (padrão: 20)',
  })
  live(@Query('limit') limit?: number) {
    return this.liveUc.execute(limit ? Number(limit) : 20);
  }

  @Get('monitoring-tools')
  @ApiOperation({ summary: 'Eventos por ferramenta de monitoria (Dashboard)' })
  @ApiQuery({ name: 'range', required: false, enum: ['daily', 'weekly', 'monthly', 'yearly'] })
  dashboards(@Query() q: GetMetricsRangeDto) {
    const range: MetricsRange = (q.range ?? 'daily') as MetricsRange;
    return this.dashboardsUc.execute(range);
  }

  @Get('timeline')
  @ApiOperation({ summary: 'Evolução temporal: eventos criados x resolvidos' })
  @ApiQuery({ name: 'range', required: false, enum: ['daily', 'weekly', 'monthly', 'yearly'] })
  timeline(@Query() q: GetMetricsRangeDto) {
    const range: MetricsRange = (q.range ?? 'daily') as MetricsRange;
    return this.timelineUc.execute(range);
  }
}
