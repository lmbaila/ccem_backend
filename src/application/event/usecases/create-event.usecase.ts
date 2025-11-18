import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { EVENT_REPOSITORY, IEventRepository } from '../../../core/repositories/event.repository';
import { CreateEventDto } from '../dto/create-event.dto';
import { generateShortCode } from '../../../infrastructure/utils/short-code.util';

@Injectable()
export class CreateEventUseCase {
  constructor(@Inject(EVENT_REPOSITORY) private repo: IEventRepository) {}

  async execute(dto: CreateEventDto, userId: number) {
    const code = generateShortCode(8);

    if (dto.status === 'CANCELLED') {
      throw new BadRequestException({
        errorCode: 'EVENT_CANNOT_CREATE_CANCELLED',
        message: 'Nao pode criar eventos no estado cancelado.',
      });
    }

    // verificar Ticket duplicado
    const existing = await this.repo.findByTicket(dto.ticket);
    if (existing) {
      throw new BadRequestException({
        errorCode: 'EVENT_TICKET_DUPLICATE',
        message: 'Já existe um evento com este ticket.',
        existingEvent: existing,
      });
    }

    // Não pode concluir evento com serviços sem endAt (nao restaurado)
    if (dto.status === 'COMPLETED') {
      const incomplete = dto.services.some((s) => !s.endAt);

      if (incomplete) {
        throw new BadRequestException({
          errorCode: 'EVENT_SERVICE_NOT_RESTORED',
          message: 'Nao e possivel concluir o evento: existe pelo menos um servico sem endAt.',
        });
      }
    }

    // ✔️ Criar evento
    return this.repo.create({
      summary: dto.summary,
      description: dto.description,
      ticket: dto.ticket,
      dashboardId: dto.dashboardId,
      status: dto.status,
      priority: dto.priority,
      technicianIds: dto.technicianIds,
      services: dto.services.map((s) => ({
        serviceId: s.serviceId,
        startAt: new Date(s.startAt),
        endAt: s.endAt ? new Date(s.endAt) : null,
      })),
      feedbacks: dto.feedbacks ?? [],
      createdById: userId,
      code,
    });
  }
}
