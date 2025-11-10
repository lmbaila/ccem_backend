import { Inject, Injectable } from '@nestjs/common';
import {
  IServiceRepository,
  SERVICE_REPOSITORY,
} from '../../../core/repositories/service.repository';
import { UpdateServiceDto } from 'src/modules/services/dto/update-service.dto';

@Injectable()
export class UpdateServiceUseCase {
  constructor(@Inject(SERVICE_REPOSITORY) private readonly repo: IServiceRepository) {}

  async execute(id: number, dto: UpdateServiceDto) {
    return this.repo.update(id, dto);
  }
}
