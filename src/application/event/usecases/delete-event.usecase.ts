import { Inject, Injectable } from '@nestjs/common';
import { EVENT_REPOSITORY, IEventRepository } from '../../../core/repositories/event.repository';
@Injectable()
export class DeleteEventUseCase {
  constructor(@Inject(EVENT_REPOSITORY) private repo: IEventRepository) {}
  execute(id: string) {
    return this.repo.delete(id);
  }
}
