import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  CreateEventInput,
  IEventRepository,
  UpdateEventInput,
} from '../../../core/repositories/event.repository';
import type { Feedback } from '@prisma/client';

@Injectable()
export class PrismaEventRepository implements IEventRepository {
  constructor(private prisma: PrismaService) {}

  // =====================================================
  // LISTAGEM
  // =====================================================
  list(params: any) {
    const { search, status, priority, startDate, endDate, skip = 0, take = 10 } = params;

    // 🧭 Filtros dinâmicos
    const whereClause: any = {
      AND: [
        status ? { status } : {},
        priority ? { priority } : {},
        startDate || endDate
          ? {
              createdAt: {
                ...(startDate ? { gte: new Date(startDate) } : {}),
                ...(endDate ? { lte: new Date(endDate) } : {}),
              },
            }
          : {},
        search
          ? {
              OR: [
                { summary: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { code: { contains: search, mode: 'insensitive' } },
                { ticket: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {},
      ],
    };

    return this.prisma.event.findMany({
      where: whereClause,
      include: {
        services: { include: { service: true } },
        technicians: { include: { technician: true } },
        feedbacks: { include: { createdBy: true } },
      },
      orderBy: { createdAt: 'desc' }, // ✅ por defeito, mais recentes primeiro
      skip,
      take,
    });
  }

  count(params: any) {
    const { search, status, priority, startDate, endDate } = params;

    const whereClause: any = {
      AND: [
        status ? { status } : {},
        priority ? { priority } : {},
        startDate || endDate
          ? {
              createdAt: {
                ...(startDate ? { gte: new Date(startDate) } : {}),
                ...(endDate ? { lte: new Date(endDate) } : {}),
              },
            }
          : {},
        search
          ? {
              OR: [
                { summary: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { code: { contains: search, mode: 'insensitive' } },
                { ticket: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {},
      ],
    };

    return this.prisma.event.count({ where: whereClause });
  }

  // =====================================================
  // DETALHE
  // =====================================================
  get(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
      include: {
        services: { include: { service: true } },
        technicians: { include: { technician: true } },
        feedbacks: { include: { createdBy: true } },
      },
    });
  }

  // =====================================================
  // CRIACAO
  // =====================================================
  async create(input: CreateEventInput) {
    const { services, technicianIds = [], feedbacks = [], code, createdById, ...rest } = input;

    if (!services?.length) {
      throw new BadRequestException('Pelo menos um serviço impactado deve ser informado.');
    }

    // 🔧 Valida e formata servicos
    const formattedServices = services.map((s, index) => {
      if (!s.serviceId) {
        throw new BadRequestException(`serviceId ausente no serviço #${index + 1}`);
      }

      const start = new Date(s.startAt);
      if (isNaN(start.getTime())) {
        throw new BadRequestException(`Data inválida em startAt (serviço #${index + 1})`);
      }

      const end = s.endAt && !isNaN(new Date(s.endAt).getTime()) ? new Date(s.endAt) : null;

      return {
        service: { connect: { id: s.serviceId } },
        startAt: start,
        endAt: end,
      };
    });

    console.log('================ FEEDBACKS RECEBIDOS ================');
    console.log(feedbacks);
    console.log('=====================================================');

    return this.prisma.$transaction(async (tx) => {
      // ✅ Cria o evento principal
      const event = await tx.event.create({
        data: {
          ...rest,
          code,
          createdById,
          services: { create: formattedServices },
          technicians: {
            create: technicianIds.map((id) => ({
              technician: { connect: { id } },
            })),
          },
        },
        include: {
          services: { include: { service: true } },
          technicians: { include: { technician: true } },
        },
      });

      // ✅ Cria feedbacks associados
      let createdFeedbacks: Feedback[] = [];
      if (feedbacks.length > 0) {
        createdFeedbacks = await Promise.all(
          feedbacks.map((f) =>
            tx.feedback.create({
              data: {
                comment: f.comment.trim(),
                rating: f.rating ?? null,
                eventId: event.id,
                createdById,
              },
            }),
          ),
        );
      }

      // ✅ Retorna evento completo com feedbacks
      return {
        ...event,
        feedbacks: createdFeedbacks,
      };
    });
  }

  // =====================================================
  // ATUALIZACAO
  // =====================================================
  async update(id: string, input: UpdateEventInput, userId?: number) {
    const { services, technicianIds, feedbacks = [], ...rest } = input;

    return this.prisma.$transaction(async (tx) => {
      // 🔧 Atualiza servicos (recria)
      if (Array.isArray(services)) {
        await tx.eventService.deleteMany({ where: { eventId: id } });
        if (services.length) {
          await tx.eventService.createMany({
            data: services.map((s) => ({
              eventId: id,
              serviceId: s.serviceId,
              startAt: s.startAt,
              endAt: s.endAt ?? null,
            })),
          });
        }
      }

      // 🔧 Atualiza tecnicos (recria)
      if (Array.isArray(technicianIds)) {
        await tx.eventTechnician.deleteMany({ where: { eventId: id } });
        if (technicianIds.length) {
          await tx.eventTechnician.createMany({
            data: technicianIds.map((tid) => ({
              eventId: id,
              technicianId: tid,
            })),
          });
        }
      }

      // ✅ Adiciona novos feedbacks sem apagar os antigos
      if (feedbacks.length > 0) {
        await Promise.all(
          feedbacks.map((f) =>
            tx.feedback.create({
              data: {
                comment: f.comment.trim(),
                rating: f.rating ?? null,
                eventId: id,
                createdById: userId ?? 1,
              },
            }),
          ),
        );
      }

      // ✅ Atualiza campos gerais e retorna evento completo
      return tx.event.update({
        where: { id },
        data: { ...rest },
        include: {
          services: { include: { service: true } },
          technicians: { include: { technician: true } },
          feedbacks: { include: { createdBy: true } },
        },
      });
    });
  }

  // =====================================================
  // DELETE
  // =====================================================
  delete(id: string) {
    return this.prisma.event.delete({ where: { id } });
  }

  getByCode(code: string) {
    return this.prisma.event.findUnique({
      where: { code },
      include: {
        services: { include: { service: true } },
        technicians: { include: { technician: true } },
        feedbacks: { include: { createdBy: true } },
      },
    });
  }
}
