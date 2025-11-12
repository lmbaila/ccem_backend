import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { formatDurationHuman, getDateFromRange } from '../../utils/date-range.util';
import { MetricsRange } from 'src/modules/metrics/dto/get-metrics-range.dto';
import { parse, addMonths, isAfter, format } from 'date-fns';
import { GetServiceAvailabilityDto } from 'src/modules/metrics/dto/get-service-availability.dto';
function parseMonthYear(value: string): Date {
  const [month, year] = value.split('/').map(Number);
  return new Date(year, month - 1, 1); // mês - 1 porque Date() usa base 0 (0 = Jan)
}
@Injectable()
export class PrismaMetricsRepository {
  constructor(private prisma: PrismaService) {}

  /** Resumo geral */
  async overview(range: MetricsRange) {
    const since = getDateFromRange(range);

    const [total, active, completed, feedbackCount, positiveFeedback] = await Promise.all([
      this.prisma.event.count({ where: { createdAt: { gte: since } } }),
      this.prisma.event.count({
        where: { createdAt: { gte: since }, status: { in: ['PENDING', 'IN_PROGRESS'] } },
      }),
      this.prisma.event.count({
        where: { createdAt: { gte: since }, status: 'COMPLETED' },
      }),
      this.prisma.feedback.count({ where: { createdAt: { gte: since } } }),
      this.prisma.feedback.count({
        where: { createdAt: { gte: since }, rating: { gte: 4 } },
      }),
    ]);

    // MTTR: media (endAt - startAt) nos links com endAt
    const links = await this.prisma.eventService.findMany({
      where: {
        event: { createdAt: { gte: since } },
        endAt: { not: null },
      },
      select: { startAt: true, endAt: true },
    });

    const mttrMs =
      links.length === 0
        ? 0
        : links.reduce(
            (acc, l) => acc + (new Date(l.endAt!).getTime() - new Date(l.startAt).getTime()),
            0,
          ) / links.length;

    // disponibilidade media aproximada: 100 - (downtime acumulado / periodo total)
    const periodMs = Date.now() - since.getTime();
    const totalDowntimeMs = await this.totalDowntimeInRangeMs(since);
    const avgAvailability =
      periodMs > 0 ? Math.max(0, 100 - (totalDowntimeMs / periodMs) * 100) : 100;

    return {
      range,
      totalEvents: total,
      activeEvents: active,
      resolvedEvents: completed,
      totalFeedbacks: feedbackCount,
      positiveFeedbackPercent: feedbackCount
        ? Math.round((positiveFeedback / feedbackCount) * 100)
        : 0,
      averageResolutionTimeMs: Math.round(mttrMs),
      averageResolutionTimeHuman: formatDurationHuman(mttrMs),
      averageAvailabilityPercent: Number(avgAvailability.toFixed(2)),
      generatedAt: new Date().toISOString(),
    };
  }

  /** Top servicos mais impactados por downtime (minutos) */
  async topImpactedServices(range: MetricsRange) {
    const since = getDateFromRange(range);

    const services = await this.prisma.service.findMany({
      include: {
        eventLinks: {
          where: {
            event: { createdAt: { gte: since } },
          },
          select: { startAt: true, endAt: true },
        },
      },
    });

    const data = services
      .map((s) => {
        const totalMs = s.eventLinks.reduce((acc, e) => {
          const start = new Date(e.startAt).getTime();
          const end = e.endAt ? new Date(e.endAt).getTime() : Date.now();
          return acc + Math.max(end - start, 0);
        }, 0);

        return {
          service: s.name,
          incidents: s.eventLinks.length,
          totalDowntimeMinutes: Math.round(totalMs / 60000),
          totalDowntimeHuman: formatDurationHuman(totalMs),
        };
      })
      .filter((x) => x.incidents > 0)
      .sort((a, b) => b.totalDowntimeMinutes - a.totalDowntimeMinutes)
      .slice(0, 10);

    return { range, generatedAt: new Date().toISOString(), topImpactedServices: data };
  }

  /** Servicos indisponiveis agora (links sem endAt, eventos ativos) */
  async unavailableServicesNow() {
    const links = await this.prisma.eventService.findMany({
      where: {
        endAt: null,
        event: { status: { in: ['PENDING', 'IN_PROGRESS'] } },
      },
      select: {
        startAt: true,
        event: { select: { id: true, code: true, status: true, priority: true } },
        service: { select: { id: true, name: true, description: true } },
      },
    });

    return {
      timestamp: new Date().toISOString(),
      unavailableServices: links.map((l) => ({
        serviceId: l.service.id,
        service: l.service.name,
        eventCode: l.event.code,
        status: l.event.status,
        priority: l.event.priority,
        since: l.startAt,
        durationHuman: formatDurationHuman(Date.now() - new Date(l.startAt).getTime()),
      })),
    };
  }

