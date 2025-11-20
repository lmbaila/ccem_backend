import { Inject, Injectable } from '@nestjs/common';
import { ORIGIN_REPOSITORY, IOriginRepository } from '../../../core/repositories/origin.repository';

@Injectable()
export class ListOriginUseCase {
  constructor(@Inject(ORIGIN_REPOSITORY) private repo: IOriginRepository) {}

  async execute(search?: string, page = 1, limit = 10) {
    return this.repo.list(search, page, limit);
  }
}
