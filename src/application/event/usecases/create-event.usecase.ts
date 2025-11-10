import { Inject, Injectable } from '@nestjs/common';
import { EVENT_REPOSITORY, IEventRepository } from '../../../core/repositories/event.repository';
import { CreateEventDto } from '../dto/create-event.dto';
import { generateShortCode } from '../../../infrastructure/utils/short-code.util';

@Injectable()
export class CreateEventUseCase {
  constructor(@Inject(EVENT_REPOSITORY) private repo: IEventRepository) {}

  async execute(dto: CreateEventDto, userId: number) {
    const code = generateShortCode(8);

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
