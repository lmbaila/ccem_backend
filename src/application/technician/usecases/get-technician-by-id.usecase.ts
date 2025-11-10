import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  TECHNICIAN_REPOSITORY,
  ITechnicianRepository,
} from '../../../core/repositories/technician.repository';

@Injectable()
export class GetTechnicianByIdUseCase {
  constructor(
    @Inject(TECHNICIAN_REPOSITORY)
    private readonly repo: ITechnicianRepository,
  ) {}

  async execute(id: number) {
    const technician = await this.repo.get(id);
    if (!technician) {
      throw new NotFoundException(`Tecnico com ID ${id} nao encontrado.`);
    }
    return technician;
  }
}
