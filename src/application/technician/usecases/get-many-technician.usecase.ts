import { Inject, Injectable } from '@nestjs/common';
import {
  TECHNICIAN_REPOSITORY,
  ITechnicianRepository,
} from '../../../core/repositories/technician.repository';

@Injectable()
export class GetManyTechnicianUseCase {
  constructor(
    @Inject(TECHNICIAN_REPOSITORY)
    private readonly repo: ITechnicianRepository,
  ) {}

  async execute(params: { search?: string; page?: number; limit?: number }) {
    return this.repo.list(params);
  }
}
