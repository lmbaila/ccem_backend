import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { EVENT_REPOSITORY, IEventRepository } from '../../../core/repositories/event.repository';
import { UpdateEventDto } from '../dto/update-event.dto';

type ServiceInput = {
  serviceId: number;
  startAt: string | Date;
  endAt: string | Date | null;
};

@Injectable()
export class UpdateEventUseCase {
  constructor(@Inject(EVENT_REPOSITORY) private repo: IEventRepository) {}

  async execute(id: string, dto: UpdateEventDto) {
    const current = await this.repo.get(id);

    if (!current) {
      throw new BadRequestException({
        errorCode: 'EVENT_NOT_FOUND',
        message: 'Evento não encontrado.',
      });
    }

    // ❌ Não pode atualizar evento cancelado
    if (current.status === 'CANCELLED') {
      throw new BadRequestException({
        errorCode: 'EVENT_CANNOT_UPDATE_CANCELLED',
        message: 'Nao e possivel actualizar um evento cancelado.',
      });
    }

    // ❌ Ticket duplicado
    if (dto.ticket && dto.ticket !== current.ticket) {
      const existing = await this.repo.findByTicket(dto.ticket);

      if (existing) {
        throw new BadRequestException({
          errorCode: 'EVENT_TICKET_DUPLICATE',
          message: 'Ja existe um evento com este ticket.',
          existingEvent: existing,
        });
      }
    }

    // ❌ Impedir finalizar evento com serviços sem endAt
    if (dto.status === 'COMPLETED') {
      const event = await this.repo.get(id);

      const allServices: ServiceInput[] =
        dto.services ??
        event.services.map((s: any) => ({
          serviceId: s.serviceId,
          startAt: s.startAt,
          endAt: s.endAt,
        }));

      const incomplete = allServices.some((s: ServiceInput) => !s.endAt);

      if (incomplete) {
        throw new BadRequestException({
          errorCode: 'EVENT_SERVICE_NOT_RESTORED',
          message: 'Para concluir o evento, todos os serviços devem ter endAt definido.',
        });
      }
    }

    // ✔️ Atualizar o evento
    return this.repo.update(id, {
      summary: dto.summary,
      description: dto.description,
      ticket: dto.ticket,
      status: dto.status,
      priority: dto.priority,
      technicianIds: dto.technicianIds,
      services: dto.services?.map((s) => ({
        serviceId: s.serviceId!,
        startAt: s.startAt ? new Date(s.startAt) : new Date(),
        endAt: s.endAt ? new Date(s.endAt) : null,
      })),
    });
  }
}
