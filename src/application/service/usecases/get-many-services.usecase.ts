import { Inject, Injectable } from '@nestjs/common';
import {
  SERVICE_REPOSITORY,
  IServiceRepository,
} from '../../../core/repositories/service.repository';

@Injectable()
export class GetManyServiceUseCase {
  constructor(@Inject(SERVICE_REPOSITORY) private readonly repo: IServiceRepository) {}

  async execute(params: { search?: string; page?: number; limit?: number }) {
    return this.repo.list(params);
  }
}
