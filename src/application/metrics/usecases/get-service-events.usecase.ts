import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { GetServiceEventsDto } from '../../../modules/metrics/dto/get-service-events.dto';

function parseMonthYear(value: string): Date {
  const [month, year] = value.split('/').map(Number);
  if (!month || !year) throw new BadRequestException(`Formato inválido: ${value}`);
  return new Date(year, month - 1, 1);
}

@Injectable()
export class GetServiceEventsUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(dto: GetServiceEventsDto) {
    const startDate = parseMonthYear(dto.startPeriod);
    const endDate = parseMonthYear(dto.endPeriod);
    endDate.setMonth(endDate.getMonth() + 1); // incluir o último mês

    if (endDate <= startDate) {
      throw new BadRequestException('O período final deve ser posterior ao inicial.');
    }

    if (!dto.services?.length) {
      throw new BadRequestException('Deve informar ao menos um serviceId.');
    }

    const services = await this.prisma.service.findMany({
      where: { id: { in: dto.services } },
    });

    const results = await Promise.all(
      services.map(async (srv) => {
        const links = await this.prisma.eventService.findMany({
          where: {
            serviceId: srv.id,
            startAt: { gte: startDate, lt: endDate },
          },
          include: {
            event: {
              select: { id: true, code: true, summary: true },
            },
          },
        });

        const events = links.map((link) => {
          const endAt = link.endAt ?? new Date();
          const durationMinutes = Math.max(
            (endAt.getTime() - link.startAt.getTime()) / (1000 * 60),
            0,
          );

          return {
            eventId: link.event.id,
            code: link.event.code,
            summary: link.event.summary,
            startAt: link.startAt,
            endAt: link.endAt,
            durationMinutes: Number(durationMinutes.toFixed(1)),
          };
        });

        // Tempo total de downtime (em minutos)
        const totalDowntime = events.reduce((sum, e) => sum + e.durationMinutes, 0);

        // Calculo do total de minutos no período
        const totalPeriodMinutes = (endDate.getTime() - startDate.getTime()) / (1000 * 60);

        const availability =
          totalPeriodMinutes > 0
            ? Number((((totalPeriodMinutes - totalDowntime) / totalPeriodMinutes) * 100).toFixed(2))
            : 100;

        return {
          serviceId: srv.id,
          serviceName: srv.name,
          totalEvents: events.length,
          totalDowntimeMinutes: Math.round(totalDowntime),
          availability,
          events,
        };
      }),
    );

    // métricas agregadas
    const totalServices = results.length;
    const totalEvents = results.reduce((sum, s) => sum + s.totalEvents, 0);
    const totalDowntime = results.reduce((sum, s) => sum + s.totalDowntimeMinutes, 0);
    const avgAvailability =
      totalServices > 0
        ? Number((results.reduce((sum, s) => sum + s.availability, 0) / totalServices).toFixed(2))
        : 100;

    return {
      period: `${dto.startPeriod} - ${dto.endPeriod}`,
      totalServices,
      totalEvents,
      totalDowntimeMinutes: totalDowntime,
      averageAvailability: avgAvailability,
      generatedAt: new Date(),
      data: results,
    };
  }
}
