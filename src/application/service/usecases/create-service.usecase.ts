import { Inject, Injectable } from '@nestjs/common';
import {
  IServiceRepository,
  SERVICE_REPOSITORY,
} from '../../../core/repositories/service.repository';
import { CreateServiceDto } from 'src/modules/services/dto/create-service.dto';

@Injectable()
export class CreateServiceUseCase {
  constructor(@Inject(SERVICE_REPOSITORY) private readonly repo: IServiceRepository) {}

  async execute(dto: CreateServiceDto) {
    return this.repo.create(dto);
  }
}
