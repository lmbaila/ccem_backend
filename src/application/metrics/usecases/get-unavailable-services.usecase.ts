import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { MetricsRange } from '../../../modules/metrics/dto/get-metrics-range.dto';
import { subDays, subMonths, subWeeks, subYears, startOfMonth, endOfMonth } from 'date-fns';

@Injectable()
export class GetUnavailableServicesUseCase {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retorna os serviços indisponíveis (por mês, com downtime e uptime)
   * Pode filtrar por range (daily, weekly, monthly, yearly) e também por mês/ano específicos.
   */
  async execute(range: MetricsRange, filters?: { month?: number; year?: number }) {
    const now = new Date();
    const { month, year } = filters || {};
    let from: Date;
    let to: Date;

    // 🗓️ Caso o utilizador especifique mês/ano, usamos esse período fixo
    if (month && year) {
      from = startOfMonth(new Date(year, month - 1, 1));
      to = endOfMonth(from);
    } else {
      // Caso contrário, usamos o "range" (daily, weekly, monthly, yearly)
      switch (range) {
        case 'weekly':
          from = subWeeks(now, 1);
          break;
        case 'monthly':
          from = subMonths(now, 1);
          break;
        case 'yearly':
          from = subYears(now, 1);
          break;
        case 'daily':
        default:
          from = subDays(now, 1);
          break;
      }
      to = now;
    }

    // 🔍 Busca eventos não concluídos dentro do período
    const activeEvents = await this.prisma.event.findMany({
      where: {
        status: { not: 'COMPLETED' },
        createdAt: { gte: from, lte: to },
      },
      include: {
        services: { include: { service: true } },
      },
    });

    if (activeEvents.length === 0) {
      return {
        range,
        month: month ?? null,
        year: year ?? null,
        generatedAt: now.toISOString(),
        totalUnavailable: 0,
        averageDowntimeMinutes: 0,
        servicesByMonth: [],
      };
    }

    // 📊 Calcula estatísticas por serviço e por mês
    const serviceStatsByMonth: Record<
      string,
      {
        name: string;
        month: number;
        year: number;
        totalDowntime: number;
        incidents: number;
      }
    > = {};

    for (const event of activeEvents) {
      for (const s of event.services) {
        const serviceId = s.serviceId;
        const serviceName = s.service.name;
        const start = new Date(s.startAt);
        const end = s.endAt ? new Date(s.endAt) : to;

        const downtimeMinutes = Math.max(Math.round((end.getTime() - start.getTime()) / 60000), 0);

        const m = start.getMonth() + 1;
        const y = start.getFullYear();
        const key = `${serviceId}-${m}-${y}`;

        if (!serviceStatsByMonth[key]) {
          serviceStatsByMonth[key] = {
            name: serviceName,
            month: m,
            year: y,
            totalDowntime: 0,
            incidents: 0,
          };
        }

        serviceStatsByMonth[key].totalDowntime += downtimeMinutes;
        serviceStatsByMonth[key].incidents += 1;
      }
    }

    // 🔢 Monta o resultado final
    const results = Object.values(serviceStatsByMonth).map((s) => {
      const daysInMonth = new Date(s.year, s.month, 0).getDate();
      const totalPossibleMinutes = daysInMonth * 24 * 60;
      const uptimePercentage = Math.max(100 - (s.totalDowntime / totalPossibleMinutes) * 100, 0);

      return {
        service: s.name,
        month: s.month,
        year: s.year,
        incidents: s.incidents,
        downtimeMinutes: s.totalDowntime,
        uptimePercentage: Number(uptimePercentage.toFixed(2)),
      };
    });

    // 🔝 Ordena por downtime
    const sorted = results.sort((a, b) => b.downtimeMinutes - a.downtimeMinutes);

    // 📈 Agregações globais
    const totalUnavailable = sorted.length;
    const avgDowntime =
      totalUnavailable > 0
        ? Math.round(sorted.reduce((acc, s) => acc + s.downtimeMinutes, 0) / totalUnavailable)
        : 0;

    return {
      range,
      month: month ?? null,
      year: year ?? null,
      generatedAt: now.toISOString(),
      totalUnavailable,
      averageDowntimeMinutes: avgDowntime,
      servicesByMonth: sorted,
    };
  }
}
