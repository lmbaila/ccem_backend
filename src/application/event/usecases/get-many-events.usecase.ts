import { Inject, Injectable } from '@nestjs/common';
import { EVENT_REPOSITORY, IEventRepository } from '../../../core/repositories/event.repository';
import { GetEventsQueryDto } from '../dto/get-events-query.dto';

@Injectable()
export class GetManyEventsUseCase {
  constructor(@Inject(EVENT_REPOSITORY) private repo: IEventRepository) {}

  async execute(query: GetEventsQueryDto) {
    const { page = 1, limit = 10, ...filters } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.repo.list({ ...filters, skip, take: limit }),
      this.repo.count(filters),
    ]);

    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data,
    };
  }
}