  /** Feedbacks mais recentes (tempo real) */
  async liveFeedbacks(limit = 20) {
    const items = await this.prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        event: { select: { code: true, summary: true } },
        createdBy: { select: { username: true } },
      },
    });

    return {
      recentFeedbacks: items.map((f) => ({
        eventCode: f.event.code,
        eventSummary: f.event.summary,
        comment: f.comment,
        rating: f.rating ?? null,
        author: f.createdBy.username,
        createdAt: f.createdAt,
      })),
    };
  }

  /** Eventos por ferramenta de monitoria (Dashboard) */
  async eventsByDashboard(range: MetricsRange) {
    const since = getDateFromRange(range);

    const dashboards = await this.prisma.dashboard.findMany({
      include: {
        Event: {
          where: { createdAt: { gte: since } },
          select: { id: true, status: true, priority: true },
        },
      },
    });

    const totalEvents = dashboards.reduce((acc, d) => acc + d.Event.length, 0);

    return {
      range,
      totalEvents,
      dashboards: dashboards
        .map((d) => ({
          name: d.name,
          events: d.Event.length,
          active: d.Event.filter((e) => e.status !== 'COMPLETED').length,
          completed: d.Event.filter((e) => e.status === 'COMPLETED').length,
          critical: d.Event.filter((e) => e.priority === 'CRITICAL').length,
        }))
        .sort((a, b) => b.events - a.events),
    };
  }

  /** Timeline: agregacao por hora (24h) ou por dia (>= weekly) */
  async timeline(range: MetricsRange) {
    const since = getDateFromRange(range);

    // simplificado em JS; se quiser ultra-perf, podes usar raw SQL agrupando por date_trunc
    const events = await this.prisma.event.findMany({
      where: { createdAt: { gte: since } },
      select: { createdAt: true, status: true, updatedAt: true },
      orderBy: { createdAt: 'asc' },
    });

    const buckets = new Map<string, { created: number; completed: number }>();
    const useHour = range === 'daily' || range === 'weekly';

    const keyOf = (d: Date) =>
      useHour
        ? `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()} ${d.getUTCHours()}:00`
        : `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;

    for (const e of events) {
      const kc = keyOf(new Date(e.createdAt));
      if (!buckets.has(kc)) buckets.set(kc, { created: 0, completed: 0 });
      buckets.get(kc)!.created += 1;

      if (e.status === 'COMPLETED') {
        const ku = keyOf(new Date(e.updatedAt));
        if (!buckets.has(ku)) buckets.set(ku, { created: 0, completed: 0 });
        buckets.get(ku)!.completed += 1;
      }
    }

    const labels = Array.from(buckets.keys()).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );
    const createdEvents = labels.map((k) => buckets.get(k)!.created);
    const resolvedEvents = labels.map((k) => buckets.get(k)!.completed);

    return { range, labels, createdEvents, resolvedEvents };
  }

  /** helper: downtime acumulado do periodo (todos os servicos) */
  private async totalDowntimeInRangeMs(since: Date) {
    const links = await this.prisma.eventService.findMany({
      where: { event: { createdAt: { gte: since } } },
      select: { startAt: true, endAt: true },
    });
    return links.reduce((acc, l) => {
      const start = new Date(l.startAt).getTime();
      const end = l.endAt ? new Date(l.endAt).getTime() : Date.now();
      return acc + Math.max(end - start, 0);
    }, 0);
  }

  async getServiceAvailability(input: GetServiceAvailabilityDto) {
    const { services = [], startPeriod, endPeriod, target = 99 } = input;

    // Validacao logica
    const startDate = parseMonthYear(startPeriod);
    const endDate = parseMonthYear(endPeriod);
    if (isAfter(startDate, endDate)) {
      throw new BadRequestException('O período final deve ser posterior ao inicial.');
    }

    // Gerar lista de meses no intervalo
    const months: { label: string; start: Date; end: Date }[] = [];
    let current = startDate;
    while (!isAfter(current, endDate)) {
      const label = `${format(current, 'MMM')}/${format(current, 'yy')}`;
      const next = addMonths(current, 1);
      months.push({ label, start: current, end: next });
      current = next;
    }

    // Buscar servicos
    const selectedServices = services.length
      ? await this.prisma.service.findMany({ where: { id: { in: services } } })
      : await this.prisma.service.findMany();

    if (!selectedServices.length) {
      throw new BadRequestException('Nenhum serviço encontrado.');
    }

    // Calcular metricas por servico e mes
    const result = await Promise.all(
      selectedServices.map(async (srv) => {
        const monthly = await Promise.all(
          months.map(async (m) => {
            const events = await this.prisma.eventService.findMany({
              where: {
                serviceId: srv.id,
                startAt: { gte: m.start, lt: m.end },
              },
            });

            const totalMinutes = 30 * 24 * 60;
            const downtimeMinutes = events.reduce((acc, e) => {
              const start = e.startAt ? new Date(e.startAt).getTime() : 0;
              const end = e.endAt ? new Date(e.endAt).getTime() : start;
              return acc + Math.max((end - start) / (1000 * 60), 0);
            }, 0);

            const uptimeMinutes = totalMinutes - downtimeMinutes;
            const availabilityPercent = (uptimeMinutes / totalMinutes) * 100;
            const incidents = events.length;

            return {
              month: m.label,
              uptimeMinutes,
              downtimeMinutes,
              availabilityPercent: Number(availabilityPercent.toFixed(2)),
              incidents,
            };
          }),
        );

        const avgAvailability =
          monthly.reduce((acc, m) => acc + m.availabilityPercent, 0) / monthly.length;

        return {
          serviceId: srv.id,
          serviceName: srv.name,
          averageAvailability: Number(avgAvailability.toFixed(2)),
          data: monthly,
        };
      }),
    );

    return {
      period: `${startPeriod} - ${endPeriod}`,
      target,
      totalServices: result.length,
      generatedAt: new Date(),
      result,
    };
  }
}
