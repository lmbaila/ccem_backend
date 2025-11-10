import { Inject, Injectable } from '@nestjs/common';
import {
  TECHNICIAN_REPOSITORY,
  ITechnicianRepository,
} from '../../../core/repositories/technician.repository';
import { CreateTechnicianDto } from 'src/modules/technicians/dto/create-technician.dto';

@Injectable()
export class CreateTechnicianUseCase {
  constructor(@Inject(TECHNICIAN_REPOSITORY) private readonly repo: ITechnicianRepository) {}

  async execute(dto: CreateTechnicianDto) {
    return this.repo.create(dto);
  }
}
