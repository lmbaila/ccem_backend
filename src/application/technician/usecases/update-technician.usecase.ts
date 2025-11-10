import { Inject, Injectable } from '@nestjs/common';
import {
  TECHNICIAN_REPOSITORY,
  ITechnicianRepository,
} from '../../../core/repositories/technician.repository';
import { UpdateTechnicianDto } from 'src/modules/technicians/dto/update-technician.dto';

@Injectable()
export class UpdateTechnicianUseCase {
  constructor(@Inject(TECHNICIAN_REPOSITORY) private readonly repo: ITechnicianRepository) {}

  async execute(id: number, dto: UpdateTechnicianDto) {
    return this.repo.update(id, dto);
  }
}
