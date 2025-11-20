import { Inject, Injectable } from '@nestjs/common';
import { ORIGIN_REPOSITORY, IOriginRepository } from '../../../core/repositories/origin.repository';

@Injectable()
export class FindOriginUseCase {
  constructor(@Inject(ORIGIN_REPOSITORY) private repo: IOriginRepository) {}

  async execute(id: number) {
    return this.repo.findOne(id);
  }
}
