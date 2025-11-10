import { Inject, Injectable } from '@nestjs/common';
import { EVENT_REPOSITORY, IEventRepository } from '../../../core/repositories/event.repository';
import { UpdateEventDto } from '../dto/update-event.dto';

@Injectable()
export class UpdateEventUseCase {
  constructor(@Inject(EVENT_REPOSITORY) private repo: IEventRepository) {}
  execute(id: string, dto: UpdateEventDto) {
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
