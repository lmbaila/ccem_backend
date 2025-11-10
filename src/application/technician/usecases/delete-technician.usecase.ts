import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import {
  TECHNICIAN_REPOSITORY,
  ITechnicianRepository,
} from '../../../core/repositories/technician.repository';

@Injectable()
export class DeleteTechnicianUseCase {
  constructor(
    @Inject(TECHNICIAN_REPOSITORY)
    private readonly repo: ITechnicianRepository,
  ) {}

  async execute(id: number) {
    const technician = await this.repo.get(id);
    if (!technician) throw new NotFoundException('Tecnico nao encontrado.');

    // ✅ verifica se há vinculos com eventos
    const hasRelations = technician.eventLinks && technician.eventLinks.length > 0;

    if (hasRelations) {
      throw new BadRequestException(
        'Nao e possivel remover o tecnico, pois esta vinculado a um ou mais eventos.',
      );
    }

    return this.repo.delete(id);
  }
}
